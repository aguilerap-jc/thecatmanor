import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - The Cat Manor',
  description: 'Terms of Service for The Cat Manor - Legal terms and conditions for using our website and purchasing our products.',
};

export default function TermsOfService() {
  return (
    <div className="bg-snow min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-soft p-8 md:p-12">
          <h1 className="font-display text-4xl md:text-5xl font-light text-deep-charcoal mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg text-ash space-y-8">
            <p className="text-lg text-charcoal">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="font-display text-2xl font-medium text-deep-charcoal mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using The Cat Manor website, you accept and agree to be bound by the 
                terms and provision of this agreement. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-deep-charcoal mb-4">
                2. Products and Services
              </h2>
              <p>
                The Cat Manor specializes in modern, modular cat furniture designed for contemporary living spaces. 
                All products are made to order with premium materials and craftsmanship.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Product descriptions and images are for illustration purposes</li>
                <li>Actual colors and finishes may vary slightly from photos</li>
                <li>Custom design consultations available upon request</li>
                <li>All furniture is designed specifically for cats and indoor use</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-deep-charcoal mb-4">
                3. Ordering and Payment
              </h2>
              <p>
                Orders are processed through our secure Shopify platform:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices are in USD unless otherwise specified</li>
                <li>Payment is required in full at time of order</li>
                <li>We accept major credit cards and PayPal</li>
                <li>Order confirmation will be sent via email</li>
                <li>We reserve the right to refuse any order</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-deep-charcoal mb-4">
                4. Shipping and Delivery
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processing time: 2-4 weeks for custom furniture</li>
                <li>Shipping costs calculated at checkout</li>
                <li>International shipping available to select countries</li>
                <li>Delivery timeframes are estimates and not guaranteed</li>
                <li>Risk of loss passes to customer upon delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-deep-charcoal mb-4">
                5. Returns and Refunds
              </h2>
              <div className="bg-terracotta/10 p-6 rounded-lg">
                <h3 className="font-semibold text-deep-charcoal mb-2">Return Policy:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>30-day return window from delivery date</li>
                  <li>Items must be in original condition</li>
                  <li>Custom orders are non-returnable unless defective</li>
                  <li>Customer responsible for return shipping costs</li>
                  <li>Refunds processed within 5-10 business days</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-deep-charcoal mb-4">
                6. Warranty
              </h2>
              <p>
                The Cat Manor provides a limited warranty against manufacturing defects:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>1-year warranty on structural components</li>
                <li>6-month warranty on hardware and finishes</li>
                <li>Normal wear and tear not covered</li>
                <li>Damage from misuse or pets not covered</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-deep-charcoal mb-4">
                7. Intellectual Property
              </h2>
              <p>
                All content on this website, including designs, images, text, and logos, 
                is the property of The Cat Manor and protected by copyright law.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-deep-charcoal mb-4">
                8. Limitation of Liability
              </h2>
              <p>
                The Cat Manor's liability is limited to the purchase price of the product. 
                We are not liable for indirect, incidental, or consequential damages.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-deep-charcoal mb-4">
                9. Contact Information
              </h2>
              <p>
                For questions about these Terms of Service:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4">
                <p><strong>The Cat Manor</strong></p>
                <p>Email: <a href="mailto:support@thecatmanor.com" className="text-terracotta hover:underline">support@thecatmanor.com</a></p>
                <p>Website: <a href="https://thecatmanor.com" className="text-terracotta hover:underline">thecatmanor.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
