import { useEffect, useMemo, useState } from 'react';
import "regenerator-runtime/runtime";
import { ApiProduct, CategoryConfig } from '../types/product';
import { useSearch } from './useSearch';

interface UseProductsResult {
    products: ApiProduct[];
    filteredProducts: ApiProduct[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
    searchTerm: string;
}

// Hook genérico para obtener productos de cualquier categoría
export const useProducts = (category: CategoryConfig): UseProductsResult => {
    const [products, setProducts] = useState<ApiProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { searchTerm } = useSearch();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(category.endpoint);

            if (!response.ok) {
                throw new Error(`Error al cargar ${category.title}`);
            }

            const data = await response.json();

            if (!data.products) {
                throw new Error('No se encontraron productos');
            }

            setProducts(data.products);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocurrió un error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [category.endpoint]);

    // Filtrar productos basado en el término de búsqueda
    const filteredProducts = useMemo(() => {
        if (!searchTerm.trim()) {
            return products;
        }

        const lowerSearchTerm = searchTerm.toLowerCase();
        return products.filter((product) =>
            product.title.toLowerCase().includes(lowerSearchTerm) ||
            product.description.toLowerCase().includes(lowerSearchTerm) ||
            product.brand.toLowerCase().includes(lowerSearchTerm) ||
            product.category.toLowerCase().includes(lowerSearchTerm)
        );
    }, [products, searchTerm]);

    return {
        products,
        filteredProducts,
        loading,
        error,
        refetch: fetchProducts,
        searchTerm
    };
};

// Hook para obtener múltiples categorías
export const useAllProducts = (categories: CategoryConfig[]) => {
    const [allProducts, setAllProducts] = useState<Record<string, ApiProduct[]>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { searchTerm } = useSearch();

    const fetchAllProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const responses = await Promise.all(
                categories.map(cat =>
                    fetch(cat.endpoint).then(res => res.json())
                )
            );

            const productsMap: Record<string, ApiProduct[]> = {};
            categories.forEach((cat, index) => {
                productsMap[cat.id] = responses[index].products || [];
            });

            setAllProducts(productsMap);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocurrió un error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    // Combinar y filtrar todos los productos
    const combinedProducts = useMemo(() => {
        return Object.values(allProducts).flat();
    }, [allProducts]);

    const filteredProducts = useMemo(() => {
        if (!searchTerm.trim()) {
            return combinedProducts;
        }

        const lowerSearchTerm = searchTerm.toLowerCase();
        return combinedProducts.filter((product) =>
            product.title.toLowerCase().includes(lowerSearchTerm) ||
            product.description.toLowerCase().includes(lowerSearchTerm) ||
            product.brand.toLowerCase().includes(lowerSearchTerm) ||
            product.category.toLowerCase().includes(lowerSearchTerm)
        );
    }, [combinedProducts, searchTerm]);

    return {
        allProducts,
        combinedProducts,
        filteredProducts,
        loading,
        error,
        refetch: fetchAllProducts,
        searchTerm
    };
};
