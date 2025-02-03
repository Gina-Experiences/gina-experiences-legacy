import { prisma } from './prisma';

// POST: Create transaction
export async function createTransaction(data: {
    userId: string;
    product_id: string;
    transaction_date: Date;
    total_Amount: number;
    payment_status: 'paid' | 'pending' | 'failed';
    transaction_status: 'completed' | 'failed' | 'pending';
}) {
    try {
        const newTransaction = await prisma.transactions.create({ data });
        return { newTransaction };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// GET: Get all transactions
export async function getAllTransactions() {
    try {
        const transactions = await prisma.transactions.findMany({
            include: {
                User: true,
                Product: true,
            },
        });
        return { transactions };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// GET: Get specific transaction
export async function getTransaction(transactionId: string) {
    try {
        const transaction = await prisma.transactions.findUnique({
            where: { transaction_id: transactionId },
            include: {
                User: true,
                Product: true,
            },
        });

        if (!transaction) return { error: 'Transaction not found' };
        return { transaction };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// UPDATE: Update transaction
export async function updateTransaction(
    transactionId: string,
    data: Partial<{
        transaction_date: Date;
        total_Amount: number;
        payment_status: 'paid' | 'pending' | 'failed';
        transaction_status: 'completed' | 'failed' | 'pending';
    }>
) {
    try {
        const updatedTransaction = await prisma.transactions.update({
            where: { transaction_id: transactionId },
            data,
        });

        return { updatedTransaction };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// DELETE: Delete transaction
export async function deleteTransaction(transactionId: string) {
    try {
        await prisma.transactions.delete({
            where: { transaction_id: transactionId },
        });

        return { message: 'Transaction deleted successfully' };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}
