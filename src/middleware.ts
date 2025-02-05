import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const protectedAdminRoutes = [
        '/dashboard',
        '/transactions',
        '/users-analytics',
        '/sales-transactions',
        '/product-analysis',
        '/financial-overview',
    ];

    const protectedUserRoutes = ['/profile', '/favorites', '/bookings'];

    const { pathname } = req.nextUrl;

    if (!token) {
        if (
            protectedAdminRoutes.some((route) => pathname.startsWith(route)) ||
            protectedUserRoutes.some((route) => pathname.startsWith(route))
        ) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    if (token && token.role !== 'admin') {
        if (protectedAdminRoutes.some((route) => pathname.startsWith(route))) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/transactions/:path*',
        '/users-analytics/:path*',
        '/sales-transactions/:path*',
        '/product-analysis/:path*',
        '/profile/:path*',
        '/bookings/:path*',
    ],
};
