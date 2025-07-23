"use client";

import React, { useEffect, useState } from 'react';
import Client from 'shopify-buy';

interface ShopifyBuyButtonProps {
  productId: string;
  variantId?: string;
  productTitle: string;
  price: string;
  className?: string;
}

export default function ShopifyBuyButton({ 
  productId, 
  variantId, 
  productTitle, 
  price, 
  className = "" 
}: ShopifyBuyButtonProps) {
  const [client, setClient] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkout, setCheckout] = useState<any>(null);

  useEffect(() => {
    // Initialize Shopify client
    const shopifyClient = Client.buildClient({
      domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'your-store.myshopify.com',
      storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'your-storefront-access-token',
      apiVersion: '2024-01'
    });
    
    setClient(shopifyClient);
    
    // Create checkout
    shopifyClient.checkout.create().then((checkout: any) => {
      setCheckout(checkout);
    });
  }, []);

  const addToCart = async () => {
    if (!client || !checkout) return;
    
    setIsLoading(true);
    
    try {
      console.log('🛒 Adding to cart:', {
        variantId: variantId,
        productId: productId,
        productTitle: productTitle
      });
      
      const lineItemsToAdd = [{
        variantId: variantId || productId,
        quantity: 1
      }];

      const updatedCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
      setCheckout(updatedCheckout);
      
      // Redirect to Shopify checkout
      window.open(updatedCheckout.webUrl, '_blank');
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={addToCart}
      disabled={isLoading || !client}
      className={`
        bg-terracotta text-white px-8 py-3 font-medium tracking-wide uppercase text-sm 
        transition-all duration-300 hover:bg-opacity-90 disabled:opacity-50 
        disabled:cursor-not-allowed flex items-center justify-center
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          Adding...
        </>
      ) : (
        <>
          Add to Cart • {price}
        </>
      )}
    </button>
  );
}
