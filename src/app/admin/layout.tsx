import { ReactNode } from 'react';
import Link from 'next/link';
import styles from './admin.module.css';

export const metadata = {
  title: 'Admin | Desechables Estrella',
  description: 'Panel de administración - Desechables Estrella',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>DESECHABLES <span>ESTRELLA</span></h2>
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/admin/productos" className={styles.navLink}>📦 Productos</Link>
          <Link href="/admin/productos/nuevo" className={styles.navLink}>➕ Nuevo Producto</Link>
          <Link href="/" className={styles.navLink} target="_blank">🌐 Ver Tienda</Link>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
