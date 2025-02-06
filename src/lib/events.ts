'use server';
import { prisma } from './prisma';

// POST: Create event
export async function createEvent(data: {
    product_id: string;
    event_name: string;
    highlights: string;
    what_to_expect: string;
    best_time_to_visit: string;
    faqs: string;
    event_price: number;
    duration_number: number;
    duration_unit: 'H' | 'D';
    location: string;
    image_link: string;
}) {
    try {
        const newEvent = await prisma.events.create({
            data: {
                event_name: data.event_name,
                highlights: data.highlights,
                what_to_expect: data.what_to_expect,
                best_time_to_visit: data.best_time_to_visit,
                location: data.location,
                duration_number: data.duration_number,
                duration_unit: data.duration_unit,
                faqs: data.faqs,
                event_price: data.event_price,
                image_link: data.image_link,
                number_of_sold_items: 0,
                favorites: 0,
                rating: 0.0,
                is_active: true,
                Product: {
                    connect: { product_id: data.product_id },
                },
            },
        });
        console.log('New Event Created:', newEvent);
        return { newEvent };
    } catch (error: unknown) {
        return handleError(error);
    }
}

export async function getAllEvents() {
    try {
        const events = await prisma.events.findMany({
            include: { Product: true },
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
            include: { Product: true },
        });

        if (!event || !event.is_active) return { error: 'Event not found' };
        return { event };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// PUT: Update event
export async function updateEvent(
    eventId: string,
    data: Partial<{
        product_id: string;
        event_name: string;
        highlights: string;
        what_to_expect: string;
        best_time_to_visit: string;
        faqs: string;
        event_price: number;
        duration_number: number;
        duration_unit: 'H' | 'D';
        location: string;
        image_link: string;
        is_active: boolean;
    }>
) {
    try {
        // Check if the event exists
        const existingEvent = await prisma.events.findUnique({
            where: { event_id: eventId },
        });

        if (!existingEvent) return { error: 'Event not found' };

        // Perform the update
        const updatedEvent = await prisma.events.update({
            where: { event_id: eventId },
            data: {
                ...data,
                Product: data.product_id
                    ? { connect: { product_id: data.product_id } }
                    : undefined, // Connect a new product if provided
            },
        });

        return { updatedEvent };
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

export async function recoverEvent(eventId: string) {
    try {
        await prisma.events.update({
            where: { event_id: eventId },
            data: { is_active: true },
        });
        return { message: 'Event recovered successfully' };
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
