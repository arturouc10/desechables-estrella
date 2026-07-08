import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/session';
import { JobVacancySchema } from '@/lib/validations';

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

    // ✅ Validate with Zod
    const parsed = JobVacancySchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const data = parsed.data;

    const existing = await prisma.jobVacancy.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Vacante no encontrada' }, { status: 404 });
    }

    const updatedVacancy = await prisma.jobVacancy.update({
      where: { id },
      data: {
        title: data.title ?? existing.title,
        description: data.description ?? existing.description,
        location: data.location !== undefined ? data.location : existing.location,
        type: data.type !== undefined ? data.type : existing.type,
        salary: data.salary !== undefined ? data.salary : existing.salary,
        active: data.active !== undefined ? data.active : existing.active,
      }
    });

    // Revalidar la caché
    revalidatePath('/bolsa-de-trabajo');
    revalidatePath(`/vacante/${id}`);
    revalidatePath(`/bolsa-de-trabajo/${id}`);

    return NextResponse.json(updatedVacancy, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar vacante:", error);
    return NextResponse.json({ error: "Error al actualizar vacante" }, { status: 500 });
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
    
    await prisma.jobVacancy.delete({
      where: { id }
    });

    // Revalidar la caché
    revalidatePath('/bolsa-de-trabajo');

    return NextResponse.json({ message: "Vacante eliminada correctamente" }, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar vacante:", error);
    return NextResponse.json({ error: "Error al eliminar vacante" }, { status: 500 });
  }
}
