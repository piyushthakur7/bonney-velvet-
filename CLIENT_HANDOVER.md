# Bonny Velvet - Client Management Guide

This guide explains how to manage your new premium e-commerce store and fulfill the ritual of luxury skincare.

## 1. Managing Inventory (WordPress/WooCommerce)
Your website is live-synced with your WordPress store. 
- **Add/Edit Products**: Use the WordPress dashboard under **Products**.
- **Images & Pricing**: Changes to prices or images reflect instantly on the website.
- **Enrichment**: We use a custom "Product Enrichment" layer for details like "About this item" and "Specs" to maintain a premium look.

## 2. Fulfillment Flow
Orders are processed through a highly reliable multi-stage sync:
1.  **WooCommerce**: Recorded instantly in **WooCommerce > Orders**.
2.  **Shiprocket**: Automated order creation is **Active**. Shipments are queued in your Shiprocket dashboard for label generation.
3.  **Supabase Database**: A master record is kept in the cloud for user order history and analytics.

## 3. Payments (Razorpay)
- **Security**: All payments are secured via Razorpay. 
- **Verification**: The system uses a secure backend bridge to verify payment signatures before confirming orders.
- **Refunds**: Process refunds directly in your **Razorpay Dashboard**.

## 4. Brand Management
- **Hero Banner**: The homepage features a high-impact, premium visual section. To update this image, replace `public/images/hero-banner.png`.
- **Trust Elements**: We have integrated a **Brand Trust Bar** across the site to build customer confidence (Vegan, Cruelty-Free, etc.).

## 5. Deployment & Security
> [!IMPORTANT]
> **Environment Variables**: Ensure your production environment has the correct `RAZORPAY_KEY_SECRET`, `VITE_WC_CONSUMER_SECRET`, and `VITE_SHIPROCKET_PASSWORD`.
> **SSL**: The API communicates over HTTPS. Ensure your WordPress site has a valid SSL certificate.

---
*Developed with ❤️ for the Bonny Velvet Ritual.*
