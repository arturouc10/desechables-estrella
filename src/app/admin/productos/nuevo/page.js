'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../admin.module.css';

export default function NuevoProductoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    weight: '',
    stock: '',
    sku: '',
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;

      // 1. Subir imagen a Cloudinary (vía API interna)
      if (file) {
        const imageFormData = new FormData();
        imageFormData.append('file', file);
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: imageFormData,
        });
        
        if (!uploadRes.ok) throw new Error('Error al subir la imagen');
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }

      // 2. Guardar producto en base de datos
      const productData = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        stock: formData.stock ? parseInt(formData.stock) : null,
        image: imageUrl,
      };

      const res = await fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error('Error al guardar el producto');

      alert('¡Producto guardado exitosamente!');
      router.push('/admin/productos');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Añadir Nuevo Producto</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nombre del Producto *</label>
          <input 
            type="text" 
            name="name" 
            required 
            className={styles.input} 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Ej. Bolsa Ecológica"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Descripción</label>
          <textarea 
            name="description" 
            className={styles.textarea} 
            value={formData.description} 
            onChange={handleChange}
            placeholder="Detalles del producto..."
          />
        </div>

        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>Precio ($)</label>
            <input 
              type="number" 
              name="price" 
              step="0.01" 
              className={styles.input} 
              value={formData.price} 
              onChange={handleChange} 
              placeholder="0.00"
            />
          </div>
          <div>
            <label className={styles.label}>Stock / Inventario</label>
            <input 
              type="number" 
              name="stock" 
              className={styles.input} 
              value={formData.stock} 
              onChange={handleChange} 
              placeholder="0"
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>Categoría *</label>
            <input 
              type="text" 
              name="category" 
              required
              className={styles.input} 
              value={formData.category} 
              onChange={handleChange} 
              placeholder="Ej. Bolsas Camiseta"
            />
          </div>
          <div>
            <label className={styles.label}>Peso / Medida</label>
            <input 
              type="text" 
              name="weight" 
              className={styles.input} 
              value={formData.weight} 
              onChange={handleChange} 
              placeholder="Ej. 1 KG o 50x70"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Imagen del Producto</label>
          <div className={styles.imageUploadArea}>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className={styles.previewImage} />
            ) : (
              <div>
                <p style={{ color: '#5874A6', fontSize: '1rem', marginBottom: '0.5rem' }}>📸 Arrastra una imagen aquí o haz clic para seleccionar</p>
                <p style={{ color: '#999', fontSize: '0.85rem' }}>Formatos soportados: JPG, PNG, WEBP</p>
              </div>
            )}
          </div>
        </div>

        <button type="submit" className={styles.primaryButton} disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
          {loading ? <div className={styles.loader}></div> : '💾 Guardar Producto'}
        </button>
      </form>
    </div>
  );
}
