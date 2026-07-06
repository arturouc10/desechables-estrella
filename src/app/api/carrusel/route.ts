import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/session';

export async function GET() {
  try {
    const images = await prisma.carouselImage.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching carousel images:', error);
    return NextResponse.json({ error: 'Error fetching images' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAuth = await verifySession();
    if (!isAuth) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'Se requiere la URL de la imagen' }, { status: 400 });
    }

    // Assign order to be at the end
    const lastImage = await prisma.carouselImage.findFirst({
      orderBy: { order: 'desc' },
    });
    const newOrder = lastImage ? lastImage.order + 1 : 0;

    const newImage = await prisma.carouselImage.create({
      data: {
        url,
        order: newOrder,
        active: true,
      },
    });

    return NextResponse.json(newImage);
  } catch (error) {
    console.error('Error creating carousel image:', error);
    return NextResponse.json({ error: 'Error creando la imagen' }, { status: 500 });
  }
}
