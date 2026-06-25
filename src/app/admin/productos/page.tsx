import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from '../admin.module.css';
import type { Product } from '@/types';

export const revalidate = 0; // Evitar caché estático para ver productos nuevos al instante

export default async function AdminProductosPage() {
  let products: Product[] = [];
  let dbError = false;

  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Error conectando a Prisma:", error);
    dbError = true;
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>📦 Tus Productos</h1>
        <Link href="/admin/productos/nuevo" className={styles.primaryButton}>
          ➕ Añadir Producto
        </Link>
      </div>

      {dbError && (
        <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', border: '1px solid rgba(239, 68, 68, 0.5)' }}>
          <strong>⚠️ Atención:</strong> La base de datos aún no está configurada o hay un error de conexión. Por favor configura DATABASE_URL en tu archivo .env.
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && !dbError && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>
                  Aún no tienes productos. ¡Añade el primero!
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  {product.image ? (
                    <img src={product.image} alt={product.name} className={styles.productThumb} />
                  ) : (
                    <div className={styles.productThumb} style={{ background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      📸
                    </div>
                  )}
                </td>
                <td style={{ fontWeight: '600' }}>{product.name}</td>
                <td><span style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.85rem' }}>{product.category}</span></td>
                <td>{product.price ? `$${product.price.toFixed(2)}` : '-'}</td>
                <td>{product.stock !== null ? product.stock : '-'}</td>
                <td>
                  <div className={styles.actions}>
                    {/* El botón de eliminar se implementará pronto */}
                    <button className={styles.deleteBtn} title="Función de eliminar próximamente" disabled>
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
