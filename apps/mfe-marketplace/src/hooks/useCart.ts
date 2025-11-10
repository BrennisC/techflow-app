import { useEffect, useState } from 'react';
import cartService, { CartItem } from '../services/cartService';

export const useCart = () => {
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Initialize with current cart items
        setItems(cartService.getItems());

        // Subscribe to cart changes
        const unsubscribe = cartService.subscribe((newItems) => {
            setItems(newItems);
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);

    const totalItems = cartService.getTotalItems();
    const totalPrice = cartService.getTotalPrice();

    return {
        items,
        totalItems,
        totalPrice,
        addItem: cartService.addItem.bind(cartService),
        removeItem: cartService.removeItem.bind(cartService),
        updateQuantity: cartService.updateQuantity.bind(cartService),
        clear: cartService.clear.bind(cartService),
    };
};