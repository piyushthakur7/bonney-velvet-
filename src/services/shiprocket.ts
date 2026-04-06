/**
 * Shiprocket Service (Basic Integration)
 * Note: You need a Shiprocket account and API credentials to use this.
 */

const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external';

/**
 * Authenticates with Shiprocket to get an access token.
 * 
 * @param email Shiprocket account email
 * @param password Shiprocket account password
 * @returns JWT Access Token or null
 */
export const getShiprocketToken = async (email: string, password: string): Promise<string | null> => {
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
 * Creates a shipment on Shiprocket.
 * This is a placeholder for the actual payload required by Shiprocket.
 * 
 * @param token Access Token
 * @param orderData Order and shipping details
 * @returns Shiprocket order ID or null
 */
export const createShiprocketOrder = async (token: string, orderData: any): Promise<any> => {
  try {
    const response = await fetch(`${SHIPROCKET_API_URL}/orders/create/adhoc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) throw new Error('Shiprocket Order Creation Failed');
    
    return await response.json();
  } catch (error) {
    console.error('Shiprocket Error:', error);
    return null;
  }
};
