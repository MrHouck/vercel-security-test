import { NextResponse } from 'next/server'
import config from './config'

const ALWAYS_PUBLIC = [config.loginPath, '/api/auth', '/api/logout']

export function authProxy(request) {
  const { pathname } = request.nextUrl

  const isPublic =
    [...ALWAYS_PUBLIC, ...config.publicPaths].some(p =>
      pathname.startsWith(p)
    )

  if (isPublic) return NextResponse.next()

  const auth = request.cookies.get(config.cookieName)?.value
  const secret = process.env.AUTH_SECRET

  if (secret && auth === secret) return NextResponse.next()

  return NextResponse.redirect(new URL(config.loginPath, request.url))
}