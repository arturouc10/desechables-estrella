import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TiendaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
