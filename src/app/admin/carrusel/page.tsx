'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import styles from '../admin.module.css';

interface CarouselImage {
  id: string;
  url: string;
  order: number;
  active: boolean;
}

interface BrandImage {
  id: string;
  url: string;
  order: number;
  active: boolean;
}

export default function HomeSettingsAdminPage() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [brandImages, setBrandImages] = useState<BrandImage[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [uploadingCarousel, setUploadingCarousel] = useState(false);
  const [uploadingBrand, setUploadingBrand] = useState(false);
  const [savingYoutube, setSavingYoutube] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resCarousel, resBrands, resSettings] = await Promise.all([
        fetch('/api/carrusel'),
        fetch('/api/marcas'),
        fetch('/api/settings')
      ]);

      if (resCarousel.ok) setImages(await resCarousel.json());
      if (resBrands.ok) setBrandImages(await resBrands.json());
      if (resSettings.ok) {
        const settings = await resSettings.json();
        setYoutubeUrl(settings.YOUTUBE_URL || '');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCarousel = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Por favor selecciona una imagen válida'); return; }
    if (file.size > 5 * 1024 * 1024) { alert('La imagen no debe pesar más de 5MB'); return; }

    setUploadingCarousel(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!uploadRes.ok) throw new Error('Error al subir imagen');
      const uploadData = await uploadRes.json();

      const saveRes = await fetch('/api/carrusel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: uploadData.url })
      });
      if (!saveRes.ok) throw new Error('Error al guardar en DB');
      
      alert('Imagen añadida al carrusel');
      fetchData();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploadingCarousel(false);
    }
  };

  const handleDeleteCarousel = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta imagen del carrusel?')) return;
    try {
      const res = await fetch(`/api/carrusel/${id}`, { method: 'DELETE' });
      if (res.ok) setImages(images.filter(img => img.id !== id));
      else alert('Error al eliminar');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleToggleCarouselActive = async (id: string, currentActive: boolean) => {
    try {
      const res = await fetch(`/api/carrusel/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentActive })
      });
      if (res.ok) setImages(images.map(img => img.id === id ? { ...img, active: !currentActive } : img));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUploadBrand = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Por favor selecciona una imagen válida'); return; }
    if (file.size > 2 * 1024 * 1024) { alert('La imagen no debe pesar más de 2MB'); return; }

    setUploadingBrand(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!uploadRes.ok) throw new Error('Error al subir imagen');
      const uploadData = await uploadRes.json();

      const saveRes = await fetch('/api/marcas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: uploadData.url })
      });
      if (!saveRes.ok) throw new Error('Error al guardar en DB');
      
      alert('Marca añadida correctamente');
      fetchData();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploadingBrand(false);
    }
  };

  const handleDeleteBrand = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta marca?')) return;
    try {
      const res = await fetch(`/api/marcas/${id}`, { method: 'DELETE' });
      if (res.ok) setBrandImages(brandImages.filter(img => img.id !== id));
      else alert('Error al eliminar');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleToggleBrandActive = async (id: string, currentActive: boolean) => {
    try {
      const res = await fetch(`/api/marcas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentActive })
      });
      if (res.ok) setBrandImages(brandImages.map(img => img.id === id ? { ...img, active: !currentActive } : img));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSaveYoutube = async () => {
    setSavingYoutube(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'YOUTUBE_URL', value: youtubeUrl })
      });
      if (res.ok) alert('Enlace de YouTube guardado correctamente');
      else alert('Error al guardar el enlace');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar el enlace');
    } finally {
      setSavingYoutube(false);
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>⚙️ Configuración de Inicio</h1>
      </div>

      {/* SECCION YOUTUBE */}
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#173c66' }}>Video de YouTube</h3>
        <p style={{ color: '#64748b', marginBottom: '1rem', fontSize: '0.9rem' }}>
          Ingresa el enlace de inserción (embed) o el enlace normal del video de YouTube que quieres mostrar en el inicio.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Ej: https://www.youtube.com/embed/ID_DEL_VIDEO"
            style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }}
          />
          <button 
            onClick={handleSaveYoutube}
            disabled={savingYoutube}
            style={{ background: '#173c66', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {savingYoutube ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>

      {/* SECCION MARCAS */}
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#173c66' }}>Logos de Marcas</h3>
        <div style={{ position: 'relative', background: '#f8fafc', border: '2px dashed #cbd5e1', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleUploadBrand}
            disabled={uploadingBrand}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: uploadingBrand ? 'not-allowed' : 'pointer' }}
          />
          {uploadingBrand ? (
            <div style={{ color: '#eb2c29', fontWeight: 'bold' }}>Subiendo marca, por favor espera...</div>
          ) : (
            <div style={{ color: '#64748b' }}>Haz clic aquí o arrastra un logo de marca para subirlo</div>
          )}
        </div>

        {loading ? (
          <p>Cargando marcas...</p>
        ) : brandImages.length === 0 ? (
          <p style={{ color: '#64748b' }}>No hay marcas agregadas.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {brandImages.map((img, index) => (
              <div key={img.id} style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', overflow: 'hidden', opacity: img.active ? 1 : 0.5 }}>
                <div style={{ height: '100px', background: '#fff', position: 'relative', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={img.url} alt={`Marca ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  {!img.active && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                      INACTIVA
                    </div>
                  )}
                </div>
                <div style={{ padding: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                  <button 
                    onClick={() => handleToggleBrandActive(img.id, img.active)}
                    style={{ background: img.active ? '#f59e0b' : '#10b981', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '0.25rem', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem' }}
                  >
                    {img.active ? 'Ocultar' : 'Mostrar'}
                  </button>
                  <button 
                    onClick={() => handleDeleteBrand(img.id)}
                    style={{ background: '#eb2c29', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '0.25rem', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem' }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECCION CARRUSEL */}
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '1rem', color: '#173c66' }}>Imágenes del Carrusel</h3>
        <p style={{ color: '#64748b', marginBottom: '1rem', fontSize: '0.9rem' }}>
          <strong>Recomendación:</strong> Usa imágenes de <strong>1920x800 píxeles</strong> o <strong>1920x1080 píxeles</strong> en formato optimizado (JPG o WebP).
        </p>
        
        <div style={{ position: 'relative', background: '#f8fafc', border: '2px dashed #cbd5e1', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleUploadCarousel}
            disabled={uploadingCarousel}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: uploadingCarousel ? 'not-allowed' : 'pointer' }}
          />
          {uploadingCarousel ? (
            <div style={{ color: '#eb2c29', fontWeight: 'bold' }}>Subiendo imagen, por favor espera...</div>
          ) : (
            <div style={{ color: '#64748b' }}>Haz clic aquí o arrastra una imagen para subirla al carrusel</div>
          )}
        </div>

        {loading ? (
          <p>Cargando carrusel...</p>
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
                    onClick={() => handleToggleCarouselActive(img.id, img.active)}
                    style={{ background: img.active ? '#f59e0b' : '#10b981', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
                  >
                    {img.active ? 'Ocultar' : 'Mostrar'}
                  </button>
                  <button 
                    onClick={() => handleDeleteCarousel(img.id)}
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
