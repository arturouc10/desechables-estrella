'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../admin.module.css';
import type { JobVacancyInput } from '@/lib/validations';

export default function NuevaVacantePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<JobVacancyInput>({
    title: '',
    description: '',
    location: '',
    type: 'Tiempo Completo',
    salary: '',
    active: true,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/vacantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al guardar la vacante');
      }

      alert('¡Vacante creada exitosamente!');
      router.push('/admin/vacantes');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      alert('Ocurrió un error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Crear Nueva Vacante</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Título del Puesto *</label>
          <input 
            type="text" 
            name="title" 
            required 
            className={styles.input} 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="Ej. Ayudante General"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Descripción y Requisitos *</label>
          <textarea 
            name="description" 
            required
            className={styles.textarea} 
            value={formData.description} 
            onChange={handleChange}
            placeholder="Detalles del puesto, requisitos, horario..."
            style={{ minHeight: '150px' }}
          />
        </div>

        <div className={styles.formRow}>
          <div>
            <label className={styles.label}>Ubicación</label>
            <input 
              type="text" 
              name="location" 
              className={styles.input} 
              value={formData.location || ''} 
              onChange={handleChange} 
              placeholder="Ej. Sucursal Centro"
            />
          </div>
          <div>
            <label className={styles.label}>Tipo de Empleo</label>
            <select 
              name="type" 
              className={styles.input} 
              value={formData.type || ''} 
              onChange={handleChange} 
              style={{ backgroundColor: '#fff', cursor: 'pointer' }}
            >
              <option value="Tiempo Completo">Tiempo Completo</option>
              <option value="Medio Tiempo">Medio Tiempo</option>
              <option value="Por Proyecto">Por Proyecto</option>
              <option value="Temporal">Temporal</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Salario Ofrecido (Opcional)</label>
          <input 
            type="text" 
            name="salary" 
            className={styles.input} 
            value={formData.salary || ''} 
            onChange={handleChange} 
            placeholder="Ej. $1,500 semanales"
          />
        </div>

        <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem' }}>
          <input 
            type="checkbox" 
            id="active"
            name="active" 
            checked={formData.active} 
            onChange={handleChange} 
            style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
          />
          <label htmlFor="active" style={{ cursor: 'pointer', fontWeight: '500', color: '#4b5563', margin: 0 }}>
            Vacante Activa (Se mostrará en la bolsa de trabajo)
          </label>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="button" onClick={() => router.push('/admin/vacantes')} className={styles.secondaryButton} disabled={loading} style={{ flex: 1, padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', background: '#f9fafb', color: '#374151', fontWeight: 'bold', cursor: 'pointer' }}>
            Cancelar
          </button>
          <button type="submit" className={styles.primaryButton} disabled={loading} style={{ flex: 2, padding: '1rem', borderRadius: '0.5rem', border: 'none', background: '#eb2c29', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
            {loading ? <div className={styles.loader}></div> : '💾 Guardar Vacante'}
          </button>
        </div>
      </form>
    </div>
  );
}
