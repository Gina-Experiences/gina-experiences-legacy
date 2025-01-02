import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface User {
        id: string;
        email: string;
        firstname: string;
        lastname: string;
        role: string;
        is_complete_information: boolean;
    }

    interface Session {
        user: User;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        email: string;
        firstname: string;
        lastname: string;
        role: string;
        is_complete_information: boolean;
    }
}
