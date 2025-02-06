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
        data: Partial<PackageUpdateData>
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
            updatePackage: async (
                packageId: string,
                data: PackageUpdateData
            ) => {
                set({ isLoading: true, error: null });
                try {
                    const { updatedPackage } = await updatePackage(
                        packageId,
                        data
                    );
                    console.log('[Zustand] Package updated:', updatedPackage);
                    set({
                        packages: set().packages?.map((pkg) =>
                            pkg.package_id === packageId ? updatedPackage : pkg
                        ),
                        isLoading: false,
                    });
                } catch (error) {
                    console.error('[Zustand] Error updating package:', error);
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
                    await deletePackage(packageId);
                    console.log('[Zustand] Package soft deleted');
                    set({
                        packages: set().packages?.filter(
                            (pkg) => pkg.package_id !== packageId
                        ),
                        isLoading: false,
                    });
                } catch (error) {
                    console.error('[Zustand] Error deleting package:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to delete package!',
                        isLoading: false,
                    });
                }
            },

            recoverPackage: async (packageId: string) => {
                set({ isLoading: true, error: null });
                try {
                    await recoverPackage(packageId);
                    console.log('[Zustand] Package recovered');
                    set({
                        packages: set().packages?.map((pkg) =>
                            pkg.package_id === packageId
                                ? { ...pkg, is_active: true }
                                : pkg
                        ),
                        isLoading: false,
                    });
                } catch (error) {
                    console.error('[Zustand] Error recovering package:', error);
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
