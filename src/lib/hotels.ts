'use server';

import { prisma } from './prisma';

// POST: Create hotel
export async function createHotel(data: {
    product_id: string; // Updated field name from service_id to product_id based on the schema
    hotel_name: string;
    room_type: string;
    what_to_expect: string;
    amenities: string;
    highlights: string;
    faqs: string;
    hotel_price: number;
    duration_number: number;
    duration_unit: 'H' | 'D';
    image_link: string;
}) {
    try {
        const newHotel = await prisma.hotels.create({
            data: {
                hotel_name: data.hotel_name,
                room_type: data.room_type,
                what_to_expect: data.what_to_expect,
                amenities: data.amenities,
                highlights: data.highlights,
                faqs: data.faqs,
                hotel_price: data.hotel_price,
                duration_number: data.duration_number,
                duration_unit: data.duration_unit,
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
        console.log('Hotel created successfully:', newHotel);
        return { newHotel };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// GET: Retrieve all active hotels
export async function getAllHotels() {
    try {
        const hotels = await prisma.hotels.findMany({
            include: { Product: true }, // Include the related Product information if needed
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
            include: { Product: true }, // Include the related Product information if needed
        });

        if (!hotel || !hotel.is_active) return { error: 'Hotel not found' };
        return { hotel };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// PUT: Update hotel
export async function updateHotel(
    hotelId: string,
    data: Partial<{
        product_id: string;
        hotel_name: string;
        room_type: string;
        what_to_expect: string;
        amenities: string;
        highlights: string;
        faqs: string;
        hotel_price: number;
        duration_number: number;
        duration_unit: 'H' | 'D';
        image_link: string;
        is_active: boolean;
    }>
) {
    try {
        // Check if the hotel exists
        const existingHotel = await prisma.hotels.findUnique({
            where: { hotel_id: hotelId },
        });

        if (!existingHotel) return { error: 'Hotel not found' };

        // Perform the update
        const updatedHotel = await prisma.hotels.update({
            where: { hotel_id: hotelId },
            data: {
                ...data,
                Product: data.product_id
                    ? { connect: { product_id: data.product_id } }
                    : undefined, // Only connect a new product if provided
            },
        });

        return { updatedHotel };
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
