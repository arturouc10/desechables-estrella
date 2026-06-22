import { prisma } from '../src/lib/prisma';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('Iniciando el script de carga de productos...');

  const dataDir = path.join(process.cwd(), 'src', 'data');
  const files = fs.readdirSync(dataDir).filter(f => f.startsWith('products-') && f.endsWith('.json'));

  for (const file of files) {
    console.log(`\nLeyendo archivo: ${file}`);
    const filePath = path.join(dataDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(fileContent);

    for (const product of products) {
      try {
        await prisma.product.upsert({
          where: { slug: product.slug },
          update: {
            name: product.name,
            description: product.description,
            weight: product.weight,
            category: product.category,
            image: product.image,
            price: product.price,
            stock: product.stock,
            sku: product.sku,
            featured: product.featured,
          },
          create: {
            id: product.id,
            slug: product.slug,
            name: product.name,
            description: product.description,
            weight: product.weight,
            category: product.category,
            image: product.image,
            price: product.price,
            stock: product.stock,
            sku: product.sku,
            featured: product.featured,
          },
        });
        console.log(`  ✓ Producto subido: ${product.name}`);
      } catch (error) {
        console.error(`  x Error al subir el producto ${product.name}:`, error.message);
      }
    }
  }

  console.log('\n¡Todos los productos han sido cargados exitosamente!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
