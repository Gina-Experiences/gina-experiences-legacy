'use server';

import { prisma } from './prisma';

export async function getAnalytics() {
    try {
        // Step 1: Aggregate Total LTV
        const totalLTVResult = await prisma.user.aggregate({
            _sum: {
                ltv: true,
            },
        });
        const totalLTV = totalLTVResult._sum.ltv || 0;

        // Step 2: Aggregate Total Items Sold across all categories
        const productSales = await prisma.product.findMany({
            select: {
                Packages: { select: { number_of_sold_items: true } },
                Activities: { select: { number_of_sold_items: true } },
                Events: { select: { number_of_sold_items: true } },
                Hotels: { select: { number_of_sold_items: true } },
                Transportation: { select: { number_of_sold_items: true } },
            },
        });

        const totalSold = productSales.reduce((sum, product) => {
            return (
                sum +
                (product.Packages?.number_of_sold_items || 0) +
                (product.Activities?.number_of_sold_items || 0) +
                (product.Events?.number_of_sold_items || 0) +
                (product.Hotels?.number_of_sold_items || 0) +
                (product.Transportation?.number_of_sold_items || 0)
            );
        }, 0);

        // Step 3: Count total users
        const totalUsers = await prisma.user.count();

        // Step 4: Count total users who signed up this month
        const firstDayOfMonth = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
        );
        const totalUsersSignUpThisMonth = await prisma.user.count({
            where: {
                registration_date: {
                    gte: firstDayOfMonth,
                },
            },
        });

        // Step 5: Aggregate total sales per month
        const totalSalesPerMonth = await prisma.transactions.groupBy({
            by: ['start_date'],
            _sum: {
                total_Amount: true,
            },
            where: {
                transaction_status: 'completed',
            },
        });

        // Step 6: Count completed and failed bookings
        const completedBookings = await prisma.transactions.count({
            where: {
                transaction_status: 'completed',
            },
        });

        const failedBookings = await prisma.transactions.count({
            where: {
                transaction_status: 'failed',
            },
        });

        // Step 7: Count total bookings
        const totalBookings = await prisma.transactions.count();

        // Step 8: Count total bookings per month
        const totalBookingsPerMonth = await prisma.transactions.groupBy({
            by: ['start_date'],
            _count: {
                transaction_id: true,
            },
        });

        return {
            totalLTV,
            totalSold,
            totalUsers,
            totalUsersSignUpThisMonth,
            totalSalesPerMonth,
            completedBookings,
            failedBookings,
            totalBookings,
            totalBookingsPerMonth,
        };
    } catch (error: unknown) {
        return {
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}
