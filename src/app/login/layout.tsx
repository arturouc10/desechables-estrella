import { ReactNode } from 'react';

export const metadata = {
  title: 'Login | Desechables Estrella',
  description: 'Acceso al panel de administración',
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
