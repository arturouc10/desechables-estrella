import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from '../admin.module.css';
import type { Product } from '@/types';
import categoriesData from '@/data/categories.json';
import AdminProductFilter from '@/components/AdminProductFilter';

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

      {products.length === 0 && !dbError ? (
        <div style={{ textAlign: 'center', color: '#666', padding: '3rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          Aún no tienes productos. ¡Añade el primero!
        </div>
      ) : (
        !dbError && <AdminProductFilter products={products} categoriesData={categoriesData} />
      )}
    </div>
  );
}
