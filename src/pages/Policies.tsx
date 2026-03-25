/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const PolicyPage = ({ title, content }: { title: string; content: React.ReactNode }) => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
    <h1 className="text-4xl font-bold text-brand tracking-tight">{title}</h1>
    <div className="prose prose-zinc max-w-none text-zinc-600 space-y-8 leading-relaxed">
      {content}
    </div>
  </div>
);

export const PrivacyPolicy = () => (
  <PolicyPage 
    title="Privacy Policy" 
    content={
      <>
        <p>At Bonny Velvet, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.</p>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">1. Information Collection</h2>
          <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact our support team.</p>
        </section>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">2. Use of Information</h2>
          <p>We use your information to process orders, improve our products, and communicate with you about offers and updates.</p>
        </section>
      </>
    } 
  />
);

export const Terms = () => (
  <PolicyPage 
    title="Terms & Conditions" 
    content={
      <>
        <p>By using our website, you agree to comply with these terms and conditions.</p>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">1. Product Usage</h2>
          <p>Our products are for external use only. Please perform a patch test before full application.</p>
        </section>
      </>
    } 
  />
);

export const RefundPolicy = () => (
  <PolicyPage 
    title="Refund & Return Policy" 
    content={
      <>
        <p>We want you to be completely satisfied with your purchase.</p>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">1. Returns</h2>
          <p>Due to the nature of skincare products, we only accept returns for damaged or incorrect items within 7 days of delivery.</p>
        </section>
      </>
    } 
  />
);

export const ShippingPolicy = () => (
  <PolicyPage 
    title="Shipping Policy" 
    content={
      <>
        <p>We deliver PAN India.</p>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">1. Shipping Charges</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Free shipping on orders above ₹499.</li>
            <li>₹80 shipping fee for orders below ₹499.</li>
          </ul>
        </section>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">2. Delivery Time</h2>
          <p>Orders are typically processed within 24-48 hours and delivered within 3-7 business days.</p>
        </section>
      </>
    } 
  />
);
