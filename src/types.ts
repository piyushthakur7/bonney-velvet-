/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'Serums' | 'Sunscreens' | 'Moisturizers' | 'Masks';
  concern: ('Acne' | 'Dryness' | 'Glow' | 'Repair' | 'Anti-Aging')[];
  image: string;
  images: string[];
  description: string;
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  results: string;
  stock: number;
  badge?: string;
  variants?: { label: string; value: string }[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: string;
}
