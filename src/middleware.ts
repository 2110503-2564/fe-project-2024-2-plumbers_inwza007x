import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: any) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const { pathname } = req.nextUrl;

    if (!token) {
        return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }

    const adminRoutes = ["/admin/bookings"];

    if (adminRoutes.some((route) => pathname.startsWith(route))) {
        if (token.role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    // matcher: ["/mybooking", "/booking", "/dentists", "/admin/:path*"]
    matcher: []
};
