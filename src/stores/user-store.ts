import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { localStorageWrapper } from '@/stores';
import { getUserById, updateUser } from '@/lib/users';

interface UserStore {
    session: any | null;
    user: any | null;
    isLoading: boolean;
    error: string | null;

    setSession: (session: any) => void;
    fetchUser: (userId: string) => Promise<void>;
    updateUser: (
        userId: string,
        data: {
            firstname?: string;
            lastname?: string;
            gender?: string;
            birthdate?: Date;
            phone?: string;
            address?: string;
        }
    ) => Promise<void>;
    clearCache: () => void;
}

const userStore = create<UserStore>()(
    persist(
        (set) => ({
            session: null,
            user: null,
            isLoading: false,
            error: null,

            setSession: (session) => set({ session }),

            fetchUser: async (userId: string) => {
                set({ isLoading: true, error: null });
                try {
                    const { user } = await getUserById(userId);
                    set({ user, isLoading: false });
                } catch (error) {
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch user!',
                        isLoading: false,
                    });
                }
            },

            updateUser: async (userId, data) => {
                set({ isLoading: true, error: null });
                try {
                    const { updatedUser } = await updateUser(userId, data);
                    set({ user: updatedUser, isLoading: false });
                } catch (error) {
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to update user!',
                        isLoading: false,
                    });
                }
            },

            clearCache: () => set({ session: null, user: null }),
        }),
        {
            name: 'user-storage',
            storage: localStorageWrapper,
        }
    )
);

export default userStore;
