import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(request) {
  try {
    const body = await request.json();
    const { nombre, email, tel, comen } = body;

    // Validate required fields
    if (!nombre || !email || !tel || !comen) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { error: 'Dirección de correo inválida' },
        { status: 400 }
      );
    }

    // Log the contact form submission
    // In production, integrate with an email service (Resend, SendGrid, etc.)
    console.log('=== NUEVO MENSAJE DE CONTACTO ===');
    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Teléfono:', tel);
    console.log('Mensaje:', comen);
    console.log('Fecha:', new Date().toISOString());
    console.log('================================');

    // E-commerce - Sending email with Resend
    const { data, error } = await resend.emails.send({
      from: 'Desechables La Estrella <onboarding@resend.dev>', // Testing address until a custom domain is verified in Resend
      to: 'oscarone2002@gmail.com', // MUST be the registered Resend email while using the testing domain
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
