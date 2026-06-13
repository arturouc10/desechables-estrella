import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Desechables la Estrella',
  description: 'Plasticos desechables, bolsas de polietileno, ecobolsas, cubiertos de plastico, popotes, bolsas transparentes. Distribuidores desde 1988 en Guadalajara, Jalisco.',
  keywords: 'plasticos desechables, bolsas de polietileno, ecobolsas, bolsas en guadalajara, cubiertos de plastico, popotes, bolsas transparentes, aum, desechables la estrella, bolsas tipo camiseta, envases de plastico',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div className="site-wrapper">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
