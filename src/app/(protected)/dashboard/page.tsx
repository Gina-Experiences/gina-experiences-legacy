import { getAnalytics } from '@/lib/admin';
import { DashboardHero } from '@/components/dashboard';
import { AnalyticsOverview } from '@/components/analytics/overview';
import { MonthlyStats } from '@/components/analytics/monthly-stats';
import { BookingStats } from '@/components/analytics/booking-stats';


export default async function Dashboard() {
    const analyticsData = await getAnalytics();

    if ('error' in analyticsData) {
        return <div className="text-red-500 text-center mt-8">Error: {analyticsData.error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
            </div>
            <div className="grid gap-6 mt-8">
                <AnalyticsOverview 
                    totalLTV={analyticsData.totalLTV}
                    totalSold={analyticsData.totalSold}
                    totalUsers={analyticsData.totalUsers}
                    newUsersThisMonth={analyticsData.totalUsersSignUpThisMonth}
                />
                {/* <div className="grid md:grid-cols-2 gap-6">
                    <MonthlyStats 
                        salesData={analyticsData.totalSalesPerMonth}
                        bookingsData={analyticsData.totalBookingsPerMonth}
                    />
                    <BookingStats 
                        completedBookings={analyticsData.completedBookings}
                        failedBookings={analyticsData.failedBookings}
                        totalBookings={analyticsData.totalBookings}
                    />
                </div> */}
            </div>
        </div>
    );
}
