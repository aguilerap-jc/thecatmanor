import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="font-['Playfair_Display'] text-2xl font-medium mb-6">
              The Cat Manor
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Crafting exceptional modular cat furniture that seamlessly integrates 
              with contemporary and minimalist interiors. Every piece is designed 
              with both form and feline function in mind.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 20.254c0 .266-.216.482-.482.482H6.583c-.266 0-.482-.216-.482-.482V9.626c0-.266.216-.482.482-.482h1.384c.266 0 .482.216.482.482v10.628zm-.741-12.08c-.901 0-1.631-.73-1.631-1.631s.73-1.631 1.631-1.631 1.631.73 1.631 1.631-.73 1.631-1.631 1.631zm10.516 12.08c0 .266-.216.482-.482.482h-1.384c-.266 0-.482-.216-.482-.482v-5.492c0-.818-.149-1.457-.853-1.457-.695 0-1.046.534-1.046 1.457v5.492c0 .266-.216.482-.482.482h-1.384c-.266 0-.482-.216-.482-.482V9.626c0-.266.216-.482.482-.482h1.384c.266 0 .482.216.482.482v.823c.334-.534.948-1.066 2.176-1.066 2.312 0 2.571 1.532 2.571 3.532v6.839z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Pinterest"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.085 1.219-5.085s-.219-.438-.219-1.085c0-1.016.592-1.775 1.328-1.775.625 0 .927.469.927 1.031 0 .628-.399 1.562-.608 2.428-.173.73.365 1.322 1.085 1.322 1.302 0 2.301-1.375 2.301-3.356 0-1.755-1.26-2.982-3.059-2.982-2.084 0-3.307 1.563-3.307 3.176 0 .628.241 1.302.542 1.667.059.073.068.136.05.21-.055.229-.177.719-.201.82-.031.135-.101.163-.233.099-1.177-.55-1.914-2.275-1.914-3.662 0-2.984 2.167-5.726 6.256-5.726 3.284 0 5.831 2.341 5.831 5.471 0 3.267-2.059 5.889-4.917 5.889-.958 0-1.864-.499-2.174-1.094 0 0-.475 1.809-.591 2.25-.214.827-.793 1.865-1.18 2.497 1.004.311 2.062.479 3.166.479 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-medium text-white mb-6 tracking-wide uppercase text-sm">
              Collections
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products?collection=signature" className="text-gray-300 hover:text-orange-500 transition-colors duration-300">
                  Signature Series
                </Link>
              </li>
              <li>
                <Link href="/products?collection=essential" className="text-gray-300 hover:text-orange-500 transition-colors duration-300">
                  Essential Collection
                </Link>
              </li>
              <li>
                <Link href="/products?collection=eco" className="text-gray-300 hover:text-orange-500 transition-colors duration-300">
                  Eco Line
                </Link>
              </li>
              <li>
                <Link href="/custom" className="text-gray-300 hover:text-orange-500 transition-colors duration-300">
                  Custom Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-medium text-white mb-6 tracking-wide uppercase text-sm">
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/design-service" className="text-gray-300 hover:text-orange-500 transition-colors duration-300">
                  Design Consultation
                </Link>
              </li>
              <li>
                <Link href="/installation" className="text-gray-300 hover:text-orange-500 transition-colors duration-300">
                  Professional Installation
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-300 hover:text-orange-500 transition-colors duration-300">
                  Lifetime Warranty
                </Link>
              </li>
              <li>
                <Link href="/care" className="text-gray-300 hover:text-orange-500 transition-colors duration-300">
                  Care & Maintenance
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} The Cat Manor. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-gray-200 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-gray-200 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/shipping" className="text-gray-400 hover:text-gray-200 transition-colors duration-300">
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}