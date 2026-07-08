import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from '@/app/(tienda)/page.module.css';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Bolsa de Trabajo | Desechables Estrella',
  description: 'Únete a nuestro equipo de trabajo en Desechables Estrella. Consulta nuestras vacantes disponibles.',
};

// Revalidar cada hora (o usar revalidate = 0 para siempre fresco)
export const revalidate = 3600;

export default async function BolsaDeTrabajoPage() {
  let vacantes = [];
  try {
    vacantes = await prisma.jobVacancy.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching vacantes:', error);
  }

  return (
    <>
      <div className={styles.mainContainer} style={{ minHeight: 'calc(100vh - 400px)' }}>
        <div className={styles.headerSection} style={{ background: 'linear-gradient(135deg, #173c66 0%, #0d223a 100%)', padding: '4rem 2rem', textAlign: 'center', borderRadius: '0 0 2rem 2rem', marginBottom: '3rem' }}>
          <h1 className={styles.title} style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '1rem' }}>Bolsa de Trabajo</h1>
          <p className={styles.subtitle} style={{ color: '#e5e7eb', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Forma parte de la familia Desechables la Estrella. Explora las oportunidades que tenemos para ti.
          </p>
        </div>

        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem', minHeight: '50vh' }}>
          {vacantes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#f9fafb', borderRadius: '1rem', border: '1px dashed #d1d5db' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#374151', marginBottom: '1rem' }}>Por el momento no hay vacantes disponibles</h3>
              <p style={{ color: '#6b7280' }}>Síguenos en nuestras redes sociales para futuras oportunidades o contáctanos directamente si deseas dejar tu CV.</p>
              <div style={{ marginTop: '2rem' }}>
                <Link href="/contacto" style={{ display: 'inline-block', background: '#eb2c29', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold' }}>
                  Ir a Contacto
                </Link>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {vacantes.map((vacante) => (
                <div key={vacante.id} style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#173c66', marginBottom: '0.5rem' }}>{vacante.title}</h2>
                      <div style={{ display: 'flex', gap: '1rem', color: '#4b5563', fontSize: '0.9rem', flexWrap: 'wrap' }}>
                        {vacante.location && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>📍 {vacante.location}</span>}
                        {vacante.type && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontWeight: '500' }}>⏱️ {vacante.type}</span>}
                        {vacante.salary && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: '#dcfce7', color: '#166534', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontWeight: '500' }}>💵 {vacante.salary}</span>}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    color: '#374151',
                    lineHeight: '1.6',
                    marginBottom: '2rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {vacante.description}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link
                      href={`/vacante/${vacante.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: '#eb2c29',
                        color: 'white',
                        padding: '0.6rem 1.5rem',
                        borderRadius: '0.5rem',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        transition: 'all 0.2s',
                        display: 'inline-block'
                      }}
                    >
                      Ver Detalle
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
