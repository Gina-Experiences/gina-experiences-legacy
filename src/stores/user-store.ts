import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { localStorageWrapper } from '@/stores';
import { getUserById, updateUser } from '@/lib/users';

interface UserStore {
    session: any | null;
    user: any | null;
    isAdmin: boolean;
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
            isAdmin: false,
            isLoading: false,
            error: null,

            setSession: (session) => set({ session }),

            fetchUser: async (userId: string) => {
                set({ isLoading: true, error: null });
                try {
                    const { user } = await getUserById(userId);
                    console.log('[Zustand] User fetched:', user);
                    set({
                        user,
                        isAdmin: user?.role === 'admin',
                        isLoading: false,
                    });
                    console.log(
                        '[Zustand] isAdmin set to:',
                        user?.role === 'admin'
                    );
                } catch (error) {
                    console.error('[Zustand] Error fetching user:', error);
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
                    if (!updatedUser) {
                        throw new Error('User update failed on the server.');
                    }
                    console.log('Updated User:', updatedUser);
                    set({ user: updatedUser, isLoading: false });
                } catch (error) {
                    console.error('Update User Error:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to update user!',
                        isLoading: false,
                    });
                }
            },

            clearCache: () => {
                localStorageWrapper.removeItem('user-storage'); // Clear local storage
                set({ session: null, user: null, isAdmin: false });
            },
        }),
        {
            name: 'user-storage',
            storage: localStorageWrapper,
        }
    )
);

export default userStore;
