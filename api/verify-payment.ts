import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Incomplete payment data' });
  }

  // --- MOCK MODE VERIFICATION ---
  if (razorpay_order_id.startsWith('order_mock_')) {
    console.log('MOCK MODE: Verifying mock payment as success');
    return res.status(200).json({ status: 'success', message: 'MOCK: Payment verified successfully' });
  }

  const secret = process.env.RAZORPAY_KEY_SECRET || process.env.VITE_RAZORPAY_KEY_SECRET || '';
  const generated_signature = crypto
    .createHmac('sha256', secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    return res.status(200).json({ status: 'success', message: 'Payment verified successfully' });
  } else {
    return res.status(400).json({ status: 'failure', message: 'Invalid payment signature' });
  }
}
