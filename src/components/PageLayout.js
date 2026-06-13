import BannerSlider from './BannerSlider';
import Link from 'next/link';
import Image from 'next/image';

export default function PageLayout({ children, showRepublica = false }) {
  return (
    <div className="content-area">
      <div className="page-body">
        <aside className="sidebar">
          <BannerSlider />
          {showRepublica && (
            <div className="sidebar-republica">
              <Link href="/distribuidores">
                <Image
                  src="/images/republica.JPG"
                  alt="Distribuidores en toda la República"
                  width={205}
                  height={205}
                />
              </Link>
            </div>
          )}
        </aside>
        <main className="main-content texto">
          {children}
        </main>
      </div>
    </div>
  );
}
