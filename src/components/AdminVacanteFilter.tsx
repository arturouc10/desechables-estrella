'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AdminVacanteFilterProps {
  vacantes: any[];
}

export default function AdminVacanteFilter({ vacantes }: AdminVacanteFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar la vacante "${title}"? Esta acción no se puede deshacer.`)) {
      return;
    }
    
    try {
      setIsDeleting(id);
      const res = await fetch(`/api/vacantes/${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        router.refresh();
      } else {
        const error = await res.json();
        alert(`Error al eliminar: ${error.error || 'Desconocido'}`);
      }
    } catch (err) {
      alert('Error de red al intentar eliminar la vacante.');
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredVacantes = vacantes.filter(v => 
    v.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="🔍 Buscar vacante por título..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '0.75rem 1.25rem',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
            fontSize: '1rem',
            outline: 'none',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
          }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredVacantes.filter(v => v.active).length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#173c66', marginBottom: '0.5rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem', fontWeight: 'bold' }}>
              Vacantes Activas
            </h2>
            {filteredVacantes.filter(v => v.active).map((vacante) => (
              <div key={vacante.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                background: '#fff', 
                border: '1px solid #e5e7eb', 
                borderRadius: '0.5rem', 
                padding: '1rem', 
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <div style={{ flex: '1 1 300px' }}>
                  <div style={{ fontWeight: '600', color: '#111827', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                    {vacante.title}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#6b7280', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {vacante.location && <span>📍 {vacante.location}</span>}
                    {vacante.type && <span>⏱️ {vacante.type}</span>}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <Link 
                    href={`/admin/vacantes/${vacante.id}/editar`}
                    style={{ background: '#f3f4f6', color: '#173c66', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: '500', fontSize: '0.85rem', textDecoration: 'none', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    ✏️ Editar
                  </Link>
                  <button 
                    onClick={() => handleDelete(vacante.id, vacante.title)}
                    disabled={isDeleting === vacante.id}
                    title="Eliminar vacante" 
                    style={{ background: '#fee2e2', color: '#b91c1c', border: '1px solid #fecaca', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: '500', fontSize: '0.85rem', cursor: isDeleting === vacante.id ? 'not-allowed' : 'pointer', opacity: isDeleting === vacante.id ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    {isDeleting === vacante.id ? '🗑️...' : '🗑️ Eliminar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredVacantes.filter(v => !v.active).length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#9ca3af', marginBottom: '0.5rem', borderBottom: '2px dashed #e5e7eb', paddingBottom: '0.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🚫 Vacantes Inactivas
            </h2>
            {filteredVacantes.filter(v => !v.active).map((vacante) => (
              <div key={vacante.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                background: '#f9fafb', 
                border: '1px solid #e5e7eb', 
                borderRadius: '0.5rem', 
                padding: '1rem', 
                boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
                gap: '1rem',
                flexWrap: 'wrap',
                opacity: 0.7
              }}>
                <div style={{ flex: '1 1 300px' }}>
                  <div style={{ fontWeight: '600', color: '#4b5563', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                    {vacante.title}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#9ca3af', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {vacante.location && <span>📍 {vacante.location}</span>}
                    {vacante.type && <span>⏱️ {vacante.type}</span>}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <Link 
                    href={`/admin/vacantes/${vacante.id}/editar`}
                    style={{ background: '#f3f4f6', color: '#4b5563', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: '500', fontSize: '0.85rem', textDecoration: 'none', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    ✏️ Editar
                  </Link>
                  <button 
                    onClick={() => handleDelete(vacante.id, vacante.title)}
                    disabled={isDeleting === vacante.id}
                    title="Eliminar vacante" 
                    style={{ background: '#fee2e2', color: '#b91c1c', border: '1px solid #fecaca', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: '500', fontSize: '0.85rem', cursor: isDeleting === vacante.id ? 'not-allowed' : 'pointer', opacity: isDeleting === vacante.id ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    {isDeleting === vacante.id ? '🗑️...' : '🗑️ Eliminar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredVacantes.length === 0 && (
          <div style={{ textAlign: 'center', color: '#666', padding: '3rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            No se encontraron vacantes.
          </div>
        )}
      </div>
    </div>
  );
}
