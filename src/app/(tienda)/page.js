import Image from 'next/image';
import PageLayout from '@/components/PageLayout';
import BannerSlider from '@/components/BannerSlider';
import BottomCategories from '@/components/BottomCategories';

export const metadata = {
  title: 'Desechables la Estrella - Inicio',
  description: 'AUM Desechables la Estrella. Empresa líder en distribución de productos desechables desde 1988 en Guadalajara, Jalisco.',
};

export default function HomePage() {
  return (
    <>
      <BannerSlider />

      <PageLayout>
        {/* Featured Categories */}
        <section className="featured-categories" style={{ marginTop: '30px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', color: '#25306c', marginBottom: '20px', borderBottom: '3px solid #eb2c29', display: 'inline-block', paddingBottom: '5px' }}>
            Categorías Destacadas
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
            {['Vasos', 'Bolsas', 'Cubiertos', 'Popotes', 'Charolas'].map(cat => (
              <div key={cat} className="category-item-card" style={{ background: '#fff', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid #f0f0f0' }}>
                <div style={{ width: '80px', height: '80px', background: '#f5f5f5', borderRadius: '50%', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Placeholder for category image */}
                  <span style={{ fontSize: '24px', color: '#ccc' }}>📦</span>
                </div>
                <h3 style={{ fontSize: '15px', color: '#333', fontWeight: 'bold' }}>{cat}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Products */}
        <section className="recommended-products" style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '24px', color: '#25306c', marginBottom: '20px', borderBottom: '3px solid #eb2c29', display: 'inline-block', paddingBottom: '5px' }}>
            Productos Recomendados
          </h2>
          <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
              <div key={item} className="product-card" style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', transition: 'transform 0.3s, box-shadow 0.3s', border: '1px solid #eee' }}>
                <div style={{ height: '220px', background: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', position: 'relative' }}>
                  {/* Badge */}
                  {item % 3 === 0 && (
                    <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#eb2c29', color: '#fff', fontSize: '11px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px' }}>
                      MÁS VENDIDO
                    </div>
                  )}
                  <span>Imagen del Producto</span>
                </div>
                <div style={{ padding: '20px' }}>
                  <p style={{ fontSize: '12px', color: '#5874A6', fontWeight: 'bold', marginBottom: '5px' }}>CATEGORÍA</p>
                  <h3 style={{ fontSize: '16px', color: '#25306c', marginBottom: '10px', lineHeight: '1.3' }}>Producto de Ejemplo {item} - Excelente Calidad</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#333' }}>$199.00</span>
                    <span style={{ fontSize: '14px', color: '#999', textDecoration: 'line-through' }}>$250.00</span>
                  </div>
                  <button className="add-to-cart-btn" style={{ width: '100%', background: '#25306c', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.3s' }}>
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SEO Text / About */}
        <section className="about-text" style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '40px', border: '1px solid #eee' }}>
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 500px' }}>
              <h2 style={{ fontSize: '20px', color: '#25306c', marginBottom: '15px', fontWeight: 'bold' }}>Sobre Desechables la Estrella</h2>
              <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '15px' }}>
                AUM Desechables la Estrella nace en Guadalajara el 12 de Diciembre de 1988,
                creada con el propósito de satisfacer las necesidades de empaque del mercado.
                A lo largo de los años, hemos representado de manera exclusiva las más
                importantes fábricas mexicanas y distribuido marcas líderes.
              </p>
              <h3 style={{ fontSize: '16px', color: '#25306c', marginTop: '20px', marginBottom: '10px', fontWeight: 'bold' }}>Misión</h3>
              <p style={{ color: '#555', lineHeight: '1.6' }}>
                Ofrecer productos desechables de la mejor calidad y al mejor precio, brindando
                un servicio de clase mundial con el respaldo de nuestras fábricas.
              </p>
            </div>
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Image
                src="/images/fabrica.jpg"
                alt="Fábrica Desechables la Estrella"
                width={500}
                height={200}
                style={{ borderRadius: '8px', objectFit: 'cover', width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
