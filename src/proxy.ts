import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export async function proxy(request: NextRequest) {
    const protectedRoutes = ['/checkout', '/profile', '/orders']
    const authprotected = ['/login', '/register']
    const myPath = request.nextUrl.pathname
    
    const myToken = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === 'production'
    })
    const token = myToken?.token || null;
    
    if (protectedRoutes.includes(myPath)) {
        if (!token && protectedRoutes.some(route => myPath.startsWith(route))) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    if (authprotected.includes(myPath)) {
        if (token && authprotected.some(route => myPath.startsWith(route))) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
    return NextResponse.next()
}

export const config = {
  matcher: [
    '/checkout/:path*',
    '/profile/:path*',
    '/orders/:path*',
  ]
}
 