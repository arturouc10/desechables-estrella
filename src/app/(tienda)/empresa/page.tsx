import PageLayout from '@/components/PageLayout';
import Carousel from '@/components/Carousel';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Empresa | Desechables la Estrella',
  description: 'Conoce Desechables la Estrella, empresa 100% mexicana fundada en 1988, líder fabricante y distribuidor de desechables y bolsas ecológicas.',
};

// Definir las imágenes a mostrar en el carrusel, excluyendo las solicitadas xd
const fabImages = [1, 2, 3, 4, 6, 7, 8].map(i => `/images/fab/${i}.jpg`);
const empresaImages = [3, 5, 8, 9].map(i => `/images/empresa/${i}.jpg`);
const allImages: string[] = [...fabImages, ...empresaImages];

export default function EmpresaPage() {
  return (
    <PageLayout>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="titulo" style={{ fontSize: '32px', marginBottom: '1rem' }}>Nuestra Empresa</h1>
      </div>

      <Carousel images={allImages} autoPlayInterval={4000} />

      <div style={{ maxWidth: '1000px', margin: '4rem auto', fontSize: '18px', color: '#334155', lineHeight: '1.8' }}>

        {/* Sección Historia */}
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', color: '#173c66', marginBottom: '1.5rem', fontWeight: 'bold' }}>Sobre Nosotros</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            AUM Desechables la Estrella nace en Guadalajara el 12 de Diciembre de 1988,
            fue creada con el propósito de satisfacer las necesidades de empaque del mercado
            de Guadalajara Jalisco.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            A lo largo de los años, la compañía ha representado de manera exclusiva las más
            importantes fábricas mexicanas de este gremio y la distribucion de marcas lideres.
            Con más de 35 años de experiencia, Desechables la Estrella se ha consolidado como
            una empresa líder en la distribución y representación de productos desechables,
            llegando a todas las ciudades y poblaciones a nivel Nacional, ocupando
            orgullosamente un lugar dentro de las empresas más importantes de México.
          </p>
          <p>
            El constante crecimiento y desarrollo nos llevaron a una diversificación de nuestras actividades
            y por ende de nuestros productos, con la finalidad de satisfacer las variadas necesidades,
            tales como bolsas de polietileno, bolsa tipo camiseta, bolsas negras para basura, cubiertos
            desechables, y envases plásticos.
          </p>
        </div>

        {/* Sección Misión y Visión */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '1rem', borderTop: '5px solid #eb2c29', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#173c66', marginBottom: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Misión
            </h3>
            <p>
              Nuestra razón de ser es ofrecer productos desechables de la mejor calidad y al
              mejor precio, brindando un servicio de clase mundial con el respaldo
              de nuestras fábricas de producto. Nuestra labor principal es satisfacer las necesidades del mercado,
              haciendo énfasis en la logística y preparación de nuestro equipo para brindar un excelente servicio.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '1rem', borderTop: '5px solid #173c66', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#173c66', marginBottom: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Visión
            </h3>
            <p>
              Ser líder en el mercado de productos desechables a Nivel Nacional, ofreciendo
              y garantizando calidad en todos nuestros productos y servicios, generando resultados
              óptimos que contribuyan al crecimiento de la organización.
            </p>
          </div>
        </div>

        {/* Sección Infraestructura y Ecología */}
        <div style={{ background: '#fff', padding: '3rem', borderRadius: '1rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', marginBottom: '4rem', border: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: '1.75rem', color: '#173c66', marginBottom: '1.5rem', fontWeight: 'bold' }}>Capacidad e Infraestructura</h2>
            <p style={{ marginBottom: '1rem' }}>
              Contamos con un sólido equipo logístico y bodegas de alta capacidad que nos permiten almacenar y distribuir de forma ininterrumpida a todo el país.
            </p>
            <h3 style={{ fontSize: '1.25rem', color: '#10b981', margin: '2rem 0 1rem 0', fontWeight: 'bold' }}>Compromiso Ecológico</h3>
            <p>
              A través de nuestra marca registrada <strong>ECO BOLSAS</strong>, promovemos la sustentabilidad integrando materiales reciclables y biodegradables, asumiendo nuestra responsabilidad con el medio ambiente.
            </p>
          </div>
          <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
            <Image
              src="/images/fabrica.png"
              alt="Fábrica Desechables la Estrella"
              width={500}
              height={350}
              style={{ borderRadius: '0.75rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)', border: '1px solid #e2e8f0', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: '#173c66', color: 'white', padding: '4rem 2rem', borderRadius: '1rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}>¿Listo para trabajar con los líderes?</h2>
          <p style={{ marginBottom: '2rem', opacity: 0.9, fontSize: '1.1rem' }}>
            Descubre por qué cientos de clientes confían en nosotros para sus necesidades de empaque.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/productos" style={{ background: '#eb2c29', color: '#fff', padding: '1rem 2.5rem', borderRadius: '0.5rem', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem', boxShadow: '0 4px 10px rgba(235, 44, 41, 0.3)' }}>
              Ver Catálogo
            </Link>
            <Link href="/contacto" style={{ background: '#fff', color: '#173c66', padding: '1rem 2.5rem', borderRadius: '0.5rem', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem' }}>
              Contáctanos
            </Link>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}
