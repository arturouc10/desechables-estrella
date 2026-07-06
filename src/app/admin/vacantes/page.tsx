import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from '../admin.module.css';
import AdminVacanteFilter from '@/components/AdminVacanteFilter';

export const revalidate = 0; // Evitar caché estático

export default async function AdminVacantesPage() {
  let vacantes = [];
  let dbError = false;

  try {
    vacantes = await prisma.jobVacancy.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Error conectando a Prisma:", error);
    dbError = true;
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>💼 Bolsa de Trabajo</h1>
        <Link href="/admin/vacantes/nuevo" className={styles.primaryButton}>
          ➕ Añadir Vacante
        </Link>
      </div>

      {dbError && (
        <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', border: '1px solid rgba(239, 68, 68, 0.5)' }}>
          <strong>⚠️ Atención:</strong> Hubo un error de conexión con la base de datos.
        </div>
      )}

      {vacantes.length === 0 && !dbError ? (
        <div style={{ textAlign: 'center', color: '#666', padding: '3rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          Aún no tienes vacantes publicadas. ¡Añade la primera!
        </div>
      ) : (
        !dbError && <AdminVacanteFilter vacantes={vacantes} />
      )}
    </div>
  );
}
