# Bonny Velvet – Premium Skin & Hair Rituals

A state-of-the-art e-commerce platform for **Bonny Velvet**, delivering affordable luxury skincare formulated for Indian skin. This project features a high-performance React frontend, live WooCommerce synchronization, and a robust 3-way logistics pipeline.

---

## ✨ Key Features
- **Premium Identity**: Immersive, glassmorphism-inspired UI with bespoke brand imagery and motion design.
- **Triple-Sync Fulfillment**: Orchestrated synchronization between WooCommerce (Orders), Shiprocket (Logistics), and Supabase (Backup & Accounts).
- **Secure Payments**: Signature-verified Razorpay integration with a local developer "Mock Mode" for safe testing.
- **Live Catalog**: Real-time product fetching and category management via the WooCommerce REST API.
- **Micro-interactions**: High-performance scrolling animations, page transitions, and toast notifications.

## 🛠️ Tech Stack
- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Motion (Framer)](https://motion.dev/)
- **Backend / DB**: [Supabase](https://supabase.com/), [Vercel Serverless Functions](https://vercel.com/docs/functions)
- **Storefront**: [WooCommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs/)
- **Logistics**: [Shiprocket API](https://www.shiprocket.in/api-docs/)
- **Payments**: [Razorpay SDK](https://razorpay.com/docs/payments/server-side/node/)

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18+)
- A `.env` file with necessary keys (see `TECHNICAL_DETAILS.md` for secret requirements)

### 2. Installation
```bash
npm install
```

### 3. Run Locally
```bash
npm run dev
```
*Note: The local server uses the `vite-api-plugin.ts` to simulate backend routes for secure order creation.*

## 📂 Project Structure
- `/src`: Frontend source code, including business logic and context providers.
- `/api`: Serverless functions for payment verification and manual order creation.
- `/public`: Static assets, including the premium brand hero banner.
- `vite-api-plugin.ts`: Middleware for local backend simulation during development.

## 📖 Extended Documentation
- **[Technical Architecture](TECHNICAL_DETAILS.md)**: Deep dive into the sync logic and infrastructure.
- **[Client Handover Guide](CLIENT_HANDOVER.md)**: Post-launch management for the store owner.

---
*Developed with ❤️ for Bonny Velvet.*
