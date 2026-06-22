import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactSchema } from '@/lib/validations';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();

    // ✅ Validate with Zod
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { nombre, email, tel, comen } = parsed.data;

    // Log the contact form submission
    console.log('=== NUEVO MENSAJE DE CONTACTO ===');
    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Teléfono:', tel);
    console.log('Mensaje:', comen);
    console.log('Fecha:', new Date().toISOString());
    console.log('================================');

    // Send email with Resend
    const { error } = await resend.emails.send({
      from: 'Desechables La Estrella <onboarding@resend.dev>',
      to: 'oscarone2002@gmail.com',
      subject: 'DESECHABLES LA ESTRELLA - Nuevo mensaje de contacto',
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${tel}</p>
        <p><strong>Mensaje:</strong><br/>${comen}</p>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json(
        { error: 'Error enviando el correo' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Mensaje enviado exitosamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
