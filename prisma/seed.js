// Seed script — run with: node --env-file=.env prisma/seed.js
// Reads all product JSON files and inserts them into the Supabase database.
// Uses skipDuplicates so it can be run multiple times safely.

import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Dynamic import of the generated Prisma client (TypeScript)
// We need to use the same approach as the app itself
const { PrismaClient } = await import('../src/generated/prisma/client.ts');

// Setup Prisma with PG adapter (same config as src/lib/prisma.js)
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Load all product JSON files
const dataDir = join(__dirname, '..', 'src', 'data');

const files = [
  'products-aum.json',
  'products-ecobolsas.json',
  'products-envases.json',
  'products-camisa.json',
];

async function main() {
  console.log('🌱 Iniciando seed de productos...\n');

  let totalInserted = 0;

  for (const file of files) {
    const filePath = join(dataDir, file);
    const raw = readFileSync(filePath, 'utf-8');
    const products = JSON.parse(raw);

    console.log(`📦 Procesando ${file} (${products.length} productos)...`);

    // Use createMany with skipDuplicates to avoid errors on re-runs
    const result = await prisma.product.createMany({
      data: products.map((p) => ({
        name: p.name,
        slug: p.slug,
        description: p.description || null,
        weight: p.weight || null,
        category: p.category,
        image: p.image || null,
        price: p.price || null,
        stock: p.stock || null,
        sku: p.sku || null,
        featured: p.featured || false,
      })),
      skipDuplicates: true,
    });

    console.log(`   ✅ ${result.count} productos insertados (duplicados omitidos)\n`);
    totalInserted += result.count;
  }

  console.log(`\n🎉 Seed completado. Total insertados: ${totalInserted}`);
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
