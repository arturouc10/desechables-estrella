'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../app/admin/admin.module.css';

export default function AdminSidebar() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const router = useRouter();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2>DESECHABLES <span>ESTRELLA</span></h2>
      </div>
      <nav className={styles.sidebarNav}>
        
        <div 
          className={styles.sidebarSection}
          onMouseEnter={() => setOpenSection('productos')}
          onMouseLeave={() => setOpenSection(null)}
        >
          <div 
            className={styles.sidebarSectionHeader}
            onClick={() => {
              setOpenSection('productos');
              router.push('/admin/productos');
            }}
          >
            <span>📦 Productos</span>
            <span>{openSection === 'productos' ? '▼' : '▶'}</span>
          </div>
          {openSection === 'productos' && (
            <div className={styles.sidebarSubMenu}>
              <Link href="/admin/productos" className={styles.navLink}>Listado de Productos</Link>
              <Link href="/admin/productos/nuevo" className={styles.navLink}>➕ Agregar Producto</Link>
            </div>
          )}
        </div>

        <div 
          className={styles.sidebarSection}
          onMouseEnter={() => setOpenSection('vacantes')}
          onMouseLeave={() => setOpenSection(null)}
        >
          <div 
            className={styles.sidebarSectionHeader}
            onClick={() => {
              setOpenSection('vacantes');
              router.push('/admin/vacantes');
            }}
          >
            <span>💼 Vacantes</span>
            <span>{openSection === 'vacantes' ? '▼' : '▶'}</span>
          </div>
          {openSection === 'vacantes' && (
            <div className={styles.sidebarSubMenu}>
              <Link href="/admin/vacantes" className={styles.navLink}>Listado de Vacantes</Link>
              <Link href="/admin/vacantes/nuevo" className={styles.navLink}>➕ Agregar Vacante</Link>
            </div>
          )}
        </div>

        <div 
          className={styles.sidebarSection}
          onMouseEnter={() => setOpenSection('carrusel')}
          onMouseLeave={() => setOpenSection(null)}
        >
          <div 
            className={styles.sidebarSectionHeader}
            onClick={() => {
              setOpenSection('carrusel');
              router.push('/admin/carrusel');
            }}
          >
            <span>🖼️ Carrusel</span>
            <span>{openSection === 'carrusel' ? '▼' : '▶'}</span>
          </div>
          {openSection === 'carrusel' && (
            <div className={styles.sidebarSubMenu}>
              <Link href="/admin/carrusel" className={styles.navLink}>Editar Fotos</Link>
            </div>
          )}
        </div>

        <div style={{ marginTop: 'auto', padding: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Link href="/" className={styles.navLink} target="_blank">🌐 Ver Tienda</Link>
        </div>
      </nav>
    </aside>
  );
}
