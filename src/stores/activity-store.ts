import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    getAllActivities,
    getActivity,
    createActivity,
    updateActivity,
    deleteActivity,
    recoverActivity,
} from '@/lib/activities';
import { localStorageWrapper } from '@/stores';

interface ActivityStore {
    activities: any[] | null;
    selectedActivity: any | null;
    isLoading: boolean;
    error: string | null;

    fetchAllActivities: () => Promise<void>;
    fetchActivity: (activityId: string) => Promise<void>;
    addActivity: (
        productId: string,
        activityName: string,
        highlights: string,
        whatToExpect: string,
        bestTimeToVisit: string,
        durationNumber: number,
        durationUnit: 'H' | 'D',
        faqs: string,
        activityPrice: number,
        image_link: string
    ) => Promise<void>;
    updateActivity: (
        activityId: string,
        data: {
            product_id?: string;
            activity_name?: string;
            highlights?: string;
            what_to_expect?: string;
            best_time_to_visit?: string;
            duration_number?: number;
            duration_unit?: 'H' | 'D';
            faqs?: string;
            activity_price?: number;
            image_link?: string;
            is_active?: boolean;
        }
    ) => Promise<void>;
    removeActivity: (activityId: string) => Promise<void>;
    recoverActivity: (activityId: string) => Promise<void>;
    clearCache: () => void;
}

interface ActivityUpdateData {
    product_id?: string;
    activity_name?: string;
    highlights?: string;
    what_to_expect?: string;
    best_time_to_visit?: string;
    duration_number?: number;
    duration_unit?: 'H' | 'D';
    faqs?: string;
    activity_price?: number;
    image_link?: string;
    is_active?: boolean;
}

const activityStore = create<ActivityStore>()(
    persist(
        (set) => ({
            activities: null,
            selectedActivity: null,
            isLoading: false,
            error: null,

            // Fetch all active activities
            fetchAllActivities: async () => {
                set({ isLoading: true, error: null });
                try {
                    const { activities } = await getAllActivities();
                    console.log('[Zustand] Activities fetched:', activities);
                    set({ activities, isLoading: false });
                } catch (error) {
                    console.error(
                        '[Zustand] Error fetching activities:',
                        error
                    );
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch activities!',
                        isLoading: false,
                    });
                }
            },

            // Fetch a specific activity
            fetchActivity: async (activityId: string) => {
                set({ isLoading: true, error: null });
                try {
                    const { activity } = await getActivity(activityId);
                    console.log('[Zustand] Activity fetched:', activity);
                    set({ selectedActivity: activity, isLoading: false });
                } catch (error) {
                    console.error('[Zustand] Error fetching activity:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch activity!',
                        isLoading: false,
                    });
                }
            },

            // Create a new activity
            addActivity: async (
                productId: string,
                activityName: string,
                highlights: string,
                whatToExpect: string,
                bestTimeToVisit: string,
                durationNumber: number,
                durationUnit: 'H' | 'D',
                faqs: string,
                activityPrice: number,
                image_link: string
            ) => {
                set({ isLoading: true, error: null });
                try {
                    const { newActivity } = await createActivity({
                        product_id: productId,
                        activity_name: activityName,
                        highlights: highlights,
                        what_to_expect: whatToExpect,
                        best_time_to_visit: bestTimeToVisit,
                        duration_number: durationNumber,
                        duration_unit: durationUnit,
                        faqs: faqs,
                        activity_price: activityPrice,
                        image_link: image_link,
                    });

                    console.log('[Zustand] Activity created:', newActivity);

                    set((state) => ({
                        activities: [...(state.activities || []), newActivity],
                        isLoading: false,
                    }));
                } catch (error) {
                    console.error('[Zustand] Error creating activity:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to create activity!',
                        isLoading: false,
                    });
                    throw error;
                }
            },

            // Update activity details
            updateActivity: async (activityId, data) => {
                set({ isLoading: true, error: null });
                try {
                    const { updatedActivity } = await updateActivity(
                        activityId,
                        data
                    );
                    if (!updatedActivity) {
                        throw new Error(
                            'Activity update failed on the server.'
                        );
                    }
                    console.log('[Zustand] Activity updated:', updatedActivity);
                    set({
                        selectedActivity: updatedActivity,
                        isLoading: false,
                    });
                } catch (error) {
                    console.error('[Zustand] Error updating activity:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to update activity!',
                        isLoading: false,
                    });
                }
            },

            // Soft delete activity (deactivate)
            removeActivity: async (activityId: string) => {
                set({ isLoading: true, error: null });
                try {
                    const { message, activity } =
                        await deleteActivity(activityId);
                    console.log(message, activity);
                    set({
                        activities: get().activities?.filter(
                            (a) => a.activity_id !== activityId
                        ),
                        isLoading: false,
                    });
                } catch (error) {
                    console.error('[Zustand] Error deleting activity:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to delete activity!',
                        isLoading: false,
                    });
                }
            },

            recoverActivity: async (activityId: string) => {
                set({ isLoading: true, error: null });
                try {
                    const { message, activity } =
                        await recoverActivity(activityId);
                    console.log(message, activity);
                    set({ activity, isLoading: false });
                } catch (error) {
                    console.error('[Zustand] Recover Activity Error:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to recover activity!',
                        isLoading: false,
                    });
                }
            },

            // Clear cache
            clearCache: () => {
                set({ activities: null, selectedActivity: null });
            },
        }),
        {
            name: 'activity-storage', // Persist store data to local storage
            storage: localStorageWrapper, // Use localStorage for persistence
        }
    )
);

export default activityStore;
