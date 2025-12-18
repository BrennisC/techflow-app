import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { useAllProducts } from '../hooks/useProducts';
import { CATEGORIES, ProductCategory } from '../types/product';
import LaptopList from './LaptopList';
import './Marketplace.css';
import ProductGrid from './ProductGrid';
import SmartphoneList from './SmartphoneList';
import TablesList from './TablesList';

type ViewMode = 'all' | ProductCategory;

const Marketplace: React.FC = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('all');
    const { filteredProducts, loading, error, refetch, searchTerm } = useAllProducts(CATEGORIES);

    // Si hay un término de búsqueda, mostramos todos los productos filtrados
    const isSearching = searchTerm.trim().length > 0;

    return (
        <div className="marketplace-container">
            <header className="marketplace-header">
                <h1>TechFlow Market</h1>
                <p>Descubre lo último en tecnología con nuestras mejores ofertas</p>
            </header>

            {!isSearching && (
                <div className="category-tabs">
                    <button
                        className={`category-tab ${viewMode === 'all' ? 'active' : ''}`}
                        onClick={() => setViewMode('all')}
                    >
                        Todo
                    </button>
                    {CATEGORIES.map((category) => (
                        <button
                            key={category.id}
                            className={`category-tab ${viewMode === category.id ? 'active' : ''}`}
                            onClick={() => setViewMode(category.id)}
                        >
                            {category.icon}
                            {category.title}
                        </button>
                    ))}
                </div>
            )}

            {/* Contenido principal */}
            <main className="marketplace-content">
                {isSearching ? (
                    // Vista de búsqueda: muestra todos los productos filtrados
                    <ProductGrid
                        title="Resultados de búsqueda"
                        description={`Buscando: "${searchTerm}"`}
                        icon={<Search size={28} />}
                        products={filteredProducts}
                        loading={loading}
                        error={error}
                        searchTerm={searchTerm}
                        onRetry={refetch}
                    />
                ) : viewMode === 'all' ? (
                    // Vista "Todos": muestra cada categoría por separado
                    <>
                        <LaptopList />
                        <SmartphoneList />
                    </>
                ) : viewMode === 'laptops' ? (
                    <LaptopList />
                ) : viewMode === 'smartphones' ? (
                    <SmartphoneList />
                ) : viewMode === 'tablets' ? (
                    <TablesList />
                ) : null}
            </main>
        </div>
    );
};

export default Marketplace;
