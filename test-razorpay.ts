import Razorpay from 'razorpay';
import 'dotenv/config';

async function test() {
  const key_id = (process.env.VITE_RAZORPAY_KEY_ID || '').trim();
  const key_secret = (process.env.RAZORPAY_KEY_SECRET || process.env.VITE_RAZORPAY_KEY_SECRET || '').trim();

  console.log('Testing with:');
  console.log('Key ID:', key_id);
  console.log('Secret (length):', key_secret.length);

  const instance = new Razorpay({
    key_id: key_id,
    key_secret: key_secret,
  });

  try {
    const order = await instance.orders.create({
      amount: 100,
      currency: 'INR',
      receipt: 'test_receipt',
    });
    console.log('Success!', order.id);
  } catch (err: any) {
    console.error('Failed:', err);
  }
}

test();
