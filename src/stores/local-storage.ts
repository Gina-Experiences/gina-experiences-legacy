import { PersistStorage } from 'zustand/middleware';

const localStorageWrapper: PersistStorage<any> = {
    getItem: (name) => {
        try {
            const storedValue = localStorage.getItem(name);
            return storedValue ? JSON.parse(storedValue) : null;
        } catch {
            return null; // Return null if JSON parsing fails
        }
    },
    setItem: (name, value) => {
        try {
            localStorage.setItem(name, JSON.stringify(value));
        } catch {
            // Optionally log an error for debugging purposes
            console.error(`Failed to set item ${name} in localStorage.`);
        }
    },
    removeItem: (name) => {
        try {
            localStorage.removeItem(name);
        } catch {
            console.error(`Failed to remove item ${name} from localStorage.`);
        }
    },
};

export default localStorageWrapper;
