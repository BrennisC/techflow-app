import { useProducts } from '../hooks/useProducts';
import { CATEGORIES } from '../types/product';
import ProductGrid from './ProductGrid';

const tabletCategory = CATEGORIES.find(c => c.id === 'tablets')!;


export default function TablesList() {
    console.log(tabletCategory ? 'Found tablet category' : 'Tablet category not found');
    const { filteredProducts, loading, error, refetch, searchTerm } = useProducts(tabletCategory);
    console.log('TablesList rendered');
    return (
        <ProductGrid
            title={tabletCategory.title}
            description={tabletCategory.description}
            icon={tabletCategory.icon}
            products={filteredProducts}
            loading={loading}
            error={error}
            searchTerm={searchTerm}
            onRetry={refetch}
        />
    );
}