'use server';

import { prisma } from './prisma';

// POST: Create transportation
export async function createTransportation(data: {
    product_id: string; // Updated field name to product_id based on the schema
    transportation_name: string;
    vehicle_type: string;
    vehicle_info: string;
    capacity: number;
    vehicle_price: number;
    image_link: string;
}) {
    try {
        const newTransportation = await prisma.transportation.create({
            data: {
                transportation_name: data.transportation_name,
                vehicle_type: data.vehicle_type,
                vehicle_info: data.vehicle_info,
                capacity: data.capacity,
                vehicle_price: data.vehicle_price,
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
        console.log('Transportation created successfully:', newTransportation);
        return { newTransportation };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// GET: Retrieve all active transportations
export async function getAllTransportations() {
    try {
        const transportations = await prisma.transportation.findMany({
            include: { Product: true }, // Include the related Product information if needed
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
            include: { Product: true }, // Include the related Product information if needed
        });

        if (!transportation || !transportation.is_active)
            return { error: 'Transportation not found' };
        return { transportation };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// PUT: Update transportation
export async function updateTransportation(
    transportationId: string,
    data: Partial<{
        product_id: string;
        transportation_name: string;
        highlights: string;
        vehicle_type: string;
        vehicle_info: string;
        capacity: number;
        faqs: string;
        vehicle_price: number;
        image_link: string;
        is_active: boolean;
    }>
) {
    try {
        // Check if the transportation exists
        const existingTransportation = await prisma.transportation.findUnique({
            where: { transportation_id: transportationId },
        });

        if (!existingTransportation)
            return { error: 'Transportation not found' };

        // Perform the update
        const updatedTransportation = await prisma.transportation.update({
            where: { transportation_id: transportationId },
            data: {
                ...data,
                Product: data.product_id
                    ? { connect: { product_id: data.product_id } }
                    : undefined, // Connect a new product if provided
            },
        });

        return { updatedTransportation };
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

export async function recoverTransportation(transportationId: string) {
    try {
        await prisma.transportation.update({
            where: { transportation_id: transportationId },
            data: { is_active: true },
        });
        return { message: 'Transportation recovered successfully' };
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
