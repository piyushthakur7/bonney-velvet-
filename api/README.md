# Serverless Functions (API Layer)

This directory contains the core backend logic for the Bonny Velvet platform. These functions are designed to run on **Vercel Serverless** but are also emulated locally during development.

---

## 🛠️ Configuration vs. Local Emulation

- **Production (Vercel)**: Vercel automatically detects the `/api` directory and deploys each file as an independent endpoint.
- **Local (Vite)**: The `vite-api-plugin.ts` in the root directory intercepts internal calls and executes the logic found in these files using `tsx`.

---

## 📡 Endpoints

### 1. `POST /api/create-order`
Initiates a new transaction with Razorpay.
- **Input**: `{ amount: number, receipt: string }`
- **Logic**: Calls the Razorpay SDK to create an order object.
- **Security**: Requires `RAZORPAY_KEY_SECRET` in environment variables.

### 2. `POST /api/verify-payment`
Verifies the cryptographic signature from a client payment.
- **Input**: `{ razorpay_order_id, razorpay_payment_id, razorpay_signature }`
- **Output**: Returns status `success` if valid.
- **Security Check**: Performs HmacSHA256 signature verification.

---

## 🛡️ Mock Mode

To allow development without active Razorpay keys or in offline scenarios, the API layer supports **Mock Mode**:
- If the `RAZORPAY_KEY_SECRET` is missing OR the requested Order ID starts with `order_mock_`, the functions will automatically return a simulated success payload.
- This allows the frontend to proceed to the WooCommerce and Shiprocket synchronization steps without a "real" financial charge.

---
*Refer to the local `vite-api-plugin.ts` for technical implementation details on endpoint interception.*
