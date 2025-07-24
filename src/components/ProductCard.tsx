'use client';

import React, { useState, useEffect } from 'react';
import { Product, isShopifyProduct } from '../types/product';
import { useCart } from '../contexts/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [addingToCart, setAddingToCart] = useState(false);

  const { addToCart, addNativeToCart } = useCart();

  const handleImageLoad = () => {
    setImageStatus('loaded');
  };

  const handleImageError = () => {
    setImageStatus('error');
  };

  // Preload image to avoid loading state
  useEffect(() => {
    const img = new Image();
    img.onload = handleImageLoad;
    img.onerror = handleImageError;

    // Use the image URL as-is if it's an external URL (starts with http), otherwise prefix with /
    const imageSrc = product.image.startsWith('http') ? product.image : `/${product.image}`;
    img.src = imageSrc;

    // Cleanup
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [product.image]);

  const handleAddToCart = async () => {
    if (addingToCart) return;

    setAddingToCart(true);
    try {
      if (isShopifyProduct(product)) {
        // For Shopify products, use the shopifyVariantId or shopifyProductId
        const variantId = product.shopifyVariantId || product.shopifyProductId;
        if (variantId) {
          await addToCart(variantId, 1);
        } else {
          console.error('No variant ID available for Shopify product');
        }
      } else {
        // For native products, use addNativeToCart
        const cartItem = {
          id: `native-${product.id}`,
          productId: product.id,
          variantId: 'default',
          title: product.name,
          price: product.price,
          image: product.image.startsWith('http') ? product.image : `/${product.image}`,
        };
        addNativeToCart(cartItem, 1);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div
      className="bg-white border border-gray-200 overflow-hidden transition-all duration-500 hover:shadow-lg hover:-translate-y-1 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 h-64">
        {/* Display image with proper loading state */}
        {imageStatus === 'loaded' && (
          <img
            src={product.image.startsWith('http') ? product.image : `/${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          />
        )}

        {/* Loading spinner - shows while image is loading */}
        {imageStatus === 'loading' && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error state - shows if image fails to load */}
        {imageStatus === 'error' && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center text-gray-500">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm">Image unavailable</span>
          </div>
        )}

        {/* Overlay with CTA - appears on hover */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={handleAddToCart}
            disabled={addingToCart}
            className="px-6 py-3 bg-white text-deep-charcoal font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-terracotta hover:text-white transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addingToCart ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>

        {/* Product badges */}
        <div className="absolute top-4 left-4 space-y-2">
          {isShopifyProduct(product) && (
            <span className="inline-block px-2 py-1 bg-sage text-white text-xs font-medium rounded">
              Shopify
            </span>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6 space-y-3">
        <div>
          <h3 className="font-display text-lg font-medium text-deep-charcoal leading-tight">
            {product.name}
          </h3>
          <p className="text-ash text-sm mt-1 line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-medium text-deep-charcoal">
            {product.price}
          </span>

          {/* Quick add button for mobile/always visible */}
          <button
            onClick={handleAddToCart}
            disabled={addingToCart}
            className="md:hidden px-4 py-2 bg-deep-charcoal text-white text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:bg-terracotta disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addingToCart ? 'Adding...' : 'Add'}
          </button>
        </div>

        {/* Product collection info */}
        {product.collection && (
          <div className="pt-3 border-t border-gray-100">
            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              {product.collection}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
