'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/empresa', label: 'Empresa' },
  { href: '/productos', label: 'Productos' },
  { href: '/ubicacion', label: 'Ubicación' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/distribuidores', label: 'Distribuidores' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-logo">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Desechables la Estrella - Logo"
            width={205}
            height={242}
            priority
          />
        </Link>
      </div>
      <div className="header-nav-area">
        <div className="header-brand">
          <h1>
            Desechables la <span>Estrella</span>
          </h1>
          <p>Distribuidores de productos desechables desde 1988</p>
        </div>

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

        {/* E-commerce: Cart button (hidden until activated) */}
        <button className="header-cart" id="cart-button">
          🛒 Carrito <span className="cart-count">0</span>
        </button>
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
