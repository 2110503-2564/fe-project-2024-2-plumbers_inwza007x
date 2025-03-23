import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: number;
        name: string;
        email: string;
        phone: string;
        role: string;
        token: string;
    }

    interface Session {
        user: User;
    }
}