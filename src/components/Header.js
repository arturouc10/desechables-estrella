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
      <div className="header-top">
        <div className="header-logo">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Desechables la Estrella - Logo"
              width={150}
              height={80}
              priority
            />
          </Link>
        </div>
        
        <div className="header-search">
          <input type="text" placeholder="Buscar productos, marcas y más..." />
          <button type="button">Buscar</button>
        </div>

        <button className="header-cart" id="cart-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          Carrito <span className="cart-count">0</span>
        </button>
      </div>

      <div className="header-nav-area">
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
      </div>

      {menuOpen && (
        <div
          className="mobile-nav-overlay active"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}
