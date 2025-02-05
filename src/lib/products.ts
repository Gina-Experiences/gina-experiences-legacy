import { prisma } from './prisma';
import { ProductType } from '@prisma/client';

// POST: Create product
export async function createProduct(data: {
    product_type: ProductType;  // Use the ProductType enum directly
}) {
    try {
        const newProduct = await prisma.product.create({
            data: {
                product_type: data.product_type,
            },
        });
        return { newProduct };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// GET: Retrieve all products
export async function getAllProducts() {
    try {
        const products = await prisma.product.findMany({
            include: {
                Transactions: true,
                Packages: true,
                Activities: true,
                Events: true,
                Hotels: true,
                Transportation: true,
            },
        });
        return { products };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// GET: Retrieve a specific product by ID
export async function getProduct(productId: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { product_id: productId },
            include: {
                Transactions: true,
                Packages: true,
                Activities: true,
                Events: true,
                Hotels: true,
                Transportation: true,
            },
        });

        if (!product) return { error: 'Product not found' };
        return { product };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// UPDATE: Update product details
export async function updateProduct(
    productId: string,
    data: Partial<{
        product_type: ProductType;
    }>
) {
    try {
        const updatedProduct = await prisma.product.update({
            where: { product_id: productId },
            data,
        });

        return { updatedProduct };
    } catch (error: unknown) {
        return handleError(error);
    }
}

// DELETE: Delete a product
export async function deleteProduct(productId: string) {
    try {
        await prisma.product.delete({
            where: { product_id: productId },
        });

        return { message: 'Product deleted successfully' };
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
