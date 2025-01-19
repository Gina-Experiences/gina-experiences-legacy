import { prisma } from './prisma';

// POST: Create transportation
export async function createTransportation(data: {
    service_id: string;
    highlights: string;
    transportation_date: Date;
    transportation_duration: string;
    faqs: string;
    transportation_price: number;
}) {
    try {
        const newTransportation = await prisma.transportation.create({
            data: {
                ...data,
                number_of_sold_items: 0,
                favorites: 0,
                rating: 0.0,
                is_active: true,
            },
        });
        return { newTransportation };
    } catch (error: unknown) {
        return handleError(error);
    }
}

export async function getAllTransportations() {
    try {
        const transportations = await prisma.transportation.findMany({
            where: { is_active: true },
        });
        return { transportations };
    } catch (error: unknown) {
        return handleError(error);
    }
}

export async function getTransportation(transportationId: string) {
    try {
        const transportation = await prisma.transportation.findUnique({
            where: { transportation_id: transportationId },
        });

        if (!transportation || !transportation.is_active) return { error: 'Transportation not found' };
        return { transportation };
    } catch (error: unknown) {
        return handleError(error);
    }
}

export async function deleteTransportation(transportationId: string) {
    try {
        await prisma.transportation.update({
            where: { transportation_id: transportationId },
            data: { is_active: false },
        });
        return { message: 'Transportation deleted (soft delete) successfully' };
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
