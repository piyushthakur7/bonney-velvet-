/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from './types';
import { fetchWooCommerceProducts, fetchWooCommerceCategories } from './services/woocommerce';
import { FALLBACK_PRODUCTS } from './data/fallbackData';

interface DataContextType {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  usingFallback: boolean;
}

const CACHE_KEY_PRODUCTS = 'bv_cached_products';
const CACHE_KEY_CATEGORIES = 'bv_cached_categories';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    // 1. Initial Hydration from Cache
    const cachedProducts = localStorage.getItem(CACHE_KEY_PRODUCTS);
    const cachedCategories = localStorage.getItem(CACHE_KEY_CATEGORIES);

    if (cachedProducts) {
      setProducts(JSON.parse(cachedProducts));
      setLoading(false); // Stop loading early if we have cache
    }
    if (cachedCategories) {
      setCategories(JSON.parse(cachedCategories));
    }

    const loadData = async () => {
      try {
        setError(null);
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          fetchWooCommerceProducts(),
          fetchWooCommerceCategories()
        ]);

        if (fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
          setUsingFallback(false);
          localStorage.setItem(CACHE_KEY_PRODUCTS, JSON.stringify(fetchedProducts));
        } else if (!cachedProducts) {
          // No cache and no API data? Use internal fallback
          setProducts(FALLBACK_PRODUCTS);
          setUsingFallback(true);
        }

        if (fetchedCategories.length > 0) {
          setCategories(fetchedCategories);
          localStorage.setItem(CACHE_KEY_CATEGORIES, JSON.stringify(fetchedCategories));
        }

      } catch (err) {
        console.error("DEBUG: Failed to fetch data from WooCommerce:", err);
        setError(`Connection issue. Showing offline data.`);
        
        if (!cachedProducts) {
          setProducts(FALLBACK_PRODUCTS);
          setUsingFallback(true);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <DataContext.Provider value={{ products, categories, loading, error, usingFallback }}>
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
