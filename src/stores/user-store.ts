import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { localStorageWrapper } from '@/stores';
import {
    getUserById,
    updateUser,
    changeUserRole,
    getAllActiveUsers,
    deactivateUser,
} from '@/lib/users';

interface UserStore {
    session: any | null;
    user: any | null;
    users: any[] | null;
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
    changeUserRole: (
        userId: string,
        newRole: 'admin' | 'customer'
    ) => Promise<void>;
    fetchAllUsers: () => Promise<void>;
    deactivateUser: (userId: string) => Promise<void>;
    clearCache: () => void;
}

const userStore = create<UserStore>()(
    persist(
        (set) => ({
            session: null,
            user: null,
            users: null,
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

            changeUserRole: async (
                userId: string,
                newRole: 'admin' | 'customer'
            ) => {
                set({ isLoading: true, error: null });
                try {
                    const { message, user } = await changeUserRole(
                        userId,
                        newRole
                    );
                    console.log(message, user);
                    set({ user, isLoading: false });
                } catch (error) {
                    console.error('[Zustand] Change User Role Error:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to change user role!',
                        isLoading: false,
                    });
                }
            },

            fetchAllUsers: async () => {
                set({ isLoading: true, error: null });
                try {
                    const { users } = await getAllActiveUsers();
                    console.log('[Zustand] All Active Users:', users);
                    set({ users, isLoading: false });
                } catch (error) {
                    console.error('[Zustand] Error fetching all users:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to fetch users!',
                        isLoading: false,
                    });
                }
            },

            deactivateUser: async (userId: string) => {
                set({ isLoading: true, error: null });
                try {
                    const { message, user } = await deactivateUser(userId);
                    console.log(message, user);
                    set({ user, isLoading: false });
                } catch (error) {
                    console.error('[Zustand] Deactivate User Error:', error);
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Failed to deactivate user!',
                        isLoading: false,
                    });
                }
            },

            clearCache: () => {
                localStorageWrapper.removeItem('user-storage');
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
