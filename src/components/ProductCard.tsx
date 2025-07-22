"use client";

import React, { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  collection?: string;
  materials?: string[];
  dimensions?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="bg-white border border-gray-200 overflow-hidden transition-all duration-500 hover:shadow-lg hover:-translate-y-1 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Image overlay with loading state */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-gray-300 border-t-gray-400 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Quick view overlay */}
        <div className={`absolute inset-0 bg-gray-900 bg-opacity-0 transition-all duration-300 flex items-center justify-center ${
          isHovered ? 'bg-opacity-20' : ''
        }`}>
          <button className={`px-8 py-3 border-2 border-gray-900 text-gray-900 font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-gray-900 hover:text-white transform ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
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
            <p className="text-sm text-gray-700">
              {product.materials.join(', ')}
            </p>
          </div>
        )}

        {/* Dimensions */}
        {product.dimensions && (
          <div className="mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
              Dimensions
            </p>
            <p className="text-sm text-gray-700">
              {product.dimensions}
            </p>
          </div>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-['Playfair_Display'] text-2xl lg:text-3xl font-light text-gray-900">
              {product.price}
            </span>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Starting from
            </p>
          </div>
          
          <div className="flex space-x-2">
            <button 
              className="p-2 text-gray-700 hover:text-orange-500 transition-colors duration-300"
              aria-label="Add to wishlist"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            
            <button className="px-8 py-3 bg-gray-900 text-white font-medium tracking-wide uppercase text-xs transition-all duration-300 hover:bg-gray-700 hover:shadow-lg">
              Configure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}