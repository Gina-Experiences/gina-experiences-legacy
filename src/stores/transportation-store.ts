import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    createTransportation,
    deleteTransportation,
    getAllTransportations,
    getTransportation,
    updateTransportation,
    recoverTransportation,
} from '@/lib/transportation';
import { localStorageWrapper } from '@/stores';

interface TransportationStore {
    transportations: any[] | null;
    selectedTransportation: any | null;
    isLoading: boolean;
    error: string | null;

    fetchAllTransportations: () => Promise<void>;
    fetchTransportation: (transportationId: string) => Promise<void>;
    addTransportation: (
        productId: string,
        transportationName: string,
        vehicleType: string,
        vehicleInfo: string,
        capacity: number,
        vehiclePrice: number,
        image_link: string
    ) => Promise<void>;
    updateTransportation: (
        transportationId: string,
        data: {
            product_id?: string;
            transportation_name?: string;
            vehicle_type?: string;
            vehicle_info?: string;
            capacity?: number;
            vehicle_price?: number;
            image_link?: string;
            is_active?: boolean;
        }
    ) => Promise<void>;

    removeTransportation: (transportationId: string) => Promise<void>;
    recoverTransportation: (transportationId: string) => Promise<void>;
    clearCache: () => void;
}

interface TransportationUpdateData {
    product_id?: string;
    transportation_name?: string;
    vehicle_type?: string;
    vehicle_info?: string;
    capacity?: number;
    vehicle_price?: number;
    image_link?: string;
    is_active?: boolean;
}

const transportationStore = create<TransportationStore>()(
    persist(
        (set) => ({
            transportations: null,
            selectedTransportation: null,
            isLoading: false,
            error: null,

            // Fetch all active transportations
            fetchAllTransportations: async () => {
                set({ isLoading: true, error: null });
                try {
                    const { transportations } = await getAllTransportations();
                    console.log(
                        '[Zustand] Transportations fetched:',
                        transportations
                    );
                    set({ transportations, isLoading: false });
                } catch (error) {
                    console.error(
                        '[Zustand] Error fetching transportations:',
                        error
                    );
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch transportations!',
                        isLoading: false,
                    });
                }
            },

            // Fetch a specific transportation by ID
            fetchTransportation: async (transportationId: string) => {
                set({ isLoading: true, error: null });
                try {
                    const { transportation } =
                        await getTransportation(transportationId);
                    console.log(
                        '[Zustand] Transportation fetched:',
                        transportation
                    );
                    set({
                        selectedTransportation: transportation,
                        isLoading: false,
                    });
                } catch (error) {
                    console.error(
                        '[Zustand] Error fetching transportation:',
                        error
                    );
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch transportation!',
                        isLoading: false,
                    });
                }
            },

            // Create a new transportation
            addTransportation: async (
                productId: string,
                transportationName: string,
                vehicleType: string,
                vehicleInfo: string,
                capacity: number,
                vehiclePrice: number,
                image_link: string
            ) => {
                set({ isLoading: true, error: null });
                try {
                    const { newTransportation } = await createTransportation({
                        product_id: productId,
                        transportation_name: transportationName,
                        vehicle_type: vehicleType,
                        vehicle_info: vehicleInfo,
                        capacity: capacity,
                        vehicle_price: vehiclePrice,
                        image_link: image_link,
                    });
                    console.log(
                        '[Zustand] Transportation created:',
                        newTransportation
                    );
                    set((state) => ({
                        transportations: [
                            ...(state.transportations || []),
                            newTransportation,
                        ],
                        isLoading: false,
                    }));
                } catch (error) {
                    console.error(
                        '[Zustand] Error creating transportation:',
                        error
                    );
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to create transportation!',
                        isLoading: false,
                    });
                }
            },

            // Update transportation details
            updateTransportation: async (transportationId, data) => {
                set({ isLoading: true, error: null });
                try {
                    const { updatedTransportation } =
                        await updateTransportation(transportationId, data);
                    if (!updatedTransportation) {
                        throw new Error(
                            'Transportation update failed on the server.'
                        );
                    }
                    console.log(
                        'Updated Transportation:',
                        updatedTransportation
                    );
                    set({
                        selectedTransportation: updatedTransportation,
                        isLoading: false,
                    });
                } catch (error) {
                    console.error('Update Transportation Error:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to update transportation!',
                        isLoading: false,
                    });
                }
            },

            // Soft delete transportation (deactivate)
            removeTransportation: async (transportationId: string) => {
                set({ isLoading: true, error: null });
                try {
                    const { message, transportation } =
                        await deleteTransportation(transportationId);
                    console.log(message, transportation);
                    set({ transportation, isLoading: false });

                    if (transportation?.is_active === false) {
                        set({
                            session: null,
                            transportation: null,
                            isAdmin: false,
                        });
                    }
                } catch (error) {
                    console.error(
                        '[Zustand] Deactivate Transportation Error:',
                        error
                    );
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to deactivate transportation!',
                        isLoading: false,
                    });
                }
            },

            recoverTransportation: async (transportationId: string) => {
                set({ isLoading: true, error: null });
                try {
                    const { message, transportation } =
                        await recoverTransportation(transportationId);
                    console.log(message, transportation);
                    set({ transportation, isLoading: false });
                } catch (error) {
                    console.error(
                        '[Zustand] Recover Transportation Error:',
                        error
                    );
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to recover transportation!',
                        isLoading: false,
                    });
                }
            },

            // Clear cache
            clearCache: () => {
                set({ transportations: null, selectedTransportation: null });
            },
        }),
        {
            name: 'transportation-storage', // Persist store data to local storage
            storage: localStorageWrapper, // Use localStorage for persistence
        }
    )
);

export default transportationStore;
