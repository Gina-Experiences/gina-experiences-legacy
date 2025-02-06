import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} from '@/lib/products';
import { localStorageWrapper } from '@/stores';
import { ProductType } from '@prisma/client';

interface ProductStore {
    products: any[] | null;
    selectedProduct: any | null;
    isLoading: boolean;
    error: string | null;

    fetchAllProducts: () => Promise<void>;
    fetchProduct: (productId: string) => Promise<void>;
    addProduct: (productType: ProductType) => Promise<void>;
    updateProduct: (
        productId: string,
        data: { product_type?: ProductType }
    ) => Promise<void>;
    removeProduct: (productId: string) => Promise<void>;
    clearCache: () => void;
}

const productStore = create<ProductStore>()(
    persist(
        (set) => ({
            products: null,
            selectedProduct: null,
            isLoading: false,
            error: null,

            // Fetch all products
            fetchAllProducts: async () => {
                set({ isLoading: true, error: null });
                try {
                    const { products } = await getAllProducts();
                    console.log('[Zustand] Products fetched:', products);
                    set({ products, isLoading: false });
                } catch (error) {
                    console.error('[Zustand] Error fetching products:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch products!',
                        isLoading: false,
                    });
                }
            },

            // Fetch a single product
            fetchProduct: async (productId: string) => {
                set({ isLoading: true, error: null });
                try {
                    const { product } = await getProduct(productId);
                    console.log('[Zustand] Product fetched:', product);
                    set({ selectedProduct: product, isLoading: false });
                } catch (error) {
                    console.error('[Zustand] Error fetching product:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch product!',
                        isLoading: false,
                    });
                }
            },

            // In product-store.ts
            addProduct: async (productType: ProductType) => {
                set({ isLoading: true, error: null });
                try {
                    const { newProduct } = await createProduct({
                        product_type: productType,
                    });
                    console.log('[Zustand] Product created:', newProduct); // Log the new product

                    // Update the store correctly by using a function that accesses the current state
                    set((state) => ({
                        products: [...(state.products || []), newProduct],
                        isLoading: false,
                    }));

                    return newProduct; // Ensure you return the new product here
                } catch (error) {
                    console.error('[Zustand] Error creating product:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to create product!',
                        isLoading: false,
                    });
                    throw error; // Re-throw the error for handling in the component
                }
            },

            // Update product details
            updateProduct: async (
                productId: string,
                data: { product_type?: ProductType } // Use ProductType enum here
            ) => {
                set({ isLoading: true, error: null });
                try {
                    const { updatedProduct } = await updateProduct(
                        productId,
                        data
                    );
                    console.log('[Zustand] Product updated:', updatedProduct);
                    set({
                        products: get().products?.map((product) =>
                            product.product_id === productId
                                ? updatedProduct
                                : product
                        ),
                        isLoading: false,
                    });
                } catch (error) {
                    console.error('[Zustand] Error updating product:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to update product!',
                        isLoading: false,
                    });
                }
            },

            // Delete a product
            removeProduct: async (productId: string) => {
                set({ isLoading: true, error: null });
                try {
                    await deleteProduct(productId);
                    console.log('[Zustand] Product deleted');
                    set({
                        products: get().products?.filter(
                            (product) => product.product_id !== productId // Correct field (product_id) based on your schema
                        ),
                        isLoading: false,
                    });
                } catch (error) {
                    console.error('[Zustand] Error deleting product:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to delete product!',
                        isLoading: false,
                    });
                }
            },

            // Clear cache
            clearCache: () => {
                set({ products: null, selectedProduct: null });
            },
        }),
        {
            name: 'product-storage', // Persist store data to local storage
            storage: localStorageWrapper, // Use localStorage for persistence
        }
    )
);

export default productStore;
