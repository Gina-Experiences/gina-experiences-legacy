import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { localStorageWrapper } from '@/stores';
import { getAnalytics } from '@/lib/admin';

interface AnalyticsStore {
    totalLTV: number;
    totalSold: number;
    totalUsers: number;
    totalUsersSignUpThisMonth: number;
    totalSalesPerMonth: any[];
    completedBookings: number;
    failedBookings: number;
    totalBookings: number;
    totalBookingsPerMonth: any[];
    isLoading: boolean;
    error: string | null;

    fetchAnalytics: () => Promise<void>;
    clearCache: () => void;
}

const adminStore = create<AnalyticsStore>()(
    persist(
        (set) => ({
            totalLTV: 0,
            totalSold: 0,
            totalUsers: 0,
            totalUsersSignUpThisMonth: 0,
            totalSalesPerMonth: [],
            completedBookings: 0,
            failedBookings: 0,
            totalBookings: 0,
            totalBookingsPerMonth: [],
            isLoading: false,
            error: null,

            fetchAnalytics: async () => {
                set({ isLoading: true, error: null });
                try {
                    const analyticsData = await getAnalytics();
                    console.log('[Zustand] Analytics fetched:', analyticsData);
                    set({
                        totalLTV: analyticsData.totalLTV,
                        totalSold: analyticsData.totalSold,
                        totalUsers: analyticsData.totalUsers,
                        totalUsersSignUpThisMonth:
                            analyticsData.totalUsersSignUpThisMonth,
                        totalSalesPerMonth: analyticsData.totalSalesPerMonth,
                        completedBookings: analyticsData.completedBookings,
                        failedBookings: analyticsData.failedBookings,
                        totalBookings: analyticsData.totalBookings,
                        totalBookingsPerMonth:
                            analyticsData.totalBookingsPerMonth,
                        isLoading: false,
                    });
                } catch (error) {
                    console.error('[Zustand] Error fetching analytics:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch analytics!',
                        isLoading: false,
                    });
                }
            },

            clearCache: () => {
                localStorageWrapper.removeItem('analytics-storage');
                set({
                    totalLTV: 0,
                    totalSold: 0,
                    totalUsers: 0,
                    totalUsersSignUpThisMonth: 0,
                    totalSalesPerMonth: [],
                    completedBookings: 0,
                    failedBookings: 0,
                    totalBookings: 0,
                    totalBookingsPerMonth: [],
                });
            },
        }),
        {
            name: 'analytics-storage',
            storage: localStorageWrapper,
        }
    )
);

export default adminStore;
