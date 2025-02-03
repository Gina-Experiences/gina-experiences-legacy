import { prisma } from './prisma';

// POST: Create product
export async function createProduct(data: {
    product_name: string;
    product_type: string;
}) {
    try {
        const newProduct = await prisma.product.create({ data });
        return { newProduct };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// GET: Get all products
export async function getAllProducts() {
    try {
        const products = await prisma.product.findMany({
            include: {
                Transactions: true,
                Packages: true,
                Services: true,
            },
        });
        return { products };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// GET: Get specific product
export async function getProduct(productId: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { product_id: productId },
            include: {
                Transactions: true,
                Packages: true,
                Services: true,
            },
        });

        if (!product) return { error: 'Product not found' };
        return { product };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// UPDATE: Update product
export async function updateProduct(
    productId: string,
    data: Partial<{
        product_name: string;
        product_type: string;
    }>
) {
    try {
        const updatedProduct = await prisma.product.update({
            where: { product_id: productId },
            data,
        });

        return { updatedProduct };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}

// DELETE: Delete product
export async function deleteProduct(productId: string) {
    try {
        await prisma.product.delete({
            where: { product_id: productId },
        });

        return { message: 'Product deleted successfully' };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'An unknown error occurred' };
    }
}
