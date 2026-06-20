import { NextResponse } from 'next/server';

export function middleware(request) {
  // Proteger la ruta /admin y todos sus subdirectorios
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Comprobar si existe la cookie de autenticación
    const authCookie = request.cookies.get('admin_auth');

    if (!authCookie || authCookie.value !== 'true') {
      // Si no está autenticado, redirigir al login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
