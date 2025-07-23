'use client';

import React, { useState, useEffect } from 'react';
import { Product, isShopifyProduct, isNativeProduct } from '../types/product';
import ShopifyBuyButton from './ShopifyBuyButton';

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageStatus('loaded');
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageStatus('error');
    setImageLoaded(true);
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

        {/* Elegant placeholder - shows only when image fails to load */}
        {imageStatus === 'error' && (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 text-orange-800">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-200 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="font-['Playfair_Display'] text-lg font-medium mb-1">
                {product.name}
              </div>
              <div className="text-sm opacity-75">Premium Cat Furniture</div>
            </div>
          </div>
        )}

        {/* Quick view overlay */}
        <div
          className={`absolute inset-0 bg-gray-900 bg-opacity-0 transition-all duration-300 flex items-center justify-center ${
            isHovered ? 'bg-opacity-20' : ''
          }`}
        >
          <button
            className={`px-8 py-3 border-2 border-gray-900 text-gray-900 font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-gray-900 hover:text-white transform ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            Quick View
          </button>
        </div>

        {/* Collection badge */}
        {product.collection && (
          <div className="absolute top-4 left-4">
            <span className="bg-white bg-opacity-90 text-gray-900 px-3 py-1 text-xs font-medium tracking-wide uppercase rounded-full">
              {product.collection}
            </span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-6 lg:p-8">
        <div className="mb-4">
          <h3 className="font-['Playfair_Display'] text-xl lg:text-2xl font-medium text-gray-900 mb-2 leading-tight">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm lg:text-base leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Materials */}
        {product.materials && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
              Materials
            </p>
            <p className="text-sm text-gray-700">{product.materials.join(', ')}</p>
          </div>
        )}

        {/* Dimensions */}
        {product.dimensions && (
          <div className="mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
              Dimensions
            </p>
            <p className="text-sm text-gray-700">{product.dimensions}</p>
          </div>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-['Playfair_Display'] text-2xl lg:text-3xl font-light text-gray-900">
              {product.price}
            </span>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Starting from</p>
          </div>

          <div className="flex space-x-2">
            <button
              className="p-2 text-gray-700 hover:text-orange-500 transition-colors duration-300"
              aria-label="Add to wishlist"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Action Button - Dynamic based on product type */}
        <div className="mt-4">
          {isShopifyProduct(product) ? (
            <ShopifyBuyButton
              productId={product.shopifyProductId}
              variantId={product.shopifyVariantId}
              productTitle={product.name}
              price={product.price}
              className="w-full"
            />
          ) : isNativeProduct(product) ? (
            <button className="w-full px-8 py-3 bg-gray-900 text-white font-medium tracking-wide uppercase text-xs transition-all duration-300 hover:bg-gray-700 hover:shadow-lg">
              Learn More
            </button>
          ) : (
            <button className="w-full px-8 py-3 bg-gray-400 text-white font-medium tracking-wide uppercase text-xs cursor-not-allowed">
              Unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
