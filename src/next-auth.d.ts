import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        userID: string;
        name: string;
        email: string;
        role: string;
        token: string;
        phone?: string;
    }

    interface Session {
        user: User;
    }
}