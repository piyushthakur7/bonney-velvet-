/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

export const BRAND_COLOR = '#400c2c';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Glow Boost Vitamin C Serum',
    price: 599,
    originalPrice: 799,
    category: 'Serums',
    concern: ['Glow', 'Repair'],
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600&h=800',
    description: 'A potent Vitamin C serum that brightens skin tone and reduces dark spots.',
    benefits: ['Brightens skin', 'Reduces pigmentation', 'Boosts collagen'],
    ingredients: ['Vitamin C', 'Hyaluronic Acid', 'Ferulic Acid'],
    howToUse: 'Apply 2-3 drops on clean face before moisturizing.',
    results: 'Visible glow in 2 weeks.',
    stock: 100,
  },
  {
    id: '2',
    name: 'Hydra-Dew Moisturizer',
    price: 449,
    originalPrice: 549,
    category: 'Moisturizers',
    concern: ['Dryness', 'Repair'],
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600&h=800',
    description: 'Lightweight gel-cream that provides 72-hour hydration.',
    benefits: ['Deep hydration', 'Non-greasy', 'Strengthens skin barrier'],
    ingredients: ['Ceramides', 'Squalane', 'Glycerin'],
    howToUse: 'Massage onto face and neck morning and night.',
    results: 'Plump, hydrated skin instantly.',
    stock: 100,
  },
  {
    id: '3',
    name: 'Invisible Sunscreen SPF 50',
    price: 499,
    originalPrice: 599,
    category: 'Sunscreens',
    concern: ['Repair'],
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600&h=800',
    description: 'Ultra-lightweight, zero white cast sunscreen for all skin types.',
    benefits: ['Broad spectrum protection', 'No white cast', 'Sweat resistant'],
    ingredients: ['Zinc Oxide', 'Niacinamide', 'Aloe Vera'],
    howToUse: 'Apply generously 15 minutes before sun exposure.',
    results: 'Protected, matte finish skin.',
    stock: 100,
  },
  {
    id: '4',
    name: 'Retinol Night Repair Serum',
    price: 699,
    originalPrice: 899,
    category: 'Serums',
    concern: ['Anti-Aging', 'Repair'],
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600&h=800',
    description: 'Advanced retinol formula to target fine lines and uneven texture.',
    benefits: ['Reduces fine lines', 'Improves texture', 'Evens skin tone'],
    ingredients: ['Retinol', 'Peptides', 'Bakuchiol'],
    howToUse: 'Apply at night only. Start twice a week.',
    results: 'Smoother, younger-looking skin in 4 weeks.',
    stock: 100,
  },
  {
    id: '5',
    name: 'Clear Skin Salicylic Acid Serum',
    price: 549,
    originalPrice: 649,
    category: 'Serums',
    concern: ['Acne'],
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600&h=800',
    description: 'Exfoliating serum that clears pores and prevents breakouts.',
    benefits: ['Unclogs pores', 'Reduces acne', 'Controls oil'],
    ingredients: ['Salicylic Acid', 'Tea Tree Oil', 'Witch Hazel'],
    howToUse: 'Apply to affected areas or all over face.',
    results: 'Clearer skin in 7 days.',
    stock: 100,
  }
];

export const CATEGORIES = ['Serums', 'Sunscreens', 'Moisturizers'] as const;
export const CONCERNS = ['Acne', 'Dryness', 'Glow', 'Repair', 'Anti-Aging'] as const;
