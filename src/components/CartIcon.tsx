'use client';

import React from 'react';
import { useCart } from '../contexts/CartContext';

export default function CartIcon() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      className="relative p-2 text-deep-charcoal hover:text-terracotta transition-colors duration-200"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      
      {/* Item Count Badge */}
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-terracotta text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center animate-fade-in">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
}
