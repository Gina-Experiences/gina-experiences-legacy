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
    const newActivity = await prisma.activities.create({ data });
    return { newActivity };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// GET: Get all activities
export async function getAllActivities() {
  try {
    const activities = await prisma.activities.findMany();
    return { activities };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// GET: Get specific activity
export async function getActivity(activityId: string) {
  try {
    const activity = await prisma.activities.findUnique({
      where: { activity_id: activityId },
    });

    if (!activity) return { error: 'Activity not found' };
    return { activity };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// UPDATE: Update activity
export async function updateActivity(activityId: string, data: Partial<{
  highlights: string;
  what_you_get: string;
  what_to_expect: string;
  best_time_to_visit: string;
  activity_date: Date;
  activity_duration: string;
  faqs: string;
  activity_price: number;
}>) {
  try {
    const updatedActivity = await prisma.activities.update({
      where: { activity_id: activityId },
      data,
    });

    return { updatedActivity };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// DELETE: Delete activity
export async function deleteActivity(activityId: string) {
  try {
    await prisma.activities.delete({
      where: { activity_id: activityId },
    });

    return { message: 'Activity deleted successfully' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}
