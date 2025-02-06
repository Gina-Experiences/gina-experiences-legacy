'use server';

import { prisma } from './prisma';

// POST: Create activity
export async function createActivity(data: {
    product_id: string;
    activity_name: string;
    highlights: string;
    what_to_expect: string;
    best_time_to_visit: string;
    duration_number: number;
    duration_unit: 'H' | 'D';
    faqs: string;
    activity_price: number;
}) {
    console.log('Data received in createActivity:', data); // Log the input data
    try {
        const newActivity = await prisma.activities.create({
            data: {
                activity_name: data.activity_name,
                highlights: data.highlights,
                what_to_expect: data.what_to_expect,
                best_time_to_visit: data.best_time_to_visit,
                duration_number: data.duration_number,
                duration_unit: data.duration_unit,
                faqs: data.faqs,
                activity_price: data.activity_price,
                number_of_sold_items: 0,
                favorites: 0,
                rating: 0.0,
                is_active: true,
                Product: {
                    connect: { product_id: data.product_id },
                },
            },
        });
        console.log('New Activity Created:', newActivity); // Log the new activity
        return { newActivity }; // Ensure this returns the new activity
    } catch (error: unknown) {
        console.error('Error creating activity:', error); // Log the error
        return handleError(error); // Handle the error
    }
}

// GET: Get all active activities
export async function getAllActivities() {
    try {
        const activities = await prisma.activities.findMany({
            include: { Product: true },
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
            include: { Product: true },
        });

        if (!activity || !activity.is_active)
            return { error: 'Activity not found' };
        return { activity };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// PUT: Update activity
export async function updateActivity(
    activityId: string,
    data: Partial<{
        product_id: string;
        activity_name: string;
        highlights: string;
        what_to_expect: string;
        best_time_to_visit: string;
        duration_number: number;
        duration_unit: 'H' | 'D';
        faqs: string;
        activity_price: number;
        is_active: boolean;
    }>
) {
    try {
        // Check if the activity exists
        const existingActivity = await prisma.activities.findUnique({
            where: { activity_id: activityId },
        });

        if (!existingActivity) return { error: 'Activity not found' };

        // Perform the update
        const updatedActivity = await prisma.activities.update({
            where: { activity_id: activityId },
            data: {
                ...data,
                Product: data.product_id
                    ? { connect: { product_id: data.product_id } }
                    : undefined, // Only connect a new product if provided
            },
        });

        return { updatedActivity };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// DELETE: Soft delete activity
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
