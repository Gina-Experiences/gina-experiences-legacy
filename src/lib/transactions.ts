import { prisma } from './prisma';
import { PaymentStatus, TransactionStatus } from '@prisma/client';

// POST: Create transaction
export async function createTransaction(data: {
    userId: string;
    product_id: string;
    start_date: Date;
    end_date: Date;
    time: Date;
    number_of_participants: number;
    total_Amount: number;
    payment_status: PaymentStatus;
    transaction_status: TransactionStatus;
}) {
    try {
        const newTransaction = await prisma.transactions.create({
            data: {
                ...data,
                User: {
                    connect: { id: data.userId },
                },
                Product: {
                    connect: { product_id: data.product_id },
                },
            },
        });
        return { newTransaction };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// GET: Retrieve all transactions
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
        return handleError(error);
    }
}

// GET: Retrieve a specific transaction by its ID
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
        return handleError(error);
    }
}

// UPDATE: Update transaction details
export async function updateTransaction(
    transactionId: string,
    data: Partial<{
        start_date: Date;
        end_date: Date;
        time: Date;
        number_of_participants: number;
        total_Amount: number;
        payment_status: PaymentStatus;
        transaction_status: TransactionStatus;
    }>
) {
    try {
        const updatedTransaction = await prisma.transactions.update({
            where: { transaction_id: transactionId },
            data,
        });

        return { updatedTransaction };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// DELETE: Delete a transaction
export async function deleteTransaction(transactionId: string) {
    try {
        await prisma.transactions.delete({
            where: { transaction_id: transactionId },
        });

        return { message: 'Transaction deleted successfully' };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// Common error handler
function handleError(error: unknown) {
    if (error instanceof Error) {
        return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
}
