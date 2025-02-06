'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface SalesData {
    start_date: Date;
    _sum: { total_Amount: number };
}

interface BookingsData {
    start_date: Date;
    _count: { transaction_id: number };
}

interface MonthlyStatsProps {
    salesData: SalesData[];
    bookingsData: BookingsData[];
}

export function MonthlyStats({ salesData, bookingsData }: MonthlyStatsProps) {
    const formattedSalesData = salesData.map(item => ({
        date: new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        amount: item._sum.total_Amount
    }));

    const formattedBookingsData = bookingsData.map(item => ({
        date: new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        count: item._count.transaction_id
    }));

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Monthly Overview</h2>
            <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formattedSalesData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="amount" stroke="#8884d8" name="Sales" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="h-[200px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formattedBookingsData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#82ca9d" name="Bookings" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
