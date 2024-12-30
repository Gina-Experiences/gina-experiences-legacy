import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET as string;
const TOKEN_EXPIRATION = '1h'; // Token expiration (1 hour)

// POST: Login
export async function login(email: string, password: string) {
    console.log(JWT_SECRET);
    try {
        const account = await prisma.accounts.findUnique({
            where: { email },
        });

        if (!account || !(await bcrypt.compare(password, account.password))) {
            return { error: 'Invalid email or password' };
        }

        if (!account.is_active) {
            return { error: 'Account is deactivated' };
        }

        // Create JWT token
        const token = jwt.sign(
            {
                user_id: account.account_id,
                role: account.role,
            },
            JWT_SECRET,
            { expiresIn: TOKEN_EXPIRATION }
        );

        // Set token as an HTTP-only cookie using Next.js cookies API
        const cookieStore = await cookies();
        cookieStore.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 3600, // 1 hour
        });

        // Update last_active_date
        await prisma.accounts.update({
            where: { account_id: account.account_id },
            data: { last_active_date: new Date() },
        });

        return { success: true, message: 'Login successful' };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// GET: Get specific account (validate token)
export async function getAccount(token: string) {
    try {
        if (!token) {
            return { error: 'No token provided' };
        }

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return { error: 'Invalid or expired token' };
        }

        const { user_id } = decoded as { user_id: string };

        const account = await prisma.accounts.findUnique({
            where: { account_id: user_id },
            select: {
                account_id: true,
                email: true,
                firstname: true,
                lastname: true,
                role: true,
                gender: true,
                birthdate: true,
                phone: true,
                address: true,
                registration_date: true,
                last_active_date: true,
                imagelink: true,
            },
        });

        if (!account) {
            return { error: 'Account not found' };
        }

        return { account };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// POST: Create account/sign up
export async function createAccount(data: {
    email: string;
    password: string;
    role: Role;
    firstname: string;
    lastname: string;
    gender: string;
    birthdate: Date;
    phone: string;
    address: string;
    imagelink: string; // Now required
}) {
    try {
        const {
            email,
            password,
            role,
            firstname,
            lastname,
            gender,
            birthdate,
            phone,
            address,
            imagelink,
        } = data;

        if (await prisma.accounts.findUnique({ where: { email } })) {
            return { error: 'Email already in use' };
        }
        if (await prisma.accounts.findUnique({ where: { phone } })) {
            return { error: 'Phone number already in use' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const account = await prisma.accounts.create({
            data: {
                email,
                password: hashedPassword,
                role,
                firstname,
                lastname,
                gender,
                birthdate,
                phone,
                address,
                imagelink,
                last_active_date: new Date(),
            },
        });

        if (role === 'customer') {
            await prisma.customers.create({
                data: {
                    account_id: account.account_id,
                    ltv: 0,
                },
            });
        } else if (role === 'admin') {
            await prisma.admin.create({
                data: {
                    account_id: account.account_id,
                },
            });
        }

        return { account };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// GET: Get all accounts
export async function getAllAccounts() {
    try {
        const accounts = await prisma.accounts.findMany({
            where: { is_active: true },
            select: {
                account_id: true,
                email: true,
                firstname: true,
                lastname: true,
                gender: true,
                birthdate: true,
                phone: true,
                address: true,
                registration_date: true,
                last_active_date: true,
                imagelink: true,
                Customers: true,
                Admin: true,
            },
        });

        return { accounts };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// UPDATE: Update account details
export async function updateAccount(
    accountId: string,
    data: {
        firstname?: string;
        lastname?: string;
        gender?: string;
        birthdate?: Date;
        phone?: string;
        address?: string;
        imagelink?: string;
    }
) {
    try {
        if (
            data.phone &&
            (await prisma.accounts.findUnique({ where: { phone: data.phone } }))
        ) {
            return { error: 'Phone number already in use' };
        }
        if (data.birthdate && data.birthdate >= new Date()) {
            return { error: 'Birthdate must be a past date' };
        }

        const updatedAccount = await prisma.accounts.update({
            where: { account_id: accountId },
            data,
        });

        return { updatedAccount };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// DELETE: Soft delete account
export async function deleteAccount(accountId: string) {
    try {
        const account = await prisma.accounts.update({
            where: { account_id: accountId },
            data: { is_active: false },
        });

        return { message: 'Account deactivated successfully', account };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}
