import { ReactNode } from 'react';

export const metadata = {
  title: 'Contacto | Desechables la Estrella',
  description: 'Ponte en contacto con nosotros para cotizaciones, dudas o comentarios.',
};

export default function ContactoLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
