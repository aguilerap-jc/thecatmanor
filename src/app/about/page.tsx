import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-warm-white to-snow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="opacity-0 animate-fade-in">
            <p className="text-accent-gold font-medium tracking-[0.2em] uppercase text-sm mb-6">
              About The Cat Manor
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-deep-charcoal mb-8">
              Redefining Feline
              <br />
              <span className="text-terracotta">Living Spaces</span>
            </h1>
            <p className="text-lg md:text-xl text-ash font-light leading-relaxed max-w-3xl mx-auto">
              We believe that exceptional design should enhance both human and feline experiences. 
              Our mission is to create modular cat furniture that seamlessly integrates with contemporary 
              interiors while providing ultimate comfort for your cherished companions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="opacity-0 animate-slide-up">
              <h2 className="font-display text-3xl md:text-4xl font-light text-deep-charcoal mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-ash leading-relaxed">
                <p>
                  The Cat Manor was born from a simple observation: cat furniture didn't have to compromise 
                  on style to be functional. We saw too many pet products that, while serving their purpose, 
                  disrupted the carefully curated aesthetics of modern homes.
                </p>
                <p>
                  Founded by a team of designers and devoted cat parents, we set out to bridge this gap. 
                  Our journey began with a single question: "What if cat furniture could be as beautiful 
                  as it is functional?"
                </p>
                <p>
                  Today, The Cat Manor stands as a testament to thoughtful design, premium craftsmanship, 
                  and our unwavering commitment to enhancing the lives of both cats and their humans.
                </p>
              </div>
            </div>
            <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white p-8 rounded-lg shadow-elegant">
                <h3 className="font-display text-xl font-medium text-deep-charcoal mb-4">
                  Our Mission
                </h3>
                <p className="text-ash leading-relaxed mb-6">
                  To craft exceptional modular cat furniture that seamlessly integrates with contemporary 
                  and minimalist interiors, ensuring every piece is designed with both form and feline function in mind.
                </p>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-terracotta/10 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-terracotta rounded-full"></div>
                  </div>
                  <p className="text-sm text-ash">
                    Every design decision is made with respect for both feline behavior and human aesthetics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-light text-deep-charcoal mb-6">
              Our Values
            </h2>
            <p className="text-lg text-ash max-w-2xl mx-auto">
              These principles guide every decision we make, from initial design concepts to final delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Sustainable Design */}
            <div className="text-center opacity-0 animate-slide-up">
              <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-medium text-deep-charcoal mb-4">
                Sustainable Design
              </h3>
              <p className="text-ash leading-relaxed">
                We use sustainably sourced hardwoods and premium fabrics, ensuring lasting beauty 
                and durability while respecting our environment.
              </p>
            </div>

            {/* Modular Innovation */}
            <div className="text-center opacity-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-medium text-deep-charcoal mb-4">
                Modular Innovation
              </h3>
              <p className="text-ash leading-relaxed">
                Our expandable designs grow with your needs. Mix, match, and reconfigure to create 
                the perfect environment for your cats.
              </p>
            </div>

            {/* Aesthetic Excellence */}
            <div className="text-center opacity-0 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-medium text-deep-charcoal mb-4">
                Aesthetic Excellence
              </h3>
              <p className="text-ash leading-relaxed">
                Every piece seamlessly integrates with contemporary and minimalist interiors, 
                enhancing rather than disrupting your living space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="opacity-0 animate-slide-up">
              <div className="bg-white p-8 rounded-lg shadow-elegant">
                <h3 className="font-display text-2xl font-light text-deep-charcoal mb-6">
                  Premium Craftsmanship
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-terracotta rounded-full mt-2"></div>
                    <p className="text-ash">Hand-selected sustainably sourced hardwoods</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-terracotta rounded-full mt-2"></div>
                    <p className="text-ash">Premium fabrics chosen for durability and comfort</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-terracotta rounded-full mt-2"></div>
                    <p className="text-ash">Precision engineering for modular connectivity</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-terracotta rounded-full mt-2"></div>
                    <p className="text-ash">Rigorous quality testing for feline safety</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="font-display text-3xl md:text-4xl font-light text-deep-charcoal mb-6">
                Meticulous Attention to Detail
              </h2>
              <div className="space-y-6 text-ash leading-relaxed">
                <p>
                  Each piece in our collection undergoes a rigorous design and testing process. 
                  We observe feline behavior patterns, study ergonomics, and test materials to ensure 
                  every product meets our exacting standards.
                </p>
                <p>
                  Our commitment to quality extends beyond aesthetics. Every joint is reinforced, 
                  every surface is finished to perfection, and every component is designed to withstand 
                  the enthusiastic use of even the most active cats.
                </p>
                <p>
                  The result? Furniture that not only looks exceptional in your home but provides 
                  years of comfort and enjoyment for your feline companions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-light text-deep-charcoal mb-6">
              Why Choose The Cat Manor
            </h2>
            <p className="text-lg text-ash max-w-2xl mx-auto">
              We're more than just a furniture company – we're partners in creating harmonious living spaces.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="font-display text-xl font-medium text-deep-charcoal mb-4">
                Design Philosophy
              </h3>
              <p className="text-ash leading-relaxed mb-4">
                We believe that pet furniture should complement, not compromise, your interior design. 
                Our pieces are created to be as beautiful as they are functional.
              </p>
              <ul className="space-y-2 text-sm text-ash">
                <li>• Contemporary and minimalist aesthetic</li>
                <li>• Seamless integration with modern interiors</li>
                <li>• Form follows function design principles</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="font-display text-xl font-medium text-deep-charcoal mb-4">
                Customer Promise
              </h3>
              <p className="text-ash leading-relaxed mb-4">
                Your satisfaction is our priority. From initial design consultation to post-purchase support, 
                we're committed to exceeding your expectations.
              </p>
              <ul className="space-y-2 text-sm text-ash">
                <li>• Curated collection of premium products</li>
                <li>• Expert guidance and support</li>
                <li>• Commitment to lasting quality</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 lg:py-32 bg-deep-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-light text-snow mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore our curated collection and discover how modular cat furniture can enhance 
            your modern living space while delighting your feline companions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-3 bg-terracotta text-snow font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-opacity-90 hover:shadow-elegant"
            >
              Explore Collection
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-snow text-snow font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-snow hover:text-deep-charcoal"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
