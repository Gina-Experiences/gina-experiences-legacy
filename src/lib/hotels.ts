import { prisma } from './prisma';

// POST: Create hotel
export async function createHotel(data: {
    service_id: string;
    highlights: string;
    what_you_get: string;
    faqs: string;
    hotel_price: number;
}) {
    try {
        const newHotel = await prisma.hotels.create({
            data: {
                ...data,
                number_of_sold_items: 0,
                favorites: 0,
                rating: 0.0,
                is_active: true,
            },
        });
        return { newHotel };
    } catch (error: unknown) {
        return handleError(error);
    }
}

export async function getAllHotels() {
    try {
        const hotels = await prisma.hotels.findMany({
            where: { is_active: true },
        });
        return { hotels };
    } catch (error: unknown) {
        return handleError(error);
    }
}

export async function getHotel(hotelId: string) {
    try {
        const hotel = await prisma.hotels.findUnique({
            where: { hotel_id: hotelId },
        });

        if (!hotel || !hotel.is_active) return { error: 'Hotel not found' };
        return { hotel };
    } catch (error: unknown) {
        return handleError(error);
    }
}

export async function deleteHotel(hotelId: string) {
    try {
        await prisma.hotels.update({
            where: { hotel_id: hotelId },
            data: { is_active: false },
        });
        return { message: 'Hotel deleted (soft delete) successfully' };
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