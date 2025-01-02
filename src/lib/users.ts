import { prisma } from './prisma';
import { Role } from '@prisma/client';

// Fetch user by ID
export async function getUserById(userId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
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
                Customers: true,
                Admin: true,
            },
        });

        if (!user) return { error: 'User not found' };

        return { user };
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
        const {
            email,
            role,
            firstname,
            lastname,
            gender,
            birthdate,
            phone,
            address,
            image,
        } = data;

        // Check for unique constraints on email and phone
        if (email && (await prisma.user.findUnique({ where: { email } }))) {
            return { error: 'Email already in use' };
        }
        if (phone && (await prisma.user.findUnique({ where: { phone } }))) {
            return { error: 'Phone number already in use' };
        }

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                role,
                firstname,
                lastname,
                gender,
                birthdate,
                phone,
                address,
                image,
                registration_date: new Date(),
                is_active: true,
                last_active_date: new Date(),
            },
        });

        // Handle role-specific logic
        if (role === 'customer') {
            await prisma.customers.create({
                data: {
                    userId: user.id,
                    ltv: 0, // Lifetime value starts at 0
                },
            });
        } else if (role === 'admin') {
            await prisma.admin.create({
                data: {
                    userId: user.id,
                },
            });
        }

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

// Get all active users
export async function getAllActiveUsers() {
    try {
        const users = await prisma.user.findMany({
            where: { is_active: true },
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
        // Validate unique phone
        if (
            data.phone &&
            (await prisma.user.findUnique({ where: { phone: data.phone } }))
        ) {
            return { error: 'Phone number already in use' };
        }

        // Validate birthdate is in the past
        if (data.birthdate && data.birthdate >= new Date()) {
            return { error: 'Birthdate must be a past date' };
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data,
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
        const customer = await prisma.customers.findUnique({
            where: { userId },
            include: {
                Transactions: {
                    include: {
                        Product: true,
                    },
                },
            },
        });

        if (!customer) return { error: 'Customer not found' };

        return { transactions: customer.Transactions };
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}
