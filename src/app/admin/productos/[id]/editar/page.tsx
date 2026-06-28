import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import EditProductClient from '@/components/EditProductClient';
import categoriesData from '@/data/categories.json';

export const revalidate = 0;

export default async function EditarProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    redirect('/admin/productos');
  }

  // Fetch other products in the exact same category
  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id }
    },
    orderBy: { name: 'asc' }
  });

  return (
    <div>
      <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '2px solid #e5e7eb' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#173c66', margin: 0 }}>✏️ Editar Producto</h1>
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 500px', minWidth: '300px' }}>
          <EditProductClient product={product} />
        </div>

        {/* Sidebar with related products */}
        <div style={{ flex: '1 1 300px', maxWidth: '400px', background: '#fff', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', position: 'sticky', top: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#173c66', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
            Otros en esta categoría
          </h3>

          {relatedProducts.length === 0 ? (
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>No hay otros productos registrados en esta misma categoría.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '600px', overflowY: 'auto' }}>
              {relatedProducts.map(rp => (
                <a
                  key={rp.id}
                  href={`/admin/productos/${rp.id}/editar`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    color: '#1f2937',
                    background: '#f9fafb',
                    border: '1px solid #f3f4f6',
                    transition: 'background 0.2s'
                  }}
                >
                  {rp.image ? (
                    <img src={rp.image} alt={rp.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '0.25rem' }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', background: '#e5e7eb', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>
                      📸
                    </div>
                  )}
                  <span style={{ fontSize: '0.85rem', fontWeight: '500', lineHeight: '1.2' }}>{rp.name}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
