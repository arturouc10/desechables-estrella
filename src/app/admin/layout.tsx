import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/session';
import styles from './admin.module.css';
import AdminSidebar from '@/components/AdminSidebar';

export const metadata = {
  title: 'Admin | Desechables Estrella',
  description: 'Panel de administración - Desechables Estrella',
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await verifySession();
  
  if (!session || session.role !== 'admin') {
    redirect('/login');
  }

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
