/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from './types';
import { fetchWooCommerceProducts, fetchWooCommerceCategories } from './services/woocommerce';
import { PRODUCTS as HARDCODED_PRODUCTS, CATEGORIES as HARDCODED_CATEGORIES } from './constants';

interface DataContextType {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          fetchWooCommerceProducts(),
          fetchWooCommerceCategories()
        ]);

        if (fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
        }

        if (fetchedCategories.length > 0) {
          setCategories(fetchedCategories);
        }
      } catch (err) {
        console.error("Failed to fetch data from WooCommerce:", err);
        setError("Failed to load products from store.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <DataContext.Provider value={{ products, categories, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
