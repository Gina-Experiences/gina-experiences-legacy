import { prisma } from './prisma';

// POST: Create hotel
export async function createHotel(data: {
    product_id: string;      // Updated field name from service_id to product_id based on the schema
    hotel_name: string;
    room_type: string;
    what_to_expect: string;
    amenities: string;
    highlights: string;
    faqs: string;
    hotel_price: number;
    duration_number: number;
    duration_unit: 'H' | 'D';  // Enum values from DurationUnit
}) {
    try {
        const newHotel = await prisma.hotels.create({
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
        return { newHotel };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// GET: Retrieve all active hotels
export async function getAllHotels() {
    try {
        const hotels = await prisma.hotels.findMany({
            where: { is_active: true },
            include: { Product: true },  // Include the related Product information if needed
        });
        return { hotels };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// GET: Retrieve a specific hotel by its ID
export async function getHotel(hotelId: string) {
    try {
        const hotel = await prisma.hotels.findUnique({
            where: { hotel_id: hotelId },
            include: { Product: true },  // Include the related Product information if needed
        });

        if (!hotel || !hotel.is_active) return { error: 'Hotel not found' };
        return { hotel };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// DELETE: Soft delete a hotel by setting is_active to false
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
