import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  // Límite: 3 solicitudes cada 10 minutos (600000 ms)
  if (!rateLimit(ip, 3, 600000)) {
    return NextResponse.json({ error: 'Demasiadas solicitudes. Intenta más tarde.' }, { status: 429 });
  }

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

    // Function to escape HTML
    const escapeHTML = (str: string) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    // Send email with Resend
    const { error } = await resend.emails.send({
      from: 'Desechables La Estrella <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'oscarone2002@gmail.com', // ⚠️ Fallback, idealmente usar solo env
      subject: 'DESECHABLES LA ESTRELLA - Nuevo mensaje de contacto',
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${escapeHTML(nombre)}</p>
        <p><strong>Email:</strong> ${escapeHTML(email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHTML(tel)}</p>
        <p><strong>Mensaje:</strong><br/>${escapeHTML(comen).replace(/\n/g, '<br/>')}</p>
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
