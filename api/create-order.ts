import type { VercelRequest, VercelResponse } from '@vercel/node';
import Razorpay from 'razorpay';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, currency = 'INR', receipt } = req.body;

  if (!amount) {
    return res.status(400).json({ error: 'Amount is required' });
  }

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || '',
  });

  const options = {
    amount: Math.round(amount * 100), // convert to paise
    currency,
    receipt,
  };

  try {
    const order = await instance.orders.create(options);
    return res.status(200).json(order);
  } catch (error) {
    console.error('Razorpay Error:', error);
    return res.status(500).json({ error: 'Failed to create order' });
  }
}
