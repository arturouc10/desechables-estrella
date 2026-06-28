import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/session';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 🔒 Verify authentication
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: body.name ?? existing.name,
        slug: body.slug ?? existing.slug,
        description: body.description ?? existing.description,
        price: body.price !== undefined ? body.price : existing.price,
        category: body.category ?? existing.category,
        weight: body.weight !== undefined ? body.weight : existing.weight,
        stock: body.stock !== undefined ? body.stock : existing.stock,
        sku: body.sku !== undefined ? body.sku : existing.sku,
        image: body.image !== undefined ? body.image : existing.image,
        images: body.images !== undefined ? body.images : existing.images,
        featured: body.featured ?? existing.featured
      }
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return NextResponse.json({ error: "Error al actualizar producto" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 🔒 Verify authentication
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { id } = await params;
    
    await prisma.product.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Producto eliminado correctamente" }, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return NextResponse.json({ error: "Error al eliminar producto" }, { status: 500 });
  }
}
