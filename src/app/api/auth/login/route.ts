import { NextResponse } from 'next/server';
import { createSession } from '@/lib/session';
import { LoginSchema } from '@/lib/validations';

const rateLimitMap = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
    const now = Date.now();
    
    // Simple Rate Limiting logic
    if (rateLimitMap.has(ip)) {
      const rateData = rateLimitMap.get(ip)!;
      if (now - rateData.lastAttempt > WINDOW_MS) {
        rateLimitMap.set(ip, { count: 1, lastAttempt: now });
      } else {
        if (rateData.count >= MAX_ATTEMPTS) {
          return NextResponse.json(
            { error: 'Demasiados intentos. Inténtalo de nuevo en 15 minutos.' }, 
            { status: 429 }
          );
        }
        rateData.count++;
        rateData.lastAttempt = now;
      }
    } else {
      rateLimitMap.set(ip, { count: 1, lastAttempt: now });
    }

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
