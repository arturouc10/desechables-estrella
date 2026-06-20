import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function DELETE(request, { params }) {
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
