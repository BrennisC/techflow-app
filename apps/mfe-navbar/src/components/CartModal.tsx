import React from 'react';
import { useCart } from '../hooks/useCart';
import './CartModal.css';
import { Minus, Plus, ShoppingBag, Trash2, X } from './Icons';

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
                    <button className="close-button" onClick={onClose} aria-label="Cerrar carrito">
                        <X size={24} />
                    </button>
                </div>

                <div className="cart-content">
                    {items.length === 0 ? (
                        <div className="empty-cart">
                            <ShoppingBag size={64} style={{ margin: '2rem auto', color: '#9ca3af' }} />
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
                                                aria-label="Disminuir cantidad"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="quantity">{item.quantity}</span>
                                            <button
                                                className="quantity-btn"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                aria-label="Aumentar cantidad"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>

                                        <div className="item-total">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>

                                        <button
                                            className="remove-item"
                                            onClick={() => removeItem(item.id)}
                                            title="Eliminar producto"
                                            aria-label="Eliminar producto"
                                        >
                                            <Trash2 size={20} />
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