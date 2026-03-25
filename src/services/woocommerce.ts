import { Product } from '../types';

// Configuration for WooCommerce integration
// Set these values in your .env file
const WC_API_URL = import.meta.env.VITE_WC_API_URL || 'https://your-wordpress-site.com/wp-json/wc/v3';
const WC_CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET || '';

/**
 * Fetches products from WooCommerce REST API.
 * This function can be used to replace the hardcoded PRODUCTS array in constants.ts
 * 
 * Instructions:
 * 1. Add this hook to a high-level component to initialize your state:
 *    const [products, setProducts] = useState<Product[]>([]);
 *    useEffect(() => { fetchWooCommerceProducts().then(setProducts) }, []);
 * 2. Pass this state down directly or via Context/Redux.
 * 
 * @returns Array of products mapped to our frontend Product type.
 */
export const fetchWooCommerceProducts = async (): Promise<Product[]> => {
  if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    console.warn("WooCommerce credentials missing. Please define VITE_WC_CONSUMER_KEY and VITE_WC_CONSUMER_SECRET in .env.");
    return [];
  }

  try {
    const url = new URL(`${WC_API_URL}/products`);
    url.searchParams.append('consumer_key', WC_CONSUMER_KEY);
    url.searchParams.append('consumer_secret', WC_CONSUMER_SECRET);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`WooCommerce API Error: ${response.status}`);
    }

    const wcProducts = await response.json();

    // Map WooCommerce products to our internal Product type
    return wcProducts.map((p: any) => ({
      id: p.id.toString(),
      name: p.name,
      price: parseFloat(p.price || '0'),
      originalPrice: p.regular_price ? parseFloat(p.regular_price) : undefined,
      category: p.categories?.length > 0 ? p.categories[0].name : 'Uncategorized',
      // The below can be mapped from WooCommerce custom attributes or ACF fields
      concern: [], 
      image: p.images?.length > 0 ? p.images[0].src : 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600&h=800',
      description: p.short_description?.replace(/<[^>]*>?/gm, '') || p.description?.replace(/<[^>]*>?/gm, ''),
      benefits: [], 
      ingredients: [], 
      howToUse: 'Apply as directed.',
      results: 'Visible glow.',
      stock: p.stock_quantity || 100,
    }));
  } catch (error) {
    console.error('Error fetching products from WooCommerce:', error);
    return [];
  }
};
