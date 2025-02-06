import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    createEvent,
    getAllEvents,
    getEvent,
    updateEvent,
    deleteEvent,
} from '@/lib/events';
import { localStorageWrapper } from '@/stores';

interface EventStore {
    events: any[] | null;
    selectedEvent: any | null;
    isLoading: boolean;
    error: string | null;

    fetchAllEvents: () => Promise<void>;
    fetchEvent: (eventId: string) => Promise<void>;
    addEvent: (
        productId: string,
        eventName: string,
        highlights: string,
        whatToExpect: string,
        bestTimeToVisit: string,
        location: string,
        durationNumber: number,
        durationUnit: 'H' | 'D',
        faqs: string,
        eventPrice: number
    ) => Promise<void>;
    updateEvent: (
        eventId: string,
        data: Partial<EventUpdateData>
    ) => Promise<void>;
    removeEvent: (eventId: string) => Promise<void>;
    clearCache: () => void;
}

interface EventUpdateData {
    product_id?: string;
    event_name?: string;
    highlights?: string;
    what_to_expect?: string;
    best_time_to_visit?: string;
    location?: string;
    duration_number?: number;
    duration_unit?: 'H' | 'D';
    faqs?: string;
    event_price?: number;
    is_active?: boolean;
}

const eventStore = create<EventStore>()(
    persist(
        (set) => ({
            events: null,
            selectedEvent: null,
            isLoading: false,
            error: null,

            // Fetch all active events
            fetchAllEvents: async () => {
                set({ isLoading: true, error: null });
                try {
                    const { events } = await getAllEvents();
                    console.log('[Zustand] Events fetched:', events);
                    set({ events, isLoading: false });
                } catch (error) {
                    console.error('[Zustand] Error fetching events:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch events!',
                        isLoading: false,
                    });
                }
            },

            // Fetch a specific event by ID
            fetchEvent: async (eventId: string) => {
                set({ isLoading: true, error: null });
                try {
                    const { event } = await getEvent(eventId);
                    console.log('[Zustand] Event fetched:', event);
                    set({ selectedEvent: event, isLoading: false });
                } catch (error) {
                    console.error('[Zustand] Error fetching event:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch event!',
                        isLoading: false,
                    });
                }
            },

            // Create a new event
            addEvent: async (
                productId: string,
                eventName: string,
                highlights: string,
                whatToExpect: string,
                bestTimeToVisit: string,
                location: string,
                durationNumber: number,
                durationUnit: 'H' | 'D',
                faqs: string,
                eventPrice: number
            ) => {
                set({ isLoading: true, error: null });
                try {
                    const { newEvent } = await createEvent({
                        product_id: productId,
                        event_name: eventName,
                        highlights: highlights,
                        what_to_expect: whatToExpect,
                        best_time_to_visit: bestTimeToVisit,
                        location: location,
                        duration_number: durationNumber,
                        duration_unit: durationUnit,
                        faqs: faqs,
                        event_price: eventPrice,
                    });
                    console.log('[Zustand] Event created:', newEvent);
                    set((state) => ({
                        events: [...(state.events || []), newEvent],
                        isLoading: false,
                    }));
                } catch (error) {
                    console.error('[Zustand] Error creating event:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to create event!',
                        isLoading: false,
                    });
                }
            },

            // Update event details
            updateEvent: async (eventId: string, data: EventUpdateData) => {
                set({ isLoading: true, error: null });
                try {
                    const { updatedEvent } = await updateEvent(eventId, data);
                    console.log('[Zustand] Event updated:', updatedEvent);
                    set({
                        events: set().events?.map((event) =>
                            event.event_id === eventId ? updatedEvent : event
                        ),
                        isLoading: false,
                    });
                } catch (error) {
                    console.error('[Zustand] Error updating event:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to update event!',
                        isLoading: false,
                    });
                }
            },

            // Soft delete event (deactivate)
            removeEvent: async (eventId: string) => {
                set({ isLoading: true, error: null });
                try {
                    await deleteEvent(eventId);
                    console.log('[Zustand] Event soft deleted');
                    set({
                        events: set().events?.filter(
                            (event) => event.event_id !== eventId
                        ),
                        isLoading: false,
                    });
                } catch (error) {
                    console.error('[Zustand] Error deleting event:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to delete event!',
                        isLoading: false,
                    });
                }
            },

            // Clear cache
            clearCache: () => {
                set({ events: null, selectedEvent: null });
            },
        }),
        {
            name: 'event-storage', // Persist store data to local storage
            storage: localStorageWrapper, // Use localStorage for persistence
        }
    )
);

export default eventStore;
