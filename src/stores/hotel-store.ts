import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    getAllHotels,
    getHotel,
    createHotel,
    updateHotel,
    deleteHotel,
} from '@/lib/hotels';
import { localStorageWrapper } from '@/stores';

interface HotelStore {
    hotels: any[] | null;
    selectedHotel: any | null;
    isLoading: boolean;
    error: string | null;

    fetchAllHotels: () => Promise<void>;
    fetchHotel: (hotelId: string) => Promise<void>;
    addHotel: (
        productId: string,
        hotelName: string,
        roomType: string,
        whatToExpect: string,
        amenities: string,
        highlights: string,
        faqs: string,
        hotelPrice: number,
        durationNumber: number,
        durationUnit: 'H' | 'D'
    ) => Promise<void>;
    updateHotel: (
        hotelId: string,
        data: Partial<HotelUpdateData>
    ) => Promise<void>;
    removeHotel: (hotelId: string) => Promise<void>;
    clearCache: () => void;
}

interface HotelUpdateData {
    product_id?: string;
    hotel_name?: string;
    room_type?: string;
    what_to_expect?: string;
    amenities?: string;
    highlights?: string;
    faqs?: string;
    hotel_price?: number;
    duration_number?: number;
    duration_unit?: 'H' | 'D';
    is_active?: boolean;
}

const hotelStore = create<HotelStore>()(
    persist(
        (set) => ({
            hotels: null,
            selectedHotel: null,
            isLoading: false,
            error: null,

            // Fetch all active hotels
            fetchAllHotels: async () => {
                set({ isLoading: true, error: null });
                try {
                    const { hotels } = await getAllHotels();
                    console.log('[Zustand] Hotels fetched:', hotels);
                    set({ hotels, isLoading: false });
                } catch (error) {
                    console.error('[Zustand] Error fetching hotels:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch hotels!',
                        isLoading: false,
                    });
                }
            },

            // Fetch a specific hotel by ID
            fetchHotel: async (hotelId: string) => {
                set({ isLoading: true, error: null });
                try {
                    const { hotel } = await getHotel(hotelId);
                    console.log('[Zustand] Hotel fetched:', hotel);
                    set({ selectedHotel: hotel, isLoading: false });
                } catch (error) {
                    console.error('[Zustand] Error fetching hotel:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch hotel!',
                        isLoading: false,
                    });
                }
            },

            // Create a new hotel
            addHotel: async (
                productId: string,
                hotelName: string,
                roomType: string,
                whatToExpect: string,
                amenities: string,
                highlights: string,
                faqs: string,
                hotelPrice: number,
                durationNumber: number,
                durationUnit: 'H' | 'D'
            ) => {
                set({ isLoading: true, error: null });
                try {
                    const { newHotel } = await createHotel({
                        product_id: productId,
                        hotel_name: hotelName,
                        room_type: roomType,
                        what_to_expect: whatToExpect,
                        amenities: amenities,
                        highlights: highlights,
                        faqs: faqs,
                        hotel_price: hotelPrice,
                        duration_number: durationNumber,
                        duration_unit: durationUnit,
                    });
                    console.log('[Zustand] Hotel created:', newHotel);
                    set((state) => ({
                        hotels: [...(state.hotels || []), newHotel],
                        isLoading: false,
                    }));
                } catch (error) {
                    console.error('[Zustand] Error creating hotel:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to create hotel!',
                        isLoading: false,
                    });
                }
            },

            // Update hotel details
            updateHotel: async (hotelId: string, data: HotelUpdateData) => {
                set({ isLoading: true, error: null });
                try {
                    const { updatedHotel } = await updateHotel(hotelId, data);
                    console.log('[Zustand] Hotel updated:', updatedHotel);
                    set({
                        hotels: set().hotels?.map((hotel) =>
                            hotel.hotel_id === hotelId ? updatedHotel : hotel
                        ),
                        isLoading: false,
                    });
                } catch (error) {
                    console.error('[Zustand] Error updating hotel:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to update hotel!',
                        isLoading: false,
                    });
                }
            },

            // Soft delete hotel (deactivate)
            removeHotel: async (hotelId: string) => {
                set({ isLoading: true, error: null });
                try {
                    await deleteHotel(hotelId);
                    console.log('[Zustand] Hotel soft deleted');
                    set({
                        hotels: set().hotels?.filter(
                            (hotel) => hotel.hotel_id !== hotelId
                        ),
                        isLoading: false,
                    });
                } catch (error) {
                    console.error('[Zustand] Error deleting hotel:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to delete hotel!',
                        isLoading: false,
                    });
                }
            },

            // Clear cache
            clearCache: () => {
                set({ hotels: null, selectedHotel: null });
            },
        }),
        {
            name: 'hotel-storage', // Persist store data to local storage
            storage: localStorageWrapper, // Use localStorage for persistence
        }
    )
);

export default hotelStore;
