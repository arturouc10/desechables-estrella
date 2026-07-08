import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/session';
import { JobVacancySchema } from '@/lib/validations';

export async function GET() {
  // 🔒 Verify authentication
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const vacantes = await prisma.jobVacancy.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(vacantes);
  } catch (error) {
    console.error("Error al obtener vacantes:", error);
    return NextResponse.json({ error: "Error al obtener vacantes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // 🔒 Verify authentication
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // ✅ Validate with Zod
    const parsed = JobVacancySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const newVacancy = await prisma.jobVacancy.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location ?? null,
        type: data.type ?? null,
        salary: data.salary ?? null,
        active: data.active ?? true,
      }
    });

    // Revalidar la página de bolsa de trabajo para que se actualice inmediatamente
    revalidatePath('/bolsa-de-trabajo');

    return NextResponse.json(newVacancy, { status: 201 });
  } catch (error) {
    console.error("Error al crear vacante:", error);
    return NextResponse.json({ error: "Error al crear vacante" }, { status: 500 });
  }
}
