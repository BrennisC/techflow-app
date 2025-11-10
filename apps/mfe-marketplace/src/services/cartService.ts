interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    brand: string;
    category: string;
    description: string;
    stock: number;
}

interface CartItem extends Product {
    quantity: number;
}

class CartService {
    private items: CartItem[] = [];
    private listeners: Array<(items: CartItem[]) => void> = [];

    addItem(product: Product): void {
        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }

        this.notifyListeners();
        this.saveToLocalStorage();
    }

    removeItem(productId: number): void {
        this.items = this.items.filter(item => item.id !== productId);
        this.notifyListeners();
        this.saveToLocalStorage();
    }

    updateQuantity(productId: number, quantity: number): void {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.notifyListeners();
                this.saveToLocalStorage();
            }
        }
    }

    getItems(): CartItem[] {
        return [...this.items];
    }

    getTotalItems(): number {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalPrice(): number {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    clear(): void {
        this.items = [];
        this.notifyListeners();
        this.saveToLocalStorage();
    }

    subscribe(listener: (items: CartItem[]) => void): () => void {
        this.listeners.push(listener);

        // Return unsubscribe function
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notifyListeners(): void {
        this.listeners.forEach(listener => listener(this.getItems()));
    }

    private saveToLocalStorage(): void {
        try {
            localStorage.setItem('techflow-cart', JSON.stringify(this.items));
        } catch (error) {
            console.warn('Failed to save cart to localStorage:', error);
        }
    }

    loadFromLocalStorage(): void {
        try {
            const saved = localStorage.getItem('techflow-cart');
            if (saved) {
                this.items = JSON.parse(saved);
                this.notifyListeners();
            }
        } catch (error) {
            console.warn('Failed to load cart from localStorage:', error);
            this.items = [];
        }
    }
}

// Make it globally available
declare global {
    interface Window {
        techflowCart?: CartService;
    }
}

// Use the global instance if it exists, otherwise create one
let cartService: CartService;

if (typeof window !== 'undefined' && window.techflowCart) {
    cartService = window.techflowCart;
} else {
    cartService = new CartService();
    cartService.loadFromLocalStorage();

    // Make it globally available
    if (typeof window !== 'undefined') {
        window.techflowCart = cartService;
    }
}

export default cartService;
export type { CartItem, Product };
