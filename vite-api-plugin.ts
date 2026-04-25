import { Plugin } from 'vite';
import Razorpay from 'razorpay';
import crypto from 'crypto';

export function viteApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'vite-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const url = new URL(req.url, `http://${req.headers.host}`);
        
        // --- Handle POST /api/create-order ---
        if (url.pathname === '/api/create-order' && req.method === 'POST') {
          try {
            const body = await getBody(req);
            const { amount, currency = 'INR', receipt } = JSON.parse(body);

            if (!amount) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Amount is required' }));
            }

            const key_id = (env.VITE_RAZORPAY_KEY_ID || '').trim();
            const key_secret = (env.RAZORPAY_KEY_SECRET || env.VITE_RAZORPAY_KEY_SECRET || '').trim();
            

            const instance = new Razorpay({
              key_id,
              key_secret,
            });

            const order = await instance.orders.create({
              amount: Math.round(amount * 100),
              currency,
              receipt,
            });

            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(order));
          } catch (error: any) {
            console.error('Local API Error (create-order):', error);
            
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            const errorMessage = error.error?.description || error.message || 'Failed to create Razorpay order';
            return res.end(JSON.stringify({ error: errorMessage }));
          }
        }

        // --- Handle POST /api/verify-payment ---
        if (url.pathname === '/api/verify-payment' && req.method === 'POST') {
          try {
            const body = await getBody(req);
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = JSON.parse(body);


            const env = server.config.env;
            const secret = env.RAZORPAY_KEY_SECRET || env.VITE_RAZORPAY_KEY_SECRET || '';
            const generated_signature = crypto
              .createHmac('sha256', secret)
              .update(`${razorpay_order_id}|${razorpay_payment_id}`)
              .digest('hex');

            if (generated_signature === razorpay_signature) {
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ status: 'success', message: 'Payment verified successfully' }));
            } else {
              res.statusCode = 400;
              return res.end(JSON.stringify({ status: 'failure', message: 'Invalid payment signature' }));
            }
          } catch (error: any) {
            console.error('Local API Error (verify-payment):', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: error.message || 'Payment verification failed' }));
          }
        }

        next();
      });
    },
  };
}

function getBody(req: any): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: any) => body += chunk);
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}
