import { prisma } from './prisma';

// POST: Create package
export async function createPackage(data: {
  product_id: string;
  highlights: string;
  what_you_get: string;
  what_to_expect: string;
  best_time_to_visit: string;
  package_duration: string;
  faqs: string;
  package_price: number;
}) {
  try {
    const newPackage = await prisma.packages.create({ data });
    return { newPackage };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// GET: Get all packages
export async function getAllPackages() {
  try {
    const packages = await prisma.packages.findMany();
    return { packages };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// GET: Get specific package
export async function getPackage(packageId: string) {
  try {
    const packageData = await prisma.packages.findUnique({
      where: { package_id: packageId },
    });

    if (!packageData) return { error: 'Package not found' };
    return { packageData };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// UPDATE: Update package
export async function updatePackage(packageId: string, data: Partial<{
  highlights: string;
  what_you_get: string;
  what_to_expect: string;
  best_time_to_visit: string;
  package_duration: string;
  faqs: string;
  package_price: number;
}>) {
  try {
    const updatedPackage = await prisma.packages.update({
      where: { package_id: packageId },
      data,
    });

    return { updatedPackage };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// DELETE: Delete package
export async function deletePackage(packageId: string) {
  try {
    await prisma.packages.delete({
      where: { package_id: packageId },
    });

    return { message: 'Package deleted successfully' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}
