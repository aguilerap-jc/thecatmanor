'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-warm-white to-snow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="opacity-0 animate-fade-in">
            <p className="text-accent-gold font-medium tracking-[0.2em] uppercase text-sm mb-6">
              Get in Touch
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-deep-charcoal mb-8">
              We'd Love to
              <br />
              <span className="text-terracotta">Hear From You</span>
            </h1>
            <p className="text-lg md:text-xl text-ash font-light leading-relaxed max-w-3xl mx-auto">
              Have questions about our modular cat furniture? Need design guidance? Our team is here
              to help you create the perfect living space for you and your feline companions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="opacity-0 animate-slide-up">
                <h2 className="font-display text-2xl md:text-3xl font-light text-deep-charcoal mb-8">
                  Contact Information
                </h2>

                {/* Contact Methods */}
                <div className="space-y-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-terracotta"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-deep-charcoal mb-1">Email</h3>
                      <p className="text-ash">hello@thecatmanor.com</p>
                      <p className="text-sm text-ash">We'll respond within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="bg-white p-8 rounded-lg shadow-elegant">
                  <h2 className="font-display text-2xl md:text-3xl font-light text-deep-charcoal mb-8">
                    Send us a Message
                  </h2>

                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-sage/10 border border-sage/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-5 h-5 text-sage"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <p className="text-sage font-medium">
                          Thank you! Your message has been sent successfully.
                        </p>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-5 h-5 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <p className="text-red-600 font-medium">
                          There was an error sending your message. Please try again.
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-deep-charcoal mb-2"
                        >
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-colors duration-300"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-deep-charcoal mb-2"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-colors duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    {/* Inquiry Type */}
                    <div>
                      <label
                        htmlFor="inquiryType"
                        className="block text-sm font-medium text-deep-charcoal mb-2"
                      >
                        Inquiry Type
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-colors duration-300"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="product">Product Information</option>
                        <option value="order">Order Support</option>
                        <option value="returns">Returns & Exchanges</option>
                        <option value="wholesale">Wholesale Opportunities</option>
                        <option value="media">Media & Press</option>
                      </select>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-deep-charcoal mb-2"
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-colors duration-300"
                        placeholder="Brief description of your inquiry"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-deep-charcoal mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-colors duration-300 resize-vertical"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full px-8 py-4 font-medium tracking-wide uppercase text-sm transition-all duration-300 rounded-lg ${
                          isSubmitting
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : 'bg-deep-charcoal text-snow hover:bg-charcoal hover:shadow-elegant'
                        }`}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-light text-deep-charcoal mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-ash">
              Quick answers to common questions about our products and services.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-soft">
              <h3 className="font-medium text-deep-charcoal mb-3">
                What materials are used in your cat furniture?
              </h3>
              <p className="text-ash leading-relaxed">
                We use sustainably sourced hardwoods including oak, walnut, and maple, paired with
                premium fabrics that are both durable and comfortable. All materials are non-toxic
                and safe for cats.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-soft">
              <h3 className="font-medium text-deep-charcoal mb-3">
                How does the modular system work?
              </h3>
              <p className="text-ash leading-relaxed">
                Our modular pieces connect seamlessly using precision-engineered joints. You can
                mix, match, and reconfigure components to create custom layouts that grow with your
                needs and space.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-soft">
              <h3 className="font-medium text-deep-charcoal mb-3">What is your return policy?</h3>
              <p className="text-ash leading-relaxed">
                We offer a 30-day return policy for unused items in original packaging. Custom
                pieces may have different return terms. Please contact us for specific details about
                your order.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-soft">
              <h3 className="font-medium text-deep-charcoal mb-3">
                Do you offer international shipping?
              </h3>
              <p className="text-ash leading-relaxed">
                Currently, we ship within the United States and Canada. We're working on expanding
                our shipping options to serve international customers in the future.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-soft">
              <h3 className="font-medium text-deep-charcoal mb-3">How long does delivery take?</h3>
              <p className="text-ash leading-relaxed">
                Standard delivery takes 7-14 business days. Custom pieces may require 3-4 weeks for
                crafting and delivery. We'll provide tracking information once your order ships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 md:py-24 lg:py-32 bg-deep-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-light text-snow mb-6">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Subscribe to our newsletter for design inspiration, new product releases, and exclusive
            offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-terracotta/20 transition-all duration-300"
            />
            <button className="px-6 py-3 bg-terracotta text-snow font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-opacity-90 hover:shadow-elegant rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
