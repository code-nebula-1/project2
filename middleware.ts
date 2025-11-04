import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/session';

// Define protected routes
const protectedRoutes = ['/admin'];
const publicRoutes = ['/admin/login'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check if the path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    path === route || path.startsWith(route + '/')
  );
  
  // Check if the path is a public route
  const isPublicRoute = publicRoutes.some(route => path === route);

  // Get session from cookie
  const cookie = request.cookies.get('session')?.value;
  const session = await decrypt(cookie);

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session?.userId && !isPublicRoute) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Redirect to admin if accessing login with valid session
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};

