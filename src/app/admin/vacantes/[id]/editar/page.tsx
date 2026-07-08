import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import EditVacanteClient from '@/components/EditVacanteClient';

export const revalidate = 0;

export default async function EditarVacantePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const vacante = await prisma.jobVacancy.findUnique({
    where: { id }
  });

  if (!vacante) {
    redirect('/admin/vacantes');
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '2px solid #e5e7eb' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#173c66', margin: 0 }}>✏️ Editar Vacante</h1>
      </div>
      <div style={{ maxWidth: '800px' }}>
        <EditVacanteClient vacante={vacante} />
      </div>
    </div>
  );
}
