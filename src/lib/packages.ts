import { prisma } from './prisma';

// POST: Create package
export async function createPackage(data: {
    service_id: string;
    highlights: string;
    what_you_get: string;
    what_to_expect: string;
    best_time_to_visit: string;
    package_date: Date;
    package_duration: string;
    faqs: string;
    package_price: number;
}) {
    try {
        const newPackage = await prisma.packages.create({
            data: {
                ...data,
                number_of_sold_items: 0,
                favorites: 0,
                rating: 0.0,
                is_active: true,
            },
        });
        return { newPackage };
    } catch (error: unknown) {
        return handleError(error);
    }
}

export async function getAllPackages() {
    try {
        const packages = await prisma.packages.findMany({
            where: { is_active: true },
        });
        return { packages };
    } catch (error: unknown) {
        return handleError(error);
    }
}

export async function getPackage(packageId: string) {
    try {
        const packageData = await prisma.packages.findUnique({
            where: { package_id: packageId },
        });

        if (!packageData || !packageData.is_active) return { error: 'Package not found' };
        return { package: packageData };
    } catch (error: unknown) {
        return handleError(error);
    }
}

export async function deletePackage(packageId: string) {
    try {
        await prisma.packages.update({
            where: { package_id: packageId },
            data: { is_active: false },
        });
        return { message: 'Package deleted (soft delete) successfully' };
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
