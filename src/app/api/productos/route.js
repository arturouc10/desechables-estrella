import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Generar slug a partir del nombre o usar uno proporcionado
    const slug = data.slug || generateSlug(data.name);

    // Verificar si el slug ya existe
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      // Modificar slug para evitar colisión simple (ejemplo rápido)
      data.slug = `${slug}-${Date.now().toString().slice(-4)}`;
    } else {
      data.slug = slug;
    }

    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        category: data.category,
        weight: data.weight,
        stock: data.stock,
        sku: data.sku,
        image: data.image,
      }
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return NextResponse.json({ error: "Error al crear producto" }, { status: 500 });
  }
}
