import React, { useEffect, useMemo, useState } from 'react';
import "regenerator-runtime/runtime";
import { useCart } from '../hooks/useCart';
import { useSearch } from '../hooks/useSearch';
import { Product } from '../services/cartService';
import './ProductList.css';

interface ApiProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

const ProductList: React.FC = () => {
    const [laptops, setLaptops] = useState<ApiProduct[]>([]);
    const [smartphones, setSmartphones] = useState<ApiProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addItem } = useCart();
    const { searchTerm } = useSearch();

    // Filtrar productos basado en el término de búsqueda
    const filteredProducts = useMemo(() => {
        if (!searchTerm.trim()) {
            return laptops.concat(smartphones);
        }

        const lowerSearchTerm = searchTerm.toLowerCase();
        return laptops.filter((product) =>
            product.title.toLowerCase().includes(lowerSearchTerm) ||
            product.description.toLowerCase().includes(lowerSearchTerm) ||
            product.brand.toLowerCase().includes(lowerSearchTerm) ||
            product.category.toLowerCase().includes(lowerSearchTerm)
        );
    }, [laptops, smartphones, searchTerm]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://dummyjson.com/products/category/laptops');
            const response_smartphones = await fetch('https://dummyjson.com/products/category/smartphones');


            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            if (!response_smartphones.ok) {
                throw new Error('Failed to fetch smartphones');
            }

            const data = await response.json();
            const data_smartphones = await response_smartphones.json();
            console.log(data);
            if (!data.products) {
                throw new Error('No products found in response');
            }
            setLaptops(data.products || []);
            setSmartphones(data_smartphones.products || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (product: ApiProduct) => {
        const cartProduct: Product = {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            brand: product.brand,
            category: product.category,
            description: product.description,
            stock: product.stock,
        };

        addItem(cartProduct);

        // Show feedback
        const button = document.getElementById(`add-to-cart-${product.id}`);
        if (button) {
            const originalText = button.textContent;
            button.textContent = '¡Agregado!';
            button.style.backgroundColor = '#10b981';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 1500);
        }
    };

    if (loading) {
        return (
            <div className="product-list-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Cargando smartphones...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-list-container">
                <div className="error-message">
                    <h3>Error al cargar productos</h3>
                    <p>{error}</p>
                    <button onClick={fetchProducts} className="retry-button">
                        Intentar nuevamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="product-list-container">
            <div className="product-list-header">
                <h2>Laptops</h2>
                <p>Descubre los mejores laptops del mercado</p>
                {searchTerm && (
                    <p className="search-results-info">
                        {filteredProducts.length > 0
                            ? `Mostrando ${filteredProducts.length} resultado${filteredProducts.length !== 1 ? 's' : ''} para "${searchTerm}"`
                            : `No se encontraron resultados para "${searchTerm}"`
                        }
                    </p>
                )}
            </div>

            {filteredProducts.length === 0 && searchTerm ? (
                <div className="no-results">
                    <div className="no-results-icon">🔍</div>
                    <h3>No se encontraron productos</h3>
                    <p>Intenta con otros términos de búsqueda</p>
                </div>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-image-container">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="product-image"
                                    loading="lazy"
                                />
                                {product.discountPercentage > 0 && (
                                    <div className="discount-badge">
                                        -{Math.round(product.discountPercentage)}%
                                    </div>
                                )}
                            </div>

                            <div className="product-info">
                                <h3 className="product-title">{product.title}</h3>
                                <p className="product-brand">{product.brand}</p>
                                <p className="product-description">{product.description}</p>

                                <div className="product-rating">
                                    <div className="stars">
                                        {[...Array(5)].map((_, i) => (
                                            <span
                                                key={i}
                                                className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <span className="rating-text">({product.rating.toFixed(1)})</span>
                                </div>

                                <div className="product-price-container">
                                    {product.discountPercentage > 0 && (
                                        <span className="original-price">
                                            ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                        </span>
                                    )}
                                    <span className="current-price">${product.price.toFixed(2)}</span>
                                </div>

                                <div className="product-stock">
                                    {product.stock > 10 ? (
                                        <span className="stock-available">En stock</span>
                                    ) : product.stock > 0 ? (
                                        <span className="stock-low">Solo quedan {product.stock}</span>
                                    ) : (
                                        <span className="stock-out">Agotado</span>
                                    )}
                                </div>

                                <button
                                    id={`add-to-cart-${product.id}`}
                                    onClick={() => handleAddToCart(product)}
                                    disabled={product.stock === 0}
                                    className="add-to-cart-button"
                                >
                                    Agregar al carrito
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;