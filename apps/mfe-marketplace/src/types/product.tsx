// Tipos compartidos para productos
import { AppWindow, Headphones, Laptop, Smartphone, Tablet, Watch } from 'lucide-react';
import React from 'react';

export interface ApiProduct {
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

export interface CartProduct {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    brand: string;
    category: string;
    description: string;
    stock: number;
}

export type ProductCategory = 'laptops' | 'smartphones' | 'tablets' | 'accessories' | 'wearables';

export interface CategoryConfig {
    id: ProductCategory;
    title: string;
    description: string;
    endpoint: string;
    icon: React.ReactNode;
}

// Configuración de categorías disponibles
export const CATEGORIES: CategoryConfig[] = [
    {
        id: 'laptops',
        title: 'Laptops',
        description: 'Descubre los mejores laptops del mercado',
        endpoint: 'https://dummyjson.com/products/category/laptops',
        icon: <Laptop size={24} />
    },
    {
        id: 'smartphones',
        title: 'Smartphones',
        description: 'Los smartphones más innovadores',
        endpoint: 'https://dummyjson.com/products/category/smartphones',
        icon: <Smartphone size={24} />
    },
    {
        id: 'tablets',
        title: 'Tablets',
        description: 'Tablets para trabajo y entretenimiento',
        endpoint: 'https://dummyjson.com/products/category/tablets',
        icon: <Tablet size={24} />
    }
];

