'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../admin.module.css';
import type { ProductFormData } from '@/types';
import categoriesData from '@/data/categories.json';

export default function NuevoProductoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: null,
    category: '',
    weight: '',
    stock: null,
    sku: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [duplicateProduct, setDuplicateProduct] = useState<any>(null);
  const [newPriceForDuplicate, setNewPriceForDuplicate] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Handle null/number conversions for price and stock in submit
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      setFiles(prev => [...prev, ...selectedFiles]);
      
      const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Check for duplicates
      const checkRes = await fetch('/api/productos');
      if (checkRes.ok) {
        const allProducts = await checkRes.json();
        const existing = allProducts.find((p: any) => p.name.toLowerCase().trim() === formData.name.toLowerCase().trim());
        
        if (existing) {
          setDuplicateProduct(existing);
          setLoading(false);
          return; // Stop execution here and show modal
        }
      }

      await proceedWithCreation();
    } catch (error: any) {
      console.error(error);
      alert('Ocurrió un error al verificar duplicados: ' + error.message);
      setLoading(false);
    }
  };

  const proceedWithCreation = async () => {
    setLoading(true);
    try {
      let uploadedUrls: string[] = [];

      // 1. Upload images to Cloudinary via internal API
      for (const f of files) {
        const imageFormData = new FormData();
        imageFormData.append('file', f);
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: imageFormData,
        });
        
        if (!uploadRes.ok) throw new Error('Error al subir una de las imágenes');
        const uploadData = await uploadRes.json();
        uploadedUrls.push(uploadData.url);
      }

      // 2. Save product to database
      const productData = {
        ...formData,
        price: formData.price ? parseFloat(formData.price as unknown as string) : null,
        stock: formData.stock ? parseInt(formData.stock as unknown as string) : null,
        image: uploadedUrls[0] || null,
        images: uploadedUrls,
      };

      const res = await fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al guardar el producto');
      }

      alert('¡Producto guardado exitosamente!');
      router.push('/admin/productos');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      alert('Ocurrió un error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSumarStock = async () => {
    setLoading(true);
    try {
      const addedStock = formData.stock ? parseInt(formData.stock as unknown as string, 10) : 0;
      const finalStock = (duplicateProduct.stock || 0) + addedStock;
      
      const updatedPrice = newPriceForDuplicate ? parseFloat(newPriceForDuplicate) : duplicateProduct.price;

      const res = await fetch(`/api/productos/${duplicateProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stock: finalStock,
          price: updatedPrice
        }),
      });

      if (!res.ok) throw new Error('Error al actualizar el stock');

      alert('¡Stock y precio actualizados exitosamente en el producto existente!');
      router.push('/admin/productos');
      router.refresh();
    } catch (error: any) {
      alert('Error: ' + error.message);
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
              onChange={handleChange as any} 
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
          
          {previews.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '1rem' }}>
              {previews.map((previewUrl, i) => (
                <div key={i} style={{ position: 'relative', width: '100px', height: '100px' }}>
                  <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem', border: i === 0 ? '2px solid #eb2c29' : '1px solid #e5e7eb' }} />
                  <button type="button" onClick={() => removeFile(i)} style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', borderRadius: '50%', width: '20px', height: '20px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✕</button>
                  {i === 0 && <div style={{ position: 'absolute', bottom: 0, background: 'rgba(235, 44, 41, 0.8)', color: 'white', fontSize: '10px', width: '100%', textAlign: 'center', padding: '2px 0' }}>Principal</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className={styles.primaryButton} disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
          {loading ? <div className={styles.loader}></div> : '💾 Guardar Producto'}
        </button>
      </form>

      {/* Duplicate Alert Modal */}
      {duplicateProduct && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '1rem', width: '90%', maxWidth: '500px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#b91c1c', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⚠️ Producto Duplicado Detectado
            </h3>
            
            <p style={{ color: '#4b5563', marginBottom: '1rem', lineHeight: 1.5 }}>
              Ya existe un producto registrado con el nombre <strong>"{duplicateProduct.name}"</strong>.
            </p>
            
            <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>Stock Actual:</span>
                <span style={{ fontWeight: 'bold' }}>{duplicateProduct.stock !== null ? duplicateProduct.stock : '0'} unidades</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>Stock a Sumar:</span>
                <span style={{ fontWeight: 'bold', color: '#10b981' }}>+{formData.stock || 0} unidades</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e5e7eb', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>Precio Anterior:</span>
                <span style={{ fontWeight: 'bold' }}>{duplicateProduct.price ? `$${duplicateProduct.price.toFixed(2)}` : 'N/A'}</span>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151', fontSize: '0.9rem' }}>
                Precio Nuevo (Opcional)
              </label>
              <input 
                type="number"
                step="0.01"
                placeholder="Deja en blanco para conservar el precio viejo"
                value={newPriceForDuplicate}
                onChange={(e) => setNewPriceForDuplicate(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                onClick={handleSumarStock} 
                disabled={loading}
                style={{ width: '100%', padding: '0.75rem', background: '#10b981', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Sumar Stock al Existente
              </button>
              
              <button 
                onClick={() => { setDuplicateProduct(null); proceedWithCreation(); }}
                disabled={loading}
                style={{ width: '100%', padding: '0.75rem', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Ignorar y Crear como Nuevo
              </button>
              
              <button 
                onClick={() => setDuplicateProduct(null)}
                disabled={loading}
                style={{ width: '100%', padding: '0.75rem', background: 'transparent', color: '#6b7280', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' }}
              >
                Cancelar Operación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
