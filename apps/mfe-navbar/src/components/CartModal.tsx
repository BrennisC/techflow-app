import React from 'react';
import { useCart } from '../hooks/useCart';
import './CartModal.css';

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
    const { items, totalPrice, updateQuantity, removeItem, clear } = useCart();

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="cart-modal-overlay" onClick={handleOverlayClick}>
            <div className="cart-modal">
                <div className="cart-header">
                    <h2>Carrito de Compras</h2>
                    <button className="close-button" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="cart-content">
                    {items.length === 0 ? (
                        <div className="empty-cart">
                            <svg
                                width="80"
                                height="80"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#9ca3af"
                                strokeWidth="1"
                                style={{ margin: '2rem auto' }}
                            >
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            <h3>Tu carrito está vacío</h3>
                            <p>Agrega algunos productos para empezar a comprar</p>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {items.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <div className="item-image">
                                            <img src={item.thumbnail} alt={item.title} />
                                        </div>

                                        <div className="item-details">
                                            <h4>{item.title}</h4>
                                            <p className="item-brand">{item.brand}</p>
                                            <p className="item-price">${item.price.toFixed(2)} c/u</p>
                                        </div>

                                        <div className="item-quantity">
                                            <button
                                                className="quantity-btn"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                -
                                            </button>
                                            <span className="quantity">{item.quantity}</span>
                                            <button
                                                className="quantity-btn"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className="item-total">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>

                                        <button
                                            className="remove-item"
                                            onClick={() => removeItem(item.id)}
                                            title="Eliminar producto"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-summary">
                                <div className="total-section">
                                    <div className="total-line">
                                        <span>Total:</span>
                                        <span className="total-amount">${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="cart-actions">
                                    <button className="clear-cart-btn" onClick={clear}>
                                        Vaciar Carrito
                                    </button>
                                    <button className="checkout-btn">
                                        Proceder al Pago
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartModal;