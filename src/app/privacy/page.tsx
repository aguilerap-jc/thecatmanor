import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - The Cat Manor',
  description: 'Privacy Policy for The Cat Manor - How we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-snow min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-soft p-8 md:p-12">
          <h1 className="font-display text-4xl md:text-5xl font-light text-deep-charcoal mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg text-ash space-y-8">
            <p className="text-lg text-charcoal">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="font-display text-2xl font-medium text-deep-charcoal mb-4">
                1. Information We Collect
              </h2>
              <p>
                At The Cat Manor, we collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Browse our website and product catalog</li>
                <li>Make a purchase through our Shopify integration</li>
                <li>Contact us for customer support or design consultations</li>
                <li>Subscribe to our newsletter or promotional emails</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-deep-charcoal mb-4">
                2. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send you order confirmations and shipping updates</li>
                <li>Improve our website and product offerings</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-deep-charcoal mb-4">
                3. Analytics and Tracking
              </h2>
              <p>
                We use analytics services to understand how visitors interact with our website:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Analytics:</strong> Tracks website usage, page views, and user behavior</li>
                <li><strong>Vercel Analytics:</strong> Monitors website performance and speed</li>
                <li><strong>Shopify Analytics:</strong> Processes e-commerce transactions and order data</li>
              </ul>
              <p>
                These services may use cookies and similar tracking technologies. You can control 
                cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-deep-charcoal mb-4">
                4. Data Sharing and Third Parties
              </h2>
              <p>
                We share your information only with trusted service providers who help us operate our business:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Shopify:</strong> E-commerce platform for payment processing and order fulfillment</li>
                <li><strong>Shipping Partners:</strong> To deliver your furniture purchases</li>
                <li><strong>Analytics Providers:</strong> Google Analytics and Vercel for website insights</li>
                <li><strong>Email Service:</strong> For sending order confirmations and newsletters</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-deep-charcoal mb-4">
                5. Your Rights (GDPR)
              </h2>
              <p>
                If you are located in the European Union, you have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong>Objection:</strong> Object to processing of your personal data</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
              </ul>
              <p>
                To exercise these rights, please contact us at{' '}
                <a href="mailto:privacy@thecatmanor.com" className="text-terracotta hover:underline">
                  privacy@thecatmanor.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-deep-charcoal mb-4">
                6. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. 
                However, no internet transmission is completely secure.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-deep-charcoal mb-4">
                7. Children's Privacy
              </h2>
              <p>
                Our website is not directed to children under 13 years of age. We do not knowingly 
                collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-deep-charcoal mb-4">
                8. Contact Information
              </h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4">
                <p><strong>The Cat Manor</strong></p>
                <p>Email: <a href="mailto:privacy@thecatmanor.com" className="text-terracotta hover:underline">privacy@thecatmanor.com</a></p>
                <p>Website: <a href="https://thecatmanor.com" className="text-terracotta hover:underline">thecatmanor.com</a></p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-medium text-deep-charcoal mb-4">
                9. Updates to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
