// Global Search Store para comunicación entre microfrontends
// Este store permite que el navbar comunique el término de búsqueda al marketplace

type SearchListener = (searchTerm: string) => void;

interface SearchStore {
    searchTerm: string;
    listeners: Set<SearchListener>;
    setSearchTerm: (term: string) => void;
    subscribe: (listener: SearchListener) => () => void;
    getSearchTerm: () => string;
}

const createSearchStore = (): SearchStore => {
    let searchTerm = "";
    const listeners = new Set<SearchListener>();

    const notifyListeners = () => {
        listeners.forEach((listener) => listener(searchTerm));
    };

    return {
        searchTerm,
        listeners,
        setSearchTerm: (term: string) => {
            searchTerm = term;
            notifyListeners();
        },
        subscribe: (listener: SearchListener) => {
            listeners.add(listener);
            // Retorna función para desuscribirse
            return () => {
                listeners.delete(listener);
            };
        },
        getSearchTerm: () => searchTerm,
    };
};

// Singleton global
const globalSearchStore = createSearchStore();

// Exponerlo en window para que los microfrontends puedan accederlo
declare global {
    interface Window {
        globalSearchStore: SearchStore;
    }
}

if (typeof window !== "undefined") {
    window.globalSearchStore = globalSearchStore;
}

export { globalSearchStore };
export type { SearchListener, SearchStore };

