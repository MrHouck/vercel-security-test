import { NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/login', '/api/auth']

export function proxy(request) {
  const { pathname } = request.nextUrl

  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  const auth = request.cookies.get('auth')?.value
  const secret = process.env.AUTH_SECRET

  // Explicitly guard against both being undefined
  if (secret && auth === secret) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}