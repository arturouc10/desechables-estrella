'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Inicio' },
  { href: '/empresa', label: 'Empresa' },
  { href: '/productos', label: 'Productos' },
  { href: '/ubicacion', label: 'Ubicación' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Center: Search Bar (Simulated) */}
        <div className="header-center">
          {pathname.startsWith('/productos') && (
            <div className="search-bar">
              <input type="text" placeholder="Buscar productos..." />
              <button aria-label="Buscar" className="search-button">
                🔍
              </button>
            </div>
          )}
        </div>

        {/* Right: Cart and Hamburger */}
        <div className="header-right">
          <button className="header-cart" id="cart-button">
            🛒 Mi Carrito <span className="cart-count">0</span>
          </button>

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
                  className={pathname === item.href ? 'active' : ''}
                  id={`nav-${item.href.replace('/', '') || 'inicio'}`}
                  onClick={closeMenu}
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
