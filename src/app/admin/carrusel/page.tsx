'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import styles from '../admin.module.css';

interface CarouselImage {
  id: string;
  url: string;
  order: number;
  active: boolean;
}

export default function CarouselAdminPage() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/carrusel');
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no debe pesar más de 5MB');
      return;
    }

    setUploading(true);
    try {
      // 1. Subir a Cloudinary (nuestra API interna)
      const formData = new FormData();
      formData.append('file', file);
      
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) throw new Error('Error al subir imagen');
      const uploadData = await uploadRes.json();

      // 2. Guardar en base de datos
      const saveRes = await fetch('/api/carrusel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: uploadData.url })
      });

      if (!saveRes.ok) throw new Error('Error al guardar en DB');
      
      alert('Imagen añadida al carrusel');
      fetchImages();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta imagen del carrusel?')) return;
    try {
      const res = await fetch(`/api/carrusel/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setImages(images.filter(img => img.id !== id));
      } else {
        alert('Error al eliminar');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const res = await fetch(`/api/carrusel/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentActive })
      });
      if (res.ok) {
        setImages(images.map(img => img.id === id ? { ...img, active: !currentActive } : img));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>🖼️ Administrar Carrusel</h1>
      </div>

      <div style={{ background: '#fff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#173c66' }}>Subir Nueva Imagen</h3>
        <p style={{ color: '#64748b', marginBottom: '1rem', fontSize: '0.9rem' }}>
          <strong>Recomendación:</strong> Usa imágenes de <strong>1920x800 píxeles</strong> o <strong>1920x1080 píxeles</strong> en formato optimizado (JPG o WebP) para no ralentizar la página. Todas las imágenes deberían tener exactamente las mismas proporciones.
        </p>
        
        <div style={{ position: 'relative', background: '#f8fafc', border: '2px dashed #cbd5e1', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center' }}>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: uploading ? 'not-allowed' : 'pointer' }}
          />
          {uploading ? (
            <div style={{ color: '#eb2c29', fontWeight: 'bold' }}>Subiendo imagen, por favor espera...</div>
          ) : (
            <div style={{ color: '#64748b' }}>Haz clic aquí o arrastra una imagen para subirla al carrusel</div>
          )}
        </div>
      </div>

      <div style={{ background: '#fff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '1.5rem', color: '#173c66' }}>Imágenes Actuales</h3>
        
        {loading ? (
          <p>Cargando...</p>
        ) : images.length === 0 ? (
          <p style={{ color: '#64748b' }}>No hay imágenes en el carrusel.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {images.map((img, index) => (
              <div key={img.id} style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', overflow: 'hidden', opacity: img.active ? 1 : 0.5 }}>
                <div style={{ height: '150px', background: '#f1f5f9', position: 'relative' }}>
                  <img src={img.url} alt={`Carrusel ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {!img.active && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                      INACTIVA
                    </div>
                  )}
                </div>
                <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button 
                    onClick={() => handleToggleActive(img.id, img.active)}
                    style={{ background: img.active ? '#f59e0b' : '#10b981', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
                  >
                    {img.active ? 'Ocultar' : 'Mostrar'}
                  </button>
                  <button 
                    onClick={() => handleDelete(img.id)}
                    style={{ background: '#eb2c29', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
