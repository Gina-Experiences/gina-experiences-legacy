import { prisma } from './prisma';

// POST: Create transportation
export async function createTransportation(data: {
    product_id: string;       // Updated field name to product_id based on the schema
    transportation_name: string;
    highlights: string;
    vehicle_type: string;
    vehicle_info: string;
    capacity: number;
    faqs: string;
    vehicle_price: number;
}) {
    try {
        const newTransportation = await prisma.transportation.create({
            data: {
                ...data,
                number_of_sold_items: 0,
                favorites: 0,
                rating: 0.0,
                is_active: true,
                Product: {
                    connect: { product_id: data.product_id },
                },
            },
        });
        return { newTransportation };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// GET: Retrieve all active transportations
export async function getAllTransportations() {
    try {
        const transportations = await prisma.transportation.findMany({
            where: { is_active: true },
            include: { Product: true },  // Include the related Product information if needed
        });
        return { transportations };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// GET: Retrieve a specific transportation by its ID
export async function getTransportation(transportationId: string) {
    try {
        const transportation = await prisma.transportation.findUnique({
            where: { transportation_id: transportationId },
            include: { Product: true },  // Include the related Product information if needed
        });

        if (!transportation || !transportation.is_active) return { error: 'Transportation not found' };
        return { transportation };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// DELETE: Soft delete a transportation by setting is_active to false
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
