import { prisma } from './prisma';

// POST: Create hotel
export async function createHotel(data: {
  service_id: string;
  hotel_name: string;
  room_type: string;
  what_you_get: string;
  what_to_expect: string;
  amenities: string;
  highlights: string;
  duration: string;
  faqs: string;
  hotel_price: number;
}) {
  try {
    const newHotel = await prisma.hotels.create({ data });
    return { newHotel };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// GET: Get all hotels
export async function getAllHotels() {
  try {
    const hotels = await prisma.hotels.findMany();
    return { hotels };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// GET: Get specific hotel
export async function getHotel(hotelId: string) {
  try {
    const hotel = await prisma.hotels.findUnique({
      where: { hotel_id: hotelId },
    });

    if (!hotel) return { error: 'Hotel not found' };
    return { hotel };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// UPDATE: Update hotel
export async function updateHotel(hotelId: string, data: Partial<{
  hotel_name: string;
  room_type: string;
  what_you_get: string;
  what_to_expect: string;
  amenities: string;
  highlights: string;
  duration: string;
  faqs: string;
  hotel_price: number;
}>) {
  try {
    const updatedHotel = await prisma.hotels.update({
      where: { hotel_id: hotelId },
      data,
    });

    return { updatedHotel };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// DELETE: Delete hotel
export async function deleteHotel(hotelId: string) {
  try {
    await prisma.hotels.delete({
      where: { hotel_id: hotelId },
    });

    return { message: 'Hotel deleted successfully' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}
