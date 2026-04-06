# Bonny Velvet - Client Handover Management Guide

This guide explains how to manage your new e-commerce store.

## 1. Managing Inventory (WordPress/WooCommerce)
Your website is synced with your WordPress store. To update products:
- **Add/Edit Products**: Log in to your WordPress dashboard and navigate to **Products**.
- **Images & Pricing**: Any changes made in WordPress (price, images, description) will automatically reflect on the website.
- **Stock**: The "In Stock" status is also pulled directly from WooCommerce.

## 2. Managing Orders
Orders are recorded in two places for maximum reliability:
1.  **WordPress Dashboard**: Go to **WooCommerce > Orders**. You will see the customer name, items purchased, and the Razorpay Payment ID.
2.  **Supabase Database**: A backup of all orders is stored in the cloud database for analytical purposes and user account history.

## 3. Managing Payments (Razorpay)
- **Refunds**: If you need to refund a customer, do so via the **Razorpay Dashboard**.
- **Settlements**: Razorpay will automatically settle payments to your bank account based on your settlement cycle.

## 4. Shipping & Delivery
- **Manual Booking**: Currently, you can manually book shipments using the customer details found in the WooCommerce order.
- **Shiprocket Ready**: The website is pre-configured to support **Shiprocket**. Once you provide your Shiprocket API keys, automated label generation can be enabled.

## 5. Security Checklist
> [!IMPORTANT]
> **Environment Variables**: Ensure your production environment (Vercel/Netlify) has the correct `RAZORPAY_KEY_SECRET` and `WC_CONSUMER_SECRET`.
> **SSL**: Always ensure the WordPress site has a valid SSL certificate (HTTPS) so the API can communicate securely.

---
*Developed with ❤️ for Bonny Velvet.*
