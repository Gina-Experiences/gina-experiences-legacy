import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    getAllPackages,
    getPackage,
    createPackage,
    updatePackage,
    deletePackage,
    recoverPackage,
} from '@/lib/packages';
import { localStorageWrapper } from '@/stores';

interface PackageStore {
    packages: any[] | null;
    selectedPackage: any | null;
    isLoading: boolean;
    error: string | null;

    fetchAllPackages: () => Promise<void>;
    fetchPackage: (packageId: string) => Promise<void>;
    addPackage: (
        productId: string,
        packageName: string,
        highlights: string,
        whatToExpect: string,
        bestTimeToVisit: string,
        durationNumber: number,
        durationUnit: 'H' | 'D',
        faqs: string,
        packagePrice: number,
        image_link: string
    ) => Promise<void>;
    updatePackage: (
        packageId: string,
        data: {
            product_id?: string;
            package_name?: string;
            highlights?: string;
            what_to_expect?: string;
            best_time_to_visit?: string;
            duration_number?: number;
            duration_unit?: 'H' | 'D';
            faqs?: string;
            package_price?: number;
            image_link?: string;
            is_active?: boolean;
        }
    ) => Promise<void>;
    removePackage: (packageId: string) => Promise<void>;
    recoverPackage: (packageId: string) => Promise<void>;
    clearCache: () => void;
}

interface PackageUpdateData {
    product_id?: string;
    package_name?: string;
    highlights?: string;
    what_to_expect?: string;
    best_time_to_visit?: string;
    duration_number?: number;
    duration_unit?: 'H' | 'D';
    faqs?: string;
    package_price?: number;
    image_link?: string;
    is_active?: boolean;
}

const packageStore = create<PackageStore>()(
    persist(
        (set) => ({
            packages: null,
            selectedPackage: null,
            isLoading: false,
            error: null,

            // Fetch all active packages
            fetchAllPackages: async () => {
                set({ isLoading: true, error: null });
                try {
                    const { packages } = await getAllPackages();
                    console.log('[Zustand] Packages fetched:', packages);
                    set({ packages, isLoading: false });
                } catch (error) {
                    console.error('[Zustand] Error fetching packages:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch packages!',
                        isLoading: false,
                    });
                }
            },

            // Fetch a specific package by ID
            fetchPackage: async (packageId: string) => {
                set({ isLoading: true, error: null });
                try {
                    const { package: packageData } =
                        await getPackage(packageId);
                    console.log('[Zustand] Package fetched:', packageData);
                    set({ selectedPackage: packageData, isLoading: false });
                } catch (error) {
                    console.error('[Zustand] Error fetching package:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch package!',
                        isLoading: false,
                    });
                }
            },

            // Create a new package
            addPackage: async (
                productId: string,
                packageName: string,
                highlights: string,
                whatToExpect: string,
                bestTimeToVisit: string,
                durationNumber: number,
                durationUnit: 'H' | 'D',
                faqs: string,
                packagePrice: number,
                image_link: string
            ) => {
                set({ isLoading: true, error: null });
                try {
                    const { newPackage } = await createPackage({
                        product_id: productId,
                        package_name: packageName,
                        highlights: highlights,
                        what_to_expect: whatToExpect,
                        best_time_to_visit: bestTimeToVisit,
                        duration_number: durationNumber,
                        duration_unit: durationUnit,
                        faqs: faqs,
                        package_price: packagePrice,
                        image_link: image_link,
                    });
                    console.log('[Zustand] Package created:', newPackage);
                    set((state) => ({
                        packages: [...(state.packages || []), newPackage],
                        isLoading: false,
                    }));
                } catch (error) {
                    console.error('[Zustand] Error creating package:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to create package!',
                        isLoading: false,
                    });
                }
            },

            // Update package details
            updatePackage: async (packageId, data) => {
                set({ isLoading: true, error: null });
                try {
                    const { updatedPackage } = await updatePackage(
                        packageId,
                        data
                    );
                    if (!updatedPackage) {
                        throw new Error('Package update failed on the server.');
                    }
                    console.log('Updated Package:', updatedPackage);
                    set({
                        selectedPackage: updatedPackage,
                        isLoading: false,
                    });
                } catch (error) {
                    console.error('Update Package Error:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to update package!',
                        isLoading: false,
                    });
                }
            },

            // Soft delete package (deactivate)
            removePackage: async (packageId: string) => {
                set({ isLoading: true, error: null });
                try {
                    const { message, package: packageData } =
                        await deletePackage(packageId);
                    console.log(message, packageData);
                    set({ selectedPackage: packageData, isLoading: false });
                } catch (error) {
                    console.error('[Zustand] Remove Package Error:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to remove package!',
                        isLoading: false,
                    });
                }
            },

            recoverPackage: async (packageId: string) => {
                set({ isLoading: true, error: null });
                try {
                    const { message, package: packageData } =
                        await recoverPackage(packageId);
                    console.log(message, packageData);
                    set({ selectedPackage: packageData, isLoading: false });
                } catch (error) {
                    console.error('[Zustand] Recover Package Error:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to recover package!',
                        isLoading: false,
                    });
                }
            },

            // Clear cache
            clearCache: () => {
                set({ packages: null, selectedPackage: null });
            },
        }),
        {
            name: 'package-storage', // Persist store data to local storage
            storage: localStorageWrapper, // Use localStorage for persistence
        }
    )
);

export default packageStore;
