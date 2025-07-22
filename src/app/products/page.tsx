"use client";

import React from "react";
import { products } from "../../data/products";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {
  const collections = ["All", "Signature", "Essential", "Eco"];
  const [selectedCollection, setSelectedCollection] = React.useState("All");

  const filteredProducts = selectedCollection === "All" 
    ? products 
    : products.filter(product => product.collection === selectedCollection);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-yellow-600 font-medium tracking-[0.2em] uppercase text-sm mb-4">
            Our Collection
          </p>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight text-gray-900 mb-6">
            Modular Cat Furniture
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
            Discover our curated collection of premium, modular cat furniture designed 
            to integrate seamlessly with contemporary interiors while providing 
            exceptional comfort for your feline companions.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {collections.map((collection) => (
              <button
                key={collection}
                onClick={() => setSelectedCollection(collection)}
                className={`px-6 py-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 ${
                  selectedCollection === collection
                    ? 'text-gray-900 border-b-2 border-orange-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {collection}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Design CTA */}
      <section className="py-16 md:py-24 lg:py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-light text-white mb-6">
            Need Something Custom?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Our design team can create bespoke modular systems tailored to your 
            space and your cats' specific needs. Every piece is crafted to order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-orange-500 text-white font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-orange-600 hover:shadow-lg">
              Request Custom Design
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-white hover:text-gray-900">
              View Design Process
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}