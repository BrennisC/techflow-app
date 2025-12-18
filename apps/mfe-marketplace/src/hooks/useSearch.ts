import { useEffect, useState } from "react";

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

// Accedemos al store global a través de window
const getGlobalSearchStore = () => {
    if (typeof window !== "undefined" && window.globalSearchStore) {
        return window.globalSearchStore;
    }
    return null;
};

export const useSearch = () => {
    const [searchTerm, setSearchTerm] = useState(() => {
        const store = getGlobalSearchStore();
        return store ? store.getSearchTerm() : "";
    });

    useEffect(() => {
        const store = getGlobalSearchStore();
        if (!store) return;

        // Suscribirse a cambios en el store
        const unsubscribe = store.subscribe((newSearchTerm: string) => {
            setSearchTerm(newSearchTerm);
        });

        // Sincronizar el estado inicial
        setSearchTerm(store.getSearchTerm());

        return () => {
            unsubscribe();
        };
    }, []);

    return {
        searchTerm,
    };
};
