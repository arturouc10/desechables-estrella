import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from '@/app/(tienda)/page.module.css';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const vacante = await prisma.jobVacancy.findUnique({
    where: { id }
  });

  if (!vacante || !vacante.active) {
    return {
      title: 'Vacante no encontrada | Desechables Estrella',
    };
  }

  return {
    title: `${vacante.title} | Desechables Estrella`,
    description: vacante.description.substring(0, 160),
  };
}

export default async function VacanteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const vacante = await prisma.jobVacancy.findUnique({
    where: { id }
  });

  if (!vacante || !vacante.active) {
    notFound();
  }

  return (
    <div className={styles.mainContainer} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <div className={styles.headerSection} style={{ background: '#1e293b', padding: '3rem 2rem', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '3rem' }}>
        <h1 className={styles.title} style={{ color: '#f8fafc', fontSize: '2.5rem', marginBottom: '0.5rem', letterSpacing: '0.025em' }}>{vacante.title}</h1>
        <div style={{ display: 'flex', gap: '1.5rem', color: '#cbd5e1', fontSize: '1rem', flexWrap: 'wrap', justifyContent: 'center', fontWeight: '500' }}>
          {vacante.location && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>📍 {vacante.location}</span>}
          {vacante.type && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>⏱️ {vacante.type}</span>}
          {vacante.salary && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>💵 {vacante.salary}</span>}
        </div>
      </div>

      <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto', padding: '0 1.5rem', flex: 1, paddingBottom: '4rem' }}>
        <div style={{ background: '#fff', borderRadius: '0.5rem', padding: '3rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Descripción de la Vacante
          </h2>
          <div style={{ color: '#334155', lineHeight: '1.8', whiteSpace: 'pre-wrap', fontSize: '1.1rem' }}>
            {vacante.description}
          </div>
        </div>

        <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', borderTop: '4px solid #1e293b', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '1rem' }}>¿Cumples con el perfil?</h3>
          <p style={{ color: '#475569', marginBottom: '2rem', fontSize: '1rem' }}>Nos interesa conocerte. Envíanos tu información haciendo referencia a esta posición (<strong>{vacante.title}</strong>):</p>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="tel:+523312842981" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f8fafc', border: '1px solid #cbd5e1', padding: '0.75rem 1.5rem', borderRadius: '0.25rem', color: '#0f172a', textDecoration: 'none', fontWeight: '500', transition: 'all 0.2s', fontSize: '1rem' }}>
              📞 (33) 1284-2981
            </a>
            <a href={`mailto:ventas@desechables-estrella.com?subject=Postulación: ${vacante.title}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#1e293b', padding: '0.75rem 1.5rem', borderRadius: '0.25rem', color: '#f8fafc', textDecoration: 'none', fontWeight: '500', transition: 'all 0.2s', fontSize: '1rem' }}>
              ✉️ Enviar CV por Correo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
