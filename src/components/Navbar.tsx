"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-50/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 lg:py-6">
          {/* Logo */}
          <Link href="/" className="group">
            <h1 className="font-['Playfair_Display'] text-2xl lg:text-3xl font-medium text-gray-900 tracking-tight group-hover:text-orange-500 transition-colors duration-300">
              The Cat Manor
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            <Link 
              href="/products" 
              className="text-gray-700 hover:text-orange-500 font-medium tracking-wide uppercase text-sm transition-colors duration-300 relative group"
            >
              Collection
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-orange-500 font-medium tracking-wide uppercase text-sm transition-colors duration-300 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/design-service" 
              className="text-gray-700 hover:text-orange-500 font-medium tracking-wide uppercase text-sm transition-colors duration-300 relative group"
            >
              Design Service
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-orange-500 font-medium tracking-wide uppercase text-sm transition-colors duration-300 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* CTA and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/consultation" 
              className="hidden lg:block px-8 py-3 bg-orange-500 text-white font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-orange-600 hover:shadow-lg"
            >
              Consultation
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-orange-500 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg 
                className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="py-4 space-y-4 border-t border-gray-200">
            <Link 
              href="/products" 
              className="block text-gray-700 hover:text-orange-500 font-medium tracking-wide uppercase text-sm transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Collection
            </Link>
            <Link 
              href="/about" 
              className="block text-gray-700 hover:text-orange-500 font-medium tracking-wide uppercase text-sm transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/design-service" 
              className="block text-gray-700 hover:text-orange-500 font-medium tracking-wide uppercase text-sm transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Design Service
            </Link>
            <Link 
              href="/contact" 
              className="block text-gray-700 hover:text-orange-500 font-medium tracking-wide uppercase text-sm transition-colors duration-300 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/consultation" 
              className="block px-8 py-3 bg-orange-500 text-white font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-orange-600 hover:shadow-lg mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Consultation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}