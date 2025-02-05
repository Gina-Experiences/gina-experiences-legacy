import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.JWT_SECRET,
    session: {
        strategy: 'jwt', // Use JWT for session management
        maxAge: 24 * 60 * 60, // Session duration (1 day)
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        maxAge: 60 * 60 * 24 * 30, // JWT duration (30 days)
    },
    debug: true,
    callbacks: {
        // Customize the JWT token to include additional fields
        async jwt({ token, user }) {
            console.log('User:', user);
            console.log('Token before:', token);
            if (user) {
                if (user.is_active === false) {
                    throw new Error('User is deactivated!');
                }
                token.id = user.id;
                token.email = user.email;
                token.firstname = user.firstname ?? null;
                token.lastname = user.lastname ?? null;
                token.role = user.role ?? 'customer'; // Default role
                token.is_complete_information =
                user.is_complete_information ?? false;
            }
            console.log('Token after:', token);
            return token;
        },
        // Include additional fields in the session object
        async session({ session, token }) {
            console.log('Session before:', session);
            if (token) {
                session.user = {
                    id: token.id,
                    image: token.picture ?? null,
                    email: token.email,
                    firstname: token.firstname ?? null,
                    lastname: token.lastname ?? null,
                    role: token.role ?? 'customer',
                    is_complete_information: token.is_complete_information ?? false,
                    is_active: token.is_active ?? true
                };
            }
            console.log('Session after:', session);
            return session;
        },
    },
};
