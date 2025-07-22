import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-white to-snow py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="opacity-0 animate-fade-in">
            <p className="text-accent-gold font-medium tracking-[0.2em] uppercase text-sm mb-6">
              Modular Cat Furniture
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight text-deep-charcoal mb-8">
              Elevated Design<br />
              <span className="text-terracotta">for Refined</span> Living
            </h1>
            <p className="text-lg md:text-xl text-ash font-light leading-relaxed max-w-3xl mx-auto mb-12">
              Transform your space with our curated collection of modular cat furniture. 
              Each piece is meticulously crafted to seamlessly integrate with contemporary 
              and minimalist interiors while providing ultimate comfort for your feline companions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/products" className="px-8 py-3 bg-deep-charcoal text-snow font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-charcoal hover:shadow-elegant">
                Explore Collection
              </Link>
              <Link href="/consultation" className="px-8 py-3 border-2 border-deep-charcoal text-deep-charcoal font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-deep-charcoal hover:text-snow">
                Design Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Benefits */}
      <section className="py-16 md:py-24 lg:py-32 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center opacity-0 animate-slide-up">
              <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-medium text-deep-charcoal mb-4">
                Modular System
              </h3>
              <p className="text-ash leading-relaxed">
                Expandable designs that grow with your needs. Mix, match, and reconfigure 
                to create the perfect environment for your cats.
              </p>
            </div>

            <div className="text-center opacity-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-medium text-deep-charcoal mb-4">
                Premium Materials
              </h3>
              <p className="text-ash leading-relaxed">
                Sustainably sourced hardwoods and premium fabrics ensure lasting beauty 
                and durability in every piece.
              </p>
            </div>

            <div className="text-center opacity-0 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-dusty/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-dusty" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-medium text-deep-charcoal mb-4">
                Design Service
              </h3>
              <p className="text-ash leading-relaxed">
                Professional design consultation to ensure perfect integration 
                with your existing interior design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 lg:py-32 bg-deep-charcoal text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-light text-snow mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Book a design consultation and discover how our modular 
            cat furniture can enhance your modern living space.
          </p>
          <Link href="/consultation" className="px-8 py-3 bg-terracotta text-snow font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-opacity-90 hover:shadow-elegant">
            Schedule Consultation
          </Link>
        </div>
      </section>
    </>
  );
}