import { authProxy } from './auth/proxy'

export const proxy = authProxy

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}