/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  order_id?: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes?: Record<string, string>;
  theme: {
    color: string;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (amount: number, receipt: string) => {
  const response = await fetch('/api/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, receipt }),
  });

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    console.error('Non-JSON response from /api/create-order:', text.substring(0, 200));
    throw new Error('Server error: Payment API is not responding correctly. Please check Vercel environment variables (RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET).');
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to create order');
  }
  return data;
};

export const verifyRazorpayPayment = async (paymentData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {
  const response = await fetch('/api/verify-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
  });

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    console.error('Non-JSON response from /api/verify-payment:', text.substring(0, 200));
    throw new Error('Server error: Payment verification API is not responding correctly.');
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Payment verification failed');
  }
  return data;
};

export const openRazorpayCheckout = (options: RazorpayOptions) => {
  const rzp = new window.Razorpay(options);
  rzp.open();
};

