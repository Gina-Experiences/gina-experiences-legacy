import { prisma } from './prisma';

// POST: Create event
export async function createEvent(data: {
  service_id: string;
  highlights: string;
  location: string;
  what_you_get: string;
  what_to_expect: string;
  best_time_to_visit: string;
  event_date: Date;
  event_duration: string;
  faqs: string;
  event_price: number;
}) {
  try {
    const newEvent = await prisma.events.create({ data });
    return { newEvent };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// GET: Get all events
export async function getAllEvents() {
  try {
    const events = await prisma.events.findMany();
    return { events };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// GET: Get specific event
export async function getEvent(eventId: string) {
  try {
    const event = await prisma.events.findUnique({
      where: { event_id: eventId },
    });

    if (!event) return { error: 'Event not found' };
    return { event };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// UPDATE: Update event
export async function updateEvent(eventId: string, data: Partial<{
  highlights: string;
  location: string;
  what_you_get: string;
  what_to_expect: string;
  best_time_to_visit: string;
  event_date: Date;
  event_duration: string;
  faqs: string;
  event_price: number;
}>) {
  try {
    const updatedEvent = await prisma.events.update({
      where: { event_id: eventId },
      data,
    });

    return { updatedEvent };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// DELETE: Delete event
export async function deleteEvent(eventId: string) {
  try {
    await prisma.events.delete({
      where: { event_id: eventId },
    });

    return { message: 'Event deleted successfully' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}
