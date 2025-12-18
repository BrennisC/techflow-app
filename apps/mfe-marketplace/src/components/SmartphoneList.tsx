import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { CATEGORIES } from '../types/product';
import ProductGrid from './ProductGrid';

const smartphoneCategory = CATEGORIES.find(c => c.id === 'smartphones')!;

const SmartphoneList: React.FC = () => {
    const { filteredProducts, loading, error, refetch, searchTerm } = useProducts(smartphoneCategory);

    return (
        <ProductGrid
            title={smartphoneCategory.title}
            description={smartphoneCategory.description}
            icon={smartphoneCategory.icon}
            products={filteredProducts}
            loading={loading}
            error={error}
            searchTerm={searchTerm}
            onRetry={refetch}
        />
    );
};

export default SmartphoneList;
