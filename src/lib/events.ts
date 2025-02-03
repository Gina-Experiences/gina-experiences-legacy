import { prisma } from './prisma';

// POST: Create event
export async function createEvent(data: {
    service_id: string;
    highlights: string;
    what_you_get: string;
    what_to_expect: string;
    best_time_to_visit: string;
    event_date: Date;
    event_duration: string;
    faqs: string;
    event_price: number;
}) {
    try {
        const newEvent = await prisma.events.create({
            data: {
                ...data,
                number_of_sold_items: 0,
                favorites: 0,
                rating: 0.0,
                is_active: true,
            },
        });
        return { newEvent };
    } catch (error: unknown) {
        return handleError(error);
    }
}

export async function getAllEvents() {
    try {
        const events = await prisma.events.findMany({
            where: { is_active: true },
        });
        return { events };
    } catch (error: unknown) {
        return handleError(error);
    }
}

export async function getEvent(eventId: string) {
    try {
        const event = await prisma.events.findUnique({
            where: { event_id: eventId },
        });

        if (!event || !event.is_active) return { error: 'Event not found' };
        return { event };
    } catch (error: unknown) {
        return handleError(error);
    }
}

export async function deleteEvent(eventId: string) {
    try {
        await prisma.events.update({
            where: { event_id: eventId },
            data: { is_active: false },
        });
        return { message: 'Event deleted (soft delete) successfully' };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// Common error handler
function handleError(error: unknown) {
    if (error instanceof Error) {
        return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
}