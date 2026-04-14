/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from './types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, variant?: string, quantity?: number) => void;
  removeFromCart: (productId: string, variant?: string) => void;
  updateQuantity: (productId: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  toast: { message: string; visible: boolean } | null;
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [toast, setToast] = useState<{ message: string; visible: boolean } | null>(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, variant?: string, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedVariant === variant);
      if (existing) {
        return prev.map(item =>
          (item.id === product.id && item.selectedVariant === variant) 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity, selectedVariant: variant }];
    });
    setToast({ message: `${product.name} added to bag`, visible: true });
    setTimeout(() => setToast(null), 3000);
  };

  const hideToast = () => setToast(null);
    
  const removeFromCart = (productId: string, variant?: string) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedVariant === variant)));
  };
    
  const updateQuantity = (productId: string, quantity: number, variant?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === productId && item.selectedVariant === variant ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 499 || subtotal === 0 ? 0 : 80;
  const total = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shippingFee,
        total,
        toast,
        hideToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
