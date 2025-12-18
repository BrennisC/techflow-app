import { useCallback, useState } from "react";

// Accedemos al store global a través de window
const getGlobalSearchStore = () => {
    if (typeof window !== "undefined" && window.globalSearchStore) {
        return window.globalSearchStore;
    }
    return null;
};

export const useSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Actualizar el store global
        const store = getGlobalSearchStore();
        if (store) {
            store.setSearchTerm(value);
        }
    }, []);

    const clearSearch = useCallback(() => {
        setSearchTerm("");
        const store = getGlobalSearchStore();
        if (store) {
            store.setSearchTerm("");
        }
    }, []);

    return {
        searchTerm,
        handleSearchChange,
        clearSearch,
    };
};

// Declaración de tipos para window
declare global {
    interface Window {
        globalSearchStore: {
            searchTerm: string;
            setSearchTerm: (term: string) => void;
            subscribe: (listener: (searchTerm: string) => void) => () => void;
            getSearchTerm: () => string;
        };
    }
}
