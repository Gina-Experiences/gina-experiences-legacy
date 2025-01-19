import { prisma } from './prisma';

// POST: Create activity
export async function createActivity(data: {
    service_id: string;
    highlights: string;
    what_you_get: string;
    what_to_expect: string;
    best_time_to_visit: string;
    activity_date: Date;
    activity_duration: string;
    faqs: string;
    activity_price: number;
}) {
    try {
        const newActivity = await prisma.activities.create({
            data: {
                ...data,
                number_of_sold_items: 0,
                favorites: 0,
                rating: 0.0,
                is_active: true,
            },
        });
        return { newActivity };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// GET: Get all activities
export async function getAllActivities() {
    try {
        const activities = await prisma.activities.findMany({
            where: { is_active: true },
        });
        return { activities };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// GET: Get specific activity
export async function getActivity(activityId: string) {
    try {
        const activity = await prisma.activities.findUnique({
            where: { activity_id: activityId },
        });

        if (!activity || !activity.is_active) return { error: 'Activity not found' };
        return { activity };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// DELETE: Delete activity
export async function deleteActivity(activityId: string) {
    try {
        await prisma.activities.update({
            where: { activity_id: activityId },
            data: { is_active: false },
        });

        return { message: 'Activity deleted (soft delete) successfully' };
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

