import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="content-area">
      <div className="page-body">
        <main className="main-content texto">
          {children}
        </main>
      </div>
    </div>
  );
}
