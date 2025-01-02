import { prisma } from './prisma';

// POST: Create transportation
export async function createTransportation(data: {
    service_id: string;
    vehicle_type: string;
    vehicle_info: string;
    capacity: number;
    schedule: string;
    vehicle_price: number;
}) {
    try {
        const newTransportation = await prisma.transportation.create({ data });
        return { newTransportation };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// GET: Get all transportation
export async function getAllTransportation() {
    try {
        const transportation = await prisma.transportation.findMany();
        return { transportation };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// GET: Get specific transportation
export async function getTransportation(transportationId: string) {
    try {
        const transportation = await prisma.transportation.findUnique({
            where: { transportation_id: transportationId },
        });

        if (!transportation) return { error: 'Transportation not found' };
        return { transportation };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// UPDATE: Update transportation
export async function updateTransportation(
    transportationId: string,
    data: Partial<{
        vehicle_type: string;
        vehicle_info: string;
        capacity: number;
        schedule: string;
        vehicle_price: number;
    }>
) {
    try {
        const updatedTransportation = await prisma.transportation.update({
            where: { transportation_id: transportationId },
            data,
        });

        return { updatedTransportation };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// DELETE: Delete transportation
export async function deleteTransportation(transportationId: string) {
    try {
        await prisma.transportation.delete({
            where: { transportation_id: transportationId },
        });

        return { message: 'Transportation deleted successfully' };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}
