import { DollarSign, Package, Users, UserPlus } from 'lucide-react'

interface AnalyticsOverviewProps {
    totalLTV: number;
    totalSold: number;
    totalUsers: number;
    newUsersThisMonth: number;
}

export function AnalyticsOverview({ totalLTV, totalSold, totalUsers, newUsersThisMonth }: AnalyticsOverviewProps) {
    const formatNumber = (num: number) => num.toLocaleString();

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500">Total LTV</h3>
                    <DollarSign className="h-4 w-4 text-gray-400" />
                </div>
                <p className="mt-2 text-3xl font-semibold text-gray-900">${formatNumber(totalLTV)}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500">Total Items Sold</h3>
                    <Package className="h-4 w-4 text-gray-400" />
                </div>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{formatNumber(totalSold)}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                    <Users className="h-4 w-4 text-gray-400" />
                </div>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{formatNumber(totalUsers)}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500">New Users This Month</h3>
                    <UserPlus className="h-4 w-4 text-gray-400" />
                </div>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{formatNumber(newUsersThisMonth)}</p>
            </div>
        </div>
    )
}
