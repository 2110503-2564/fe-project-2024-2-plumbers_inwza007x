import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import userLogin from "@/libs/userLogIn";
import getUserProfile from "@/libs/getUserProfile";


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

                const user = await userLogin(credentials.email, credentials.password);
                
                if (user && user.token) {
                    const userProfile = await getUserProfile(user.token);

                    if (userProfile && userProfile.success) {
                        const { userID, name, email, phone, role } = userProfile.data;

                        return { id: userID, name, email, phone, role, token: user.token };
                    }
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
                token.phone = user.phone;
                token.role = user.role;
                token.token = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id as number,
                    name: token.name as string,
                    email: token.email as string,
                    phone: token.phone as string,
                    role: token.role as string,
                    token: token.token as string
                };
            }
            return session;
        }
    }
};
