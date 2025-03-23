import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogIn";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials) return null;
                const user = await userLogIn(credentials.email, credentials.password);

                if (user) {
                    return {
                        id: user.user.id,
                        name: user.user.name,
                        email: user.user.email,
                        role: user.user.role,
                        token: user.token,
                        phone: user.user.phone
                    };
                } else {
                    return null;
                }
            }
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
                token.token = user.token;
                if (user.phone) {
                    token.phone = user.phone;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id as number,
                    name: token.name as string,
                    email: token.email as string,
                    role: token.role as string,
                    token: token.token as string,
                    phone: token.phone as string
                };
            }
            return session;
        }
    }
};
