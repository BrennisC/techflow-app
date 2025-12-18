import React from 'react';
import { ApiProduct } from '../types/product';
import ProductCard from './ProductCard';
import './ProductGrid.css';

interface ProductGridProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    products: ApiProduct[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    onRetry: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
    title,
    description,
    icon,
    products,
    loading,
    error,
    searchTerm,
    onRetry
}) => {
    if (loading) {
        return (
            <section className="product-section">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Cargando {title.toLowerCase()}...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="product-section">
                <div className="error-message">
                    <h3>Error al cargar {title.toLowerCase()}</h3>
                    <p>{error}</p>
                    <button onClick={onRetry} className="retry-button">
                        Intentar nuevamente
                    </button>
                </div>
            </section>
        );
    }

    const hasSearchTerm = searchTerm.trim().length > 0;
    const noResults = products.length === 0 && hasSearchTerm;

    return (
        <section className="product-section">
            <div className="product-section-header">
                <h2>
                    {icon && <span className="section-icon">{icon}</span>}
                    {title}
                </h2>
                <p>{description}</p>
                {hasSearchTerm && (
                    <p className="search-results-info">
                        {products.length > 0
                            ? `${products.length} resultado${products.length !== 1 ? 's' : ''} para "${searchTerm}"`
                            : `No se encontraron resultados para "${searchTerm}"`
                        }
                    </p>
                )}
            </div>

            {noResults ? (
                <div className="no-results">
                    <div className="no-results-icon">🔍</div>
                    <h3>No se encontraron productos</h3>
                    <p>Intenta con otros términos de búsqueda</p>
                </div>
            ) : (
                <div className="products-grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProductGrid;
