import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3>Desechables la Estrella</h3>
            <p className="footer-text">
              Distribuyendo productos desechables de la más alta calidad desde 1988,
              comprometidos con el servicio al cliente y la excelencia.
            </p>
          </div>

          <div className="footer-column">
            <h3>Enlaces Rápidos</h3>
            <ul className="footer-links">
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/empresa">Nuestra Empresa</Link></li>
              <li><Link href="/productos">Catálogo de Productos</Link></li>
              <li><Link href="/contacto">Contacto</Link></li>
              <li><Link href="/privacidad">Aviso de Privacidad</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contacto</h3>
            <p className="footer-text">
              <a href="https://maps.app.goo.gl/FvGz7ZaxvvQYnoJ18" target="_blank" style={{ textDecoration: 'underline' }}>📍  Calle Abeja 1142 Mercado de Abastos Guadalajara, Jalisco C.P. 44530
              </a><br />
              📞 (33) 1284-2981<br />
              ✉️ <a href="mailto:desechables_laestrella@hotmail.com" target="_blank" style={{ color: 'inherit', textDecoration: 'underline' }}>desechables_laestrella@hotmail.com</a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="pie">
            &copy; {new Date().getFullYear()} &nbsp; Desechables la Estrella &reg; TODOS LOS DERECHOS RESERVADOS
          </p>
          <div className="seventeen-logo">
            <span className="pie">
              Desarrollado por <a href="http://www.seventeencorp.com/" target="_blank" rel="noopener noreferrer">Seventeen Corp</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
