import { NextResponse } from 'next/server';

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

    // TODO: E-commerce - Add email sending service here
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contacto@desechableslaestrella.com',
    //   to: 'desechables_laestrella@hotmail.com',
    //   subject: 'DESECHABLES LA ESTRELLA - Nuevo mensaje de contacto',
    //   html: `<p>Nombre: ${nombre}</p><p>Email: ${email}</p><p>Tel: ${tel}</p><p>Mensaje: ${comen}</p>`,
    // });

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
