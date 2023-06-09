import { NextRequest, NextResponse } from 'next/server'
import { ORIGIN_URL_KEY } from './shared/settings'

export function middleware(request: NextRequest) {
  // add origin path to redirect when session's not available
  const headers = new Headers(request.headers)
  headers.set(ORIGIN_URL_KEY, request.nextUrl.pathname)

  return NextResponse.next({
    request: { headers },
  })
}

export const config = {
  matcher: ['/app/:path*', '/admin/:path*'],
}
