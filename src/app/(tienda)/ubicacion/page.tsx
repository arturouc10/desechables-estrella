import Image from 'next/image';
import PageLayout from '@/components/PageLayout';

export const metadata = {
  title: 'Desechables la Estrella - Ubicación',
  description: 'Ubicación de Desechables la Estrella. Calle Abeja 1142, Mercado de Abastos, Guadalajara, Jalisco.',
};

export default function UbicacionPage() {
  return (
    <PageLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#173c66', fontWeight: 'bold', marginBottom: '1rem' }}>
            Nuestras Ubicaciones
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#4b5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            En Desechables la Estrella contamos con diversas sucursales y puntos de distribución
            estratégicos para brindarte el mejor servicio y atención, estés donde estés.
            Visítanos en nuestra sucursal principal o contáctanos para conocer tu punto de venta más cercano.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {/* Tarjeta Sucursal Principal */}
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', borderTop: '5px solid #eb2c29' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#173c66', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Sucursal Matriz (Abastos)
            </h3>
            <p style={{ color: '#4b5563', marginBottom: '0.5rem', lineHeight: '1.5' }}>
              <strong>Dirección:</strong> Calle Abeja 1142, Comercial Abastos, Guadalajara, Jalisco. C.P. 44530
            </p>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              <strong>Horario:</strong> Lunes a Viernes de 8:00 am a 6:00 pm<br />Sábados de 8:00 am a 2:00 pm
            </p>
            <a
              href="https://maps.google.com.mx/maps?f=q&source=embed&hl=es&geocode=&q=Abeja+1142,+Comercial+Abastos,+Guadalajara,+Jalisco"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', background: '#eb2c29', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold', transition: 'background 0.3s' }}
            >
              Abrir en Google Maps
            </a>
          </div>

          {/* Tarjeta Otras Sucursales */}
          <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '1rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#173c66', marginBottom: '1rem' }}>
              Red de Distribución Nacional
            </h3>
            <p style={{ color: '#4b5563', marginBottom: '1rem', lineHeight: '1.5' }}>
              Además de nuestra matriz en Guadalajara, contamos con cobertura y representantes
              a lo largo de toda la República Mexicana para garantizar la disponibilidad
              de nuestros productos.
            </p>
            <p style={{ color: '#4b5563', fontWeight: '500', marginBottom: '1.5rem' }}>
              Contáctanos para canalizarte con el distribuidor de tu zona.
            </p>
            <div style={{ textAlign: 'center', marginTop: 'auto' }}>
              <Image
                src="/images/mapa.png"
                alt="Mapa de distribuidores - Cobertura nacional"
                width={500}
                height={286}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '0.5rem', opacity: '0.9' }}
              />
            </div>
          </div>
        </div>

        {/* Mapa Principal */}
        <div style={{ background: '#fff', padding: '1rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <iframe
            width="100%"
            height="450"
            frameBorder="0"
            style={{ borderRadius: '0.5rem' }}
            src="https://maps.google.com.mx/maps?f=q&source=s_q&hl=es&geocode=&q=Abeja+1142,+Comercial+Abastos,+Guadalajara,+Jalisco&aq=0&sll=23.625269,-102.540613&sspn=31.162682,39.506836&vpsrc=0&ie=UTF8&hq=&hnear=Abeja+1142,+Guadalajara,+Jalisco&t=m&z=14&ll=20.657239,-103.382687&output=embed"
            title="Mapa de ubicación - Desechables la Estrella"
          />
        </div>
      </div>
    </PageLayout>
  );
}
