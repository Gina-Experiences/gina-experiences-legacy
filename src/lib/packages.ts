'use server';

import { prisma } from './prisma';

// POST: Create package
export async function createPackage(data: {
    product_id: string; // Updated field name to product_id based on the schema
    package_name: string;
    highlights: string;
    what_to_expect: string;
    best_time_to_visit: string;
    duration_number: number;
    duration_unit: 'H' | 'D'; // Enum values from DurationUnit
    faqs: string;
    package_price: number;
    image_link: string;
}) {
    try {
        const newPackage = await prisma.packages.create({
            data: {
                package_name: data.package_name,
                highlights: data.highlights,
                what_to_expect: data.what_to_expect,
                best_time_to_visit: data.best_time_to_visit,
                duration_number: data.duration_number,
                duration_unit: data.duration_unit,
                faqs: data.faqs,
                package_price: data.package_price,
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
        console.log('Package created successfully:', newPackage);
        return { newPackage };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// GET: Retrieve all active packages
export async function getAllPackages() {
    try {
        const packages = await prisma.packages.findMany({
            include: { Product: true }, // Include the related Product information if needed
        });
        return { packages };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// GET: Retrieve a specific package by its ID
export async function getPackage(packageId: string) {
    try {
        const packageData = await prisma.packages.findUnique({
            where: { package_id: packageId },
            include: { Product: true }, // Include the related Product information if needed
        });

        if (!packageData || !packageData.is_active)
            return { error: 'Package not found' };
        return { package: packageData };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// PUT: Update package
export async function updatePackage(
    packageId: string,
    data: Partial<{
        product_id: string;
        package_name: string;
        highlights: string;
        what_to_expect: string;
        best_time_to_visit: string;
        duration_number: number;
        duration_unit: 'H' | 'D';
        faqs: string;
        package_price: number;
        image_link: string;
        is_active: boolean;
    }>
) {
    try {
        // Check if the package exists
        const existingPackage = await prisma.packages.findUnique({
            where: { package_id: packageId },
        });

        if (!existingPackage) return { error: 'Package not found' };

        // Perform the update
        const updatedPackage = await prisma.packages.update({
            where: { package_id: packageId },
            data: {
                ...data,
                Product: data.product_id
                    ? { connect: { product_id: data.product_id } }
                    : undefined, // Only connect a new product if provided
            },
        });

        return { updatedPackage };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// DELETE: Soft delete a package by setting is_active to false
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
