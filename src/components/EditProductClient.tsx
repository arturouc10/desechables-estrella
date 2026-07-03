'use client';
import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../app/admin/admin.module.css';
import type { Product, ProductFormData } from '@/types';
import categoriesData from '@/data/categories.json';

interface EditProductClientProps {
  product: Product;
}

export default function EditProductClient({ product }: EditProductClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: product.name || '',
    description: product.description || '',
    price: product.price || null,
    category: product.category || '',
    weight: product.weight || '',
    stock: product.stock !== null ? product.stock : null,
    sku: product.sku || '',
  });
  const [existingImages, setExistingImages] = useState<string[]>(
    product.image ? [product.image] : []
  );
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles: File[] = [];
    
    for (const file of selectedFiles) {
      if (!file.type.startsWith('image/')) {
        alert(`El archivo ${file.name} no es una imagen válida.`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`La imagen ${file.name} supera el límite de 5MB.`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      setNewFiles(prev => [...prev, ...validFiles]);
      const newPreviewsList = validFiles.map(file => URL.createObjectURL(file));
      setNewPreviews(prev => [...prev, ...newPreviewsList]);
    }
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewFile = (index: number) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
    setNewPreviews(prev => {
      // Liberar URL
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let uploadedUrls: string[] = [];

      // 1. Upload new images if selected
      for (const file of newFiles) {
        const imageFormData = new FormData();
        imageFormData.append('file', file);
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: imageFormData,
        });
        
        if (!uploadRes.ok) throw new Error('Error al subir una de las imágenes');
        const uploadData = await uploadRes.json();
        uploadedUrls.push(uploadData.url);
      }

      const allImages = [...existingImages, ...uploadedUrls];

      // 2. Save product updates
      const dataToSave = {
        ...formData,
        price: formData.price ? parseFloat(formData.price as unknown as string) : null,
        stock: formData.stock ? parseInt(formData.stock as unknown as string, 10) : null,
        image: allImages[0] || null,
      };

      const res = await fetch(`/api/productos/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al actualizar el producto');
      }

      setSuccess('Producto actualizado correctamente');
      
      // Refresh router so parent page re-fetches
      router.refresh();

    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div className={styles.errorAlert}>{error}</div>}
      {success && <div style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.5)' }}>✅ {success}</div>}

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
            placeholder="Ej. Vasos Transparentes 12oz"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Descripción</label>
          <textarea 
            name="description" 
            className={styles.textarea} 
            value={formData.description || ''} 
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
              value={formData.price || ''} 
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
              value={formData.stock || ''} 
              onChange={handleChange} 
              placeholder="0"
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>Categoría *</label>
            <select 
              name="category" 
              required
              className={styles.input} 
              value={formData.category} 
              onChange={handleChange} 
              style={{ backgroundColor: '#fff', cursor: 'pointer' }}
            >
              <option value="" disabled>-- Selecciona una categoría --</option>
              {Array.from(new Set(categoriesData.map(c => c.section))).map(section => (
                <optgroup key={section} label={section}>
                  {categoriesData.filter(c => c.section === section).map(cat => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div>
            <label className={styles.label}>Peso / Medida</label>
            <input 
              type="text" 
              name="weight" 
              className={styles.input} 
              value={formData.weight || ''} 
              onChange={handleChange} 
              placeholder="Ej. 1 KG o 50x70"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Imágenes del Producto</label>
          <div className={styles.imageUploadArea}>
            <input 
              type="file" 
              accept="image/*" 
              multiple
              onChange={handleImageChange} 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
            />
            <div>
              <p style={{ color: '#5874A6', fontSize: '1rem', marginBottom: '0.5rem' }}>📸 Arrastra o selecciona múltiples imágenes aquí</p>
              <p style={{ color: '#999', fontSize: '0.85rem' }}>La primera imagen será la principal del producto</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '1rem' }}>
            {existingImages.map((imgUrl, i) => (
              <div key={`existing-${i}`} style={{ position: 'relative', width: '100px', height: '100px' }}>
                <img src={imgUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem' }} />
                <button type="button" onClick={() => removeExistingImage(i)} style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', borderRadius: '50%', width: '20px', height: '20px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✕</button>
              </div>
            ))}
            
            {newPreviews.map((previewUrl, i) => (
              <div key={`new-${i}`} style={{ position: 'relative', width: '100px', height: '100px' }}>
                <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem', border: '2px solid #10b981' }} />
                <button type="button" onClick={() => removeNewFile(i)} style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', borderRadius: '50%', width: '20px', height: '20px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✕</button>
                <div style={{ position: 'absolute', bottom: 0, background: 'rgba(16, 185, 129, 0.8)', color: 'white', fontSize: '10px', width: '100%', textAlign: 'center', padding: '2px 0' }}>Nueva</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="button" onClick={() => router.push('/admin/productos')} className={styles.secondaryButton} disabled={loading} style={{ flex: 1, padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', background: '#f9fafb', color: '#374151', fontWeight: 'bold', cursor: 'pointer' }}>
            Cancelar
          </button>
          <button type="submit" className={styles.primaryButton} disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
            {loading ? <div className={styles.loader}></div> : '💾 Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}
