import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/session';

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    // Convert to a simple key-value object
    const settingsObj = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
    
    return NextResponse.json(settingsObj);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Error fetching settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAuth = await verifySession();
    if (!isAuth) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { key, value } = body;

    if (!key) {
      return NextResponse.json({ error: 'Se requiere la clave (key) de la configuración' }, { status: 400 });
    }

    const upsertedSetting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    return NextResponse.json(upsertedSetting);
  } catch (error) {
    console.error('Error updating setting:', error);
    return NextResponse.json({ error: 'Error actualizando la configuración' }, { status: 500 });
  }
}
