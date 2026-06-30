'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/types';

interface AdminProductFilterProps {
  products: Product[];
  categoriesData: { id: string; name: string; slug: string; section: string }[];
}

export default function AdminProductFilter({ products, categoriesData }: AdminProductFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Filter products by name and category
  const filteredProducts = products.filter(p => {
    const matchesName = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()));
                       
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    
    return matchesName && matchesCategory;
  });

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="🔍 Buscar producto por nombre..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1 1 300px',
            padding: '0.75rem 1.25rem',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
            fontSize: '1rem',
            outline: 'none',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '0 0.5rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
          <span style={{ padding: '0.5rem', color: '#6b7280' }}>📁</span>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '0.75rem 1rem 0.75rem 0',
              border: 'none',
              background: 'transparent',
              fontSize: '1rem',
              outline: 'none',
              cursor: 'pointer',
              color: '#374151',
              fontWeight: '500'
            }}
          >
            <option value="ALL">Todas las Categorías</option>
            {categoriesData.map(c => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {categoriesData.map((category) => {
          const categoryProducts = filteredProducts.filter(p => p.category === category.slug);
          
          if (categoryProducts.length === 0) return null;

          return (
            <div key={category.id}>
              <h2 style={{ fontSize: '1.5rem', color: '#173c66', marginBottom: '1.5rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem', fontWeight: 'bold' }}>
                {category.name} <span style={{ fontSize: '1rem', color: '#6b7280', fontWeight: 'normal' }}>({categoryProducts.length})</span>
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {categoryProducts.map((product) => (
                  <div key={product.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    background: '#fff', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '0.5rem', 
                    padding: '0.75rem', 
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    {/* Left: Thumbnail and Basic Info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 300px' }}>
                      {product.image ? (
                        <img src={product.image} alt={product.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '0.375rem', border: '1px solid #f3f4f6' }} />
                      ) : (
                        <div style={{ width: '60px', height: '60px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', borderRadius: '0.375rem', border: '1px solid #e5e7eb' }}>
                          📸
                        </div>
                      )}
                      <div>
                        <div style={{ fontWeight: '600', color: '#111827', fontSize: '1rem', marginBottom: '0.15rem' }}>{product.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#6b7280', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <span style={{ background: '#f3f4f6', padding: '0.1rem 0.4rem', borderRadius: '0.25rem' }}>{category.name}</span>
                          {product.sku && <span>SKU: {product.sku}</span>}
                          {product.weight && <span>{product.weight}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Middle: Stock and Price */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: '1 1 150px' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stock</div>
                        <div style={{ fontWeight: '500', color: '#374151' }}>{product.stock !== null ? product.stock : '-'}</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Precio</div>
                        <div style={{ fontWeight: '600', color: '#10b981' }}>{product.price ? `$${product.price.toFixed(2)}` : '-'}</div>
                      </div>
                    </div>
                    
                    {/* Right: Actions */}
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <Link 
                        href={`/admin/productos/${product.id}/editar`}
                        style={{ background: '#f3f4f6', color: '#173c66', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: '500', fontSize: '0.85rem', textDecoration: 'none', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                      >
                        ✏️ Editar
                      </Link>
                      <button disabled title="Función próximamente" style={{ background: '#fee2e2', color: '#b91c1c', border: '1px solid #fecaca', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: '500', fontSize: '0.85rem', cursor: 'not-allowed', opacity: 0.7, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', color: '#666', padding: '3rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            No se encontraron productos que coincidan con la búsqueda.
          </div>
        )}
      </div>
    </div>
  );
}
