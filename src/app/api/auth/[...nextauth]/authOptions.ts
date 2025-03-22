import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    return null;
                }

                if (credentials.email === "ILoveKaru3000ButAdmin@gmail.com" && credentials.password === "1212312121") {
                    return {
                        id: 1,
                        name: "Karu zaza123",
                        email: "ILoveKaru3000@gmail.com",
                        role: "admin",
                        token: "someGeneratedToken",
                        phone: "123-456-7890"
                    };
                }

                if (credentials.email === "ILoveKaru3000@gmail.com" && credentials.password === "1212312121") {
                    return {
                        id: 2,
                        name: "Karu zaza123",
                        email: "ILoveKaru3000@gmail.com",
                        role: "user",
                        token: "someGeneratedToken",
                        phone: "123-456-7890"
                    };
                }

                return null;
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
