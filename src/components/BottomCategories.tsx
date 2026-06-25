import Link from 'next/link';
import Image from 'next/image';

export default function BottomCategories() {
  return (
    <div className="bottom-categories">
      <Link href="/ecobolsas">
        <Image
          src="/ecobolsas.jpg"
          alt="Eco Bolsas"
          width={208}
          height={167}
        />
      </Link>
      <Link href="/productos">
        <Image
          src="/productos.jpg"
          alt="Productos"
          width={207}
          height={167}
        />
      </Link>
      <Link href="/contacto">
        <Image
          src="/contacto.JPG"
          alt="Contacto"
          width={208}
          height={168}
        />
      </Link>
      <Link href="/distribuidores">
        <Image
          src="/distribuidores.JPG"
          alt="Distribuidores"
          width={209}
          height={168}
        />
      </Link>
    </div>
  );
}
