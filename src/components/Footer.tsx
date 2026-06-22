import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <div className="footer-line">
        <Image
          src="/images/pie.png"
          alt=""
          width={950}
          height={18}
        />
      </div>
      <div className="footer-content">
        <span className="pie">
          Desechables la Estrella &reg; 2026 TODOS LOS DERECHOS RESERVADOS
        </span>
        <div className="seventeen-logo">
          <span className="pie"> <a href="http://www.seventeencorp.com/" target="_blank">Seventeen Corp</a></span>
        </div>
      </div>
    </footer >
  );
}
