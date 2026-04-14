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
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, receipt }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response from /api/create-order:', text.substring(0, 200));
      throw new Error('Server error: Payment API is not responding correctly.');
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create order');
    }
    return data;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error('Connection timed out. Please check your internet and try again.');
    }
    throw err;
  }
};

export const verifyRazorpayPayment = async (paymentData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

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
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error('Verification timed out. Your order may still be processing; please check your account in a moment.');
    }
    throw err;
  }
};

export const openRazorpayCheckout = (options: RazorpayOptions) => {
  // --- MOCK MODE HANDLER ---
  if (options.order_id?.startsWith('order_mock_')) {
    console.warn('MOCK MODE: Simulating Razorpay success...');
    setTimeout(() => {
      options.handler({
        razorpay_order_id: options.order_id,
        razorpay_payment_id: `pay_mock_${Math.random().toString(36).substring(7)}`,
        razorpay_signature: 'mock_signature'
      });
    }, 1500);
    return;
  }

  if (typeof window.Razorpay === 'undefined') {
    console.error('Razorpay SDK not loaded');
    return;
  }

  const rzp = new window.Razorpay(options);
  rzp.open();
};

