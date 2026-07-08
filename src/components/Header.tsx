'use client';

import { Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { siteConfig } from '@/lib/config';
import { useCart } from '@/context/CartContext';

function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/productos?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/productos');
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" aria-label="Buscar" className="search-button">
        🔍
      </button>
    </form>
  );
}

interface NavItem {
  href: string;
  label: string;
  target?: string;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Inicio' },
  { href: '/empresa', label: 'Empresa' },
  { href: '/productos', label: 'Productos' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/bolsa-de-trabajo', label: 'Bolsa de Trabajo', target: '_blank' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { getCartCount } = useCart();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-container">
        {/* Left: Logo and Brand */}
        <div className="header-left">
          <Link href="/" className="header-logo-link">
            <div className="header-logo">
              <Image
                src="/images/logo.png"
                alt="Desechables la Estrella - Logo"
                width={70}
                height={83}
                priority
              />
            </div>
            <div className="header-brand">
              <h1>
                Desechables la <span>Estrella</span>
              </h1>
            </div>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="header-center">
          {pathname.startsWith('/productos') && (
            <Suspense fallback={<div className="search-bar"><input type="text" placeholder="Buscar productos..." readOnly /><button className="search-button">Buscar</button></div>}>
              <SearchInput />
            </Suspense>
          )}
        </div>

        {/* Right: Cart and Hamburger */}
        <div className="header-right">
          {siteConfig.isEcommerceEnabled && (
            <Link href="/pedido" className="header-cart" id="cart-button" style={{ textDecoration: 'none' }}>
              🛒 Mi Pedido <span className="cart-count">{getCartCount()}</span>
            </Link>
          )}

          {/* Hamburger button - visible only on mobile/tablet */}
          <button
            className={`hamburger-btn ${menuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Abrir menú de navegación"
            id="hamburger-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Navigation (Bottom part of header or off-canvas) */}
      <div className="header-nav-area">
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} id="main-navigation">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  target={item.target}
                  rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                  className={pathname === item.href ? 'active' : ''}
                  id={`nav-${item.href.replace('/', '') || 'inicio'}`}
                  onClick={item.target === '_blank' ? undefined : closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay to close menu when tapping outside */}
      {menuOpen && (
        <div
          className="mobile-nav-overlay active"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}
