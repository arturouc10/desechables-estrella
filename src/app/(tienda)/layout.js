import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TiendaLayout({ children }) {
  return (
    <div className="site-wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
