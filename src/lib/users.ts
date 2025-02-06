'use server';

import { prisma } from './prisma';
import { Role } from '@prisma/client';

// Fetch user by ID and update last_active_date
export async function getUserById(userId: string) {
    try {
        const now = new Date();

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { last_active_date: now },
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
                gender: true,
                birthdate: true,
                phone: true,
                address: true,
                registration_date: true,
                last_active_date: true,
                image: true,
                is_active: true,
                role: true,
                ltv: true,
                is_complete_information: true,
            },
        });

        return { user: updatedUser };
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

// Create a new user
export async function createUser(data: {
    email?: string;
    role: Role;
    firstname?: string;
    lastname?: string;
    gender?: string;
    birthdate?: Date;
    phone?: string;
    address?: string;
    image?: string;
}) {
    try {
        if (
            data.email &&
            (await prisma.user.findUnique({ where: { email: data.email } }))
        ) {
            return { error: 'Email already in use' };
        }

        if (
            data.phone &&
            (await prisma.user.findUnique({ where: { phone: data.phone } }))
        ) {
            return { error: 'Phone number already in use' };
        }

        const isComplete =
            data.firstname &&
            data.lastname &&
            data.gender &&
            data.birthdate &&
            data.phone &&
            data.address;

        const user = await prisma.user.create({
            data: {
                ...data,
                registration_date: new Date(),
                is_active: true,
                last_active_date: new Date(),
                ltv: 0.0,
                is_complete_information: Boolean(isComplete),
            },
        });

        return { user };
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

// Deactivate a user
export async function deactivateUser(userId: string) {
    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { is_active: false },
        });

        return { message: 'User deactivated successfully', user };
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

// Reactivate a user
export async function reactivateUser(userId: string) {
    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { is_active: true },
        });

        return { message: 'User reactivated successfully', user };
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

// Get all active users
export async function getAllUsers() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
                gender: true,
                birthdate: true,
                phone: true,
                address: true,
                registration_date: true,
                last_active_date: true,
                image: true,
                role: true,
                ltv: true,
                is_complete_information: true,
                is_active: true,
            },
        });

        return { users };
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

// Update user details
export async function updateUser(
    userId: string,
    data: {
        firstname?: string;
        lastname?: string;
        gender?: string;
        birthdate?: Date;
        phone?: string;
        address?: string;
        image?: string;
    }
) {
    try {
        const currentUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { phone: true },
        });

        if (data.phone && currentUser?.phone !== data.phone) {
            const existingPhone = await prisma.user.findUnique({
                where: { phone: data.phone },
            });
            if (existingPhone) {
                return { error: 'Phone number already in use' };
            }
        }

        if (data.birthdate && data.birthdate >= new Date()) {
            return { error: 'Birthdate must be a past date' };
        }

        const isComplete =
            data.firstname &&
            data.lastname &&
            data.gender &&
            data.birthdate &&
            data.phone &&
            data.address;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                ...data,
                is_complete_information: Boolean(isComplete),
            },
        });

        return { updatedUser };
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

// Fetch user transactions
export async function getUserTransactions(userId: string) {
    try {
        const transactions = await prisma.transactions.findMany({
            where: { userId },
            include: {
                Product: true,
            },
        });

        return { transactions };
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

// Change user role
export async function changeUserRole(userId: string, newRole: Role) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });

        if (!user) {
            return { error: 'User not found' };
        }

        if (user.role === newRole) {
            return { error: `User already has the role '${newRole}'` };
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { role: newRole },
        });

        return {
            message: `User role updated to '${newRole}' successfully`,
            user: updatedUser,
        };
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

// Get all favorites for a user
export async function getUserFavorites(userId: string) {
    try {
        const favorites = await prisma.favorites.findMany({
            where: { userId },
            include: {
                Product: true,
            },
        });

        return { favorites };
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}
