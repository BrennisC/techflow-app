import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { CATEGORIES } from '../types/product';
import ProductGrid from './ProductGrid';

const laptopCategory = CATEGORIES.find(c => c.id === 'laptops')!;

const LaptopList: React.FC = () => {
    const { filteredProducts, loading, error, refetch, searchTerm } = useProducts(laptopCategory);

    return (
        <ProductGrid
            title={laptopCategory.title}
            description={laptopCategory.description}
            icon={laptopCategory.icon}
            products={filteredProducts}
            loading={loading}
            error={error}
            searchTerm={searchTerm}
            onRetry={refetch}
        />
    );
};

export default LaptopList;
