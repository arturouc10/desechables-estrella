import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from '../../page.module.css';

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
    <div className={styles.mainContainer}>
      <div className={styles.headerSection} style={{ background: 'linear-gradient(135deg, #173c66 0%, #0d223a 100%)', padding: '3rem 2rem', textAlign: 'center', borderRadius: '0 0 2rem 2rem', marginBottom: '3rem' }}>
        <h1 className={styles.title} style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '0.5rem' }}>{vacante.title}</h1>
        <div style={{ display: 'flex', gap: '1rem', color: '#e5e7eb', fontSize: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {vacante.location && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>📍 {vacante.location}</span>}
          {vacante.type && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>⏱️ {vacante.type}</span>}
          {vacante.salary && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>💵 {vacante.salary}</span>}
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', minHeight: '50vh', paddingBottom: '4rem' }}>
        <Link href="/bolsa-de-trabajo" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#173c66', textDecoration: 'none', fontWeight: 'bold', marginBottom: '2rem' }}>
          ← Volver a la Bolsa de Trabajo
        </Link>
        
        <div style={{ background: '#fff', borderRadius: '1rem', padding: '2.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#173c66', marginBottom: '1.5rem', borderBottom: '2px solid #f3f4f6', paddingBottom: '0.75rem' }}>
            Descripción de la Vacante
          </h2>
          <div style={{ color: '#374151', lineHeight: '1.8', whiteSpace: 'pre-wrap', fontSize: '1.05rem' }}>
            {vacante.description}
          </div>
        </div>

        <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '1rem', borderLeft: '5px solid #eb2c29', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '0.75rem' }}>¿Cumples con el perfil y te interesa unirte a nosotros?</h3>
          <p style={{ color: '#475569', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Ponte en contacto con nosotros mencionando el título del puesto (<strong>{vacante.title}</strong>):</p>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="tel:+523312842981" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#fff', border: '1px solid #cbd5e1', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', color: '#0f172a', textDecoration: 'none', fontWeight: '600', transition: 'all 0.2s', fontSize: '1.1rem' }}>
              📞 (33) 1284-2981
            </a>
            <a href={`mailto:ventas@desechables-estrella.com?subject=Postulación: ${vacante.title}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#eb2c29', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', color: '#fff', textDecoration: 'none', fontWeight: '600', transition: 'all 0.2s', fontSize: '1.1rem' }}>
              ✉️ Enviar mi CV por correo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
