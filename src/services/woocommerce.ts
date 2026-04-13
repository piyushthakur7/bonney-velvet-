import { Product, CartItem } from '../types';

// Configuration for WooCommerce integration
// Set these values in your .env file
const WC_API_URL = (import.meta.env.VITE_WC_API_URL || 'https://your-wordpress-site.com/wp-json/wc/v3').replace(/\/$/, '');
const WC_CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET || '';

/**
 * Fetches product categories from WooCommerce REST API.
 * 
 * @returns Array of category names.
 */
export const fetchWooCommerceCategories = async (): Promise<string[]> => {
  if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    console.warn("WooCommerce credentials missing.");
    return [];
  }

  try {
    const url = new URL(`${WC_API_URL}/products/categories`);
    url.searchParams.append('consumer_key', WC_CONSUMER_KEY);
    url.searchParams.append('consumer_secret', WC_CONSUMER_SECRET);
    url.searchParams.append('per_page', '100');
    url.searchParams.append('hide_empty', 'true');

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`WooCommerce API Error: ${response.status}`);
    }

    const wcCategories = await response.json();
    return wcCategories.map((c: any) => c.name);
  } catch (error) {
    console.error('Error fetching categories from WooCommerce:', error);
    return [];
  }
};

/**
 * Fetches products from WooCommerce REST API.
 * 
 * @returns Array of products mapped to our frontend Product type.
 */
export const fetchWooCommerceProducts = async (): Promise<Product[]> => {
  if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    console.warn("WooCommerce credentials missing. Please define VITE_WC_API_URL, VITE_WC_CONSUMER_KEY and VITE_WC_CONSUMER_SECRET in .env.");
    return [];
  }

  try {
    const url = new URL(`${WC_API_URL}/products`);
    url.searchParams.append('consumer_key', WC_CONSUMER_KEY);
    url.searchParams.append('consumer_secret', WC_CONSUMER_SECRET);
    url.searchParams.append('per_page', '100'); // Fetch more products

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
      // Map attributes like 'concern', 'benefits', 'ingredients' if they exist
      concern: p.attributes?.find((a: any) => a.name.toLowerCase() === 'concern')?.options || [],
      image: p.images?.length > 0 ? p.images[0].src : 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600&h=800',
      images: p.images?.length > 0 ? p.images.map((img: any) => img.src) : ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600&h=800'],
      description: p.short_description?.replace(/<[^>]*>?/gm, '') || p.description?.replace(/<[^>]*>?/gm, ''),
      benefits: p.attributes?.find((a: any) => a.name.toLowerCase() === 'benefits')?.options || [],
      ingredients: p.attributes?.find((a: any) => a.name.toLowerCase() === 'ingredients')?.options || [],
      howToUse: p.attributes?.find((a: any) => a.name.toLowerCase() === 'how to use')?.options?.[0] || 'Apply as directed.',
      results: p.attributes?.find((a: any) => a.name.toLowerCase() === 'results')?.options?.[0] || 'Visible glow.',
      stock: p.stock_quantity || 100,
    }));
  } catch (error) {
    console.error('Error fetching products from WooCommerce:', error);
    return [];
  }
};

/**
 * Creates an order in WooCommerce after successful payment.
 * 
 * @param cart Items in the cart
 * @param customerDetails Billing and shipping details
 * @param total Total amount paid
 * @param paymentId Razorpay payment ID
 * @returns The created order object or null
 */
export const createWooCommerceOrder = async (
  cart: CartItem[], 
  customerDetails: any, 
  total: number, 
  paymentId: string
): Promise<any> => {
  if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
    console.warn("WooCommerce credentials missing. Cannot sync order.");
    return null;
  }

  try {
    const lineItems = cart.map(item => ({
      product_id: parseInt(item.id),
      quantity: item.quantity,
    }));

    const orderData = {
      payment_method: 'razorpay',
      payment_method_title: 'Razorpay',
      set_paid: true,
      billing: {
        first_name: customerDetails.name.split(' ')[0] || '',
        last_name: customerDetails.name.split(' ').slice(1).join(' ') || '',
        address_1: customerDetails.address,
        city: customerDetails.city,
        postcode: customerDetails.pincode,
        country: 'IN',
        email: customerDetails.email,
        phone: customerDetails.phone,
      },
      shipping: {
        first_name: customerDetails.name.split(' ')[0] || '',
        last_name: customerDetails.name.split(' ').slice(1).join(' ') || '',
        address_1: customerDetails.address,
        city: customerDetails.city,
        postcode: customerDetails.pincode,
        country: 'IN',
      },
      line_items: lineItems,
      customer_note: `Razorpay Payment ID: ${paymentId}`,
    };

    const url = new URL(`${WC_API_URL}/orders`);
    url.searchParams.append('consumer_key', WC_CONSUMER_KEY);
    url.searchParams.append('consumer_secret', WC_CONSUMER_SECRET);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`WooCommerce API Error: ${errorData.message || response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating order in WooCommerce:', error);
    return null;
  }
};

