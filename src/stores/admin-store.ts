import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { localStorageWrapper } from '@/stores';
import { getAnalytics } from '@/lib/admin';

interface AnalyticsStore {
    data: {
        totalLTV: number;
        totalSold: number;
        totalUsers: number;
        totalUsersSignUpThisMonth: number;
        totalSalesPerMonth: any[];
        completedBookings: number;
        failedBookings: number;
        totalBookings: number;
        totalBookingsPerMonth: any[];
    } | null;
    isLoading: boolean;
    error: string | null;
    fetchAnalytics: () => Promise<void>;
    clearCache: () => void;
}

const adminStore = create<AnalyticsStore>()(
    persist(
        (set) => ({
            data: null,
            isLoading: false,
            error: null,

            fetchAnalytics: async () => {
                set({ isLoading: true, error: null });
                try {
                    const response = await getAnalytics();

                    if ('error' in response) {
                        throw new Error(response.error);
                    }

                    set({
                        data: response,
                        isLoading: false,
                        error: null,
                    });
                } catch (error) {
                    console.error('[Zustand] Error fetching analytics:', error);
                    set({
                        data: null,
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
                    data: null,
                    isLoading: false,
                    error: null,
                });
            },
        }),
        {
            name: 'analytics-storage',
            storage: localStorageWrapper,
            version: 1,
            onRehydrateStorage: () => (state) => {
                console.log('Analytics store rehydrated:', state);
            },
        }
    )
);

export default adminStore;
