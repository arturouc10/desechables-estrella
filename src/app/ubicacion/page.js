import PageLayout from '@/components/PageLayout';
import BottomCategories from '@/components/BottomCategories';

export const metadata = {
  title: 'Desechables la Estrella - Ubicación',
  description: 'Ubicación de Desechables la Estrella. Calle Abeja 1142, Mercado de Abastos, Guadalajara, Jalisco.',
};

export default function UbicacionPage() {
  return (
    <>
      <PageLayout>
        <div className="map-container">
          <iframe
            width="670"
            height="370"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://maps.google.com.mx/maps?f=q&source=s_q&hl=es&geocode=&q=Abeja+1142,+Comercial+Abastos,+Guadalajara,+Jalisco&aq=0&sll=23.625269,-102.540613&sspn=31.162682,39.506836&vpsrc=0&ie=UTF8&hq=&hnear=Abeja+1142,+Guadalajara,+Jalisco&t=m&z=14&ll=20.657239,-103.382687&output=embed"
            title="Mapa de ubicación - Desechables la Estrella"
          />
          <br />
          <small>
            <a
              href="https://maps.google.com.mx/maps?f=q&source=embed&hl=es&geocode=&q=Abeja+1142,+Comercial+Abastos,+Guadalajara,+Jalisco&aq=0&sll=23.625269,-102.540613&sspn=31.162682,39.506836&vpsrc=0&ie=UTF8&hq=&hnear=Abeja+1142,+Guadalajara,+Jalisco&t=m&z=14&ll=20.657239,-103.382687"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0000FF', textAlign: 'left' }}
            >
              Ver mapa más grande
            </a>
          </small>
        </div>
      </PageLayout>

      <BottomCategories />
    </>
  );
}
