import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  const session = request.cookies.get('mock_session');
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboard && !session) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Redirect to dashboard if logged in and on home page
  if (request.nextUrl.pathname === '/' && session) {
    return NextResponse.redirect(new URL('/dashboard/assistant', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
