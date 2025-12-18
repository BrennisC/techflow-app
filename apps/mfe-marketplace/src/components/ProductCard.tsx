import { Star, ShoppingCart } from 'lucide-react';
import React from 'react';
import { useCart } from '../hooks/useCart';
import { ApiProduct } from '../types/product';
import './ProductCard.css';

interface ProductCardProps {
    product: ApiProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addItem } = useCart();

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            brand: product.brand,
            category: product.category,
            description: product.description,
            stock: product.stock,
        });

        // Feedback visual
        const button = document.getElementById(`add-to-cart-${product.id}`);
        if (button) {
            const originalText = button.textContent;
            button.textContent = '¡Agregado!';
            button.classList.add('added');

            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('added');
            }, 1500);
        }
    };

    return (
        <div className="product-card">
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
                            <Star
                                key={i}
                                size={16}
                                className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                                fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"}
                                stroke={i < Math.floor(product.rating) ? "#fbbf24" : "#d1d5db"}
                            />
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
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="add-to-cart-button"
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
