import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: any) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // ถ้าไม่มี token (ไม่ได้ login)
    if (!token) {
        return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }

    // ตรวจสอบ role สำหรับหน้า /mybooking, /dentists
    if (req.nextUrl.pathname === "/mybooking" ) {
        if (token.role !== "admin") {
            // หากไม่ใช่ admin ให้ redirect ไปยังหน้า unauthorized
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
    }
    // หากเป็น admin ให้เข้าได้
    return NextResponse.next();
}

export const config = {
    matcher: ["/mybooking", "/booking", "/dentists"], // กำหนดให้ middleware ทำงานเฉพาะบน /mybooking, /booking, /dentists
};
