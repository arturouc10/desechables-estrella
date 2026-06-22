import { NextResponse } from 'next/server';
import { createSession } from '@/lib/session';
import { LoginSchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input with Zod
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Contraseña requerida' },
        { status: 400 }
      );
    }

    const { password } = parsed.data;

    // Compare against the env variable (not hardcoded!)
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }

    // Create a secure JWT session
    await createSession();

    return NextResponse.json({ message: 'Login exitoso' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
