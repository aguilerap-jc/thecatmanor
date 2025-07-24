'use client';

import React from 'react';
import { nativeProducts, getAllProducts } from '@/data/products';
import { Product, isShopifyProduct } from '@/types/product';
import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
  const collections = ['All', 'Signature', 'Essential', 'Eco', 'Shopify'];
  const [selectedCollection, setSelectedCollection] = React.useState('All');
  const [products, setProducts] = React.useState<Product[]>(nativeProducts);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Load all products (native + Shopify) on component mount
  React.useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      } catch (err) {
        setError('Failed to load some products');
        console.error('Error loading products:', err);
        // Fallback to native products only
        setProducts(nativeProducts);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products based on selected collection
  const filteredProducts = selectedCollection === 'All' 
    ? products 
    : products.filter(product => {
      if (selectedCollection === 'Shopify') {
        return isShopifyProduct(product);
      }
      return product.collection === selectedCollection;
    });

  // Log errors for debugging (prevents unused variable warning)
  React.useEffect(() => {
    if (error) {
      console.warn('Product loading error:', error);
    }
  }, [error]);

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
            Discover our curated collection of premium, modular cat furniture designed to integrate
            seamlessly with contemporary interiors while providing exceptional comfort for your
            feline companions.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {collections.map(collection => (
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
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-600">Loading products...</span>
            </div>
          ) : (
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

              {filteredProducts.length === 0 && !loading && (
                <div className="col-span-full text-center py-16">
                  <p className="text-gray-500 text-lg">
                    No products found in the {selectedCollection} collection.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
