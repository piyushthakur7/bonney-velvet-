import { CartItem } from '../types';

const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external';

/**
 * Authenticates with Shiprocket to get an access token.
 */
export const getShiprocketToken = async (): Promise<string | null> => {
  const email = import.meta.env.VITE_SHIPROCKET_EMAIL;
  const password = import.meta.env.VITE_SHIPROCKET_PASSWORD;

  if (!email || !password) {
    console.warn('Shiprocket credentials missing in environment.');
    return null;
  }

  try {
    const response = await fetch(`${SHIPROCKET_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error('Shiprocket Authentication Failed');
    
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Shiprocket Auth Error:', error);
    return null;
  }
};

/**
 * Syncs a successful store order to Shiprocket for fulfillment.
 * 
 * @param cart Items in the cart
 * @param customerDetails Billing/Shipping information
 * @param total Total amount paid
 * @returns Shiprocket API response or null
 */
export const syncOrderToShiprocket = async (
  cart: CartItem[], 
  customerDetails: any, 
  total: number
): Promise<any> => {
  try {
    const token = await getShiprocketToken();
    if (!token) return null;

    const orderItems = cart.map(item => ({
      name: item.name,
      sku: `BV-${item.id}`, // Custom SKU prefix
      units: item.quantity,
      selling_price: item.price,
      discount: 0,
      tax: 0,
      hsn: 3304 // Default HSN for skincare products
    }));

    // Shiprocket Adhoc Order Payload
    const shiprocketOrder = {
      order_id: `BV_${Date.now()}`,
      order_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      pickup_location: import.meta.env.VITE_SHIPROCKET_PICKUP_LOCATION || 'Primary',
      billing_customer_name: customerDetails.name.split(' ')[0] || 'Customer',
      billing_last_name: customerDetails.name.split(' ').slice(1).join(' ') || '',
      billing_address: customerDetails.address,
      billing_city: customerDetails.city,
      billing_pincode: customerDetails.pincode,
      billing_state: customerDetails.state || 'Maharashtra', // Default if missing
      billing_country: 'India',
      billing_email: customerDetails.email,
      billing_phone: customerDetails.phone,
      shipping_is_billing: true,
      order_items: orderItems,
      payment_method: 'Prepaid',
      shipping_charges: 0,
      total_discount: 0,
      sub_total: total,
      length: 10,  // Default dimensions
      width: 10,
      height: 10,
      weight: 0.2 // Default weight (0.2kg)
    };

    const response = await fetch(`${SHIPROCKET_API_URL}/orders/create/adhoc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(shiprocketOrder),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Shiprocket Order Creation Failed:', errorData);
      throw new Error(`Shiprocket API Error: ${errorData.message || response.status}`);
    }
    
    const result = await response.json();
    console.log('Shiprocket Sync Success:', result);
    return result;
  } catch (error) {
    console.error('Shiprocket Sync Error:', error);
    return null;
  }
};
