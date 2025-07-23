"use client";

import Client from 'shopify-buy';

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: Array<{
    src: string;
    altText?: string;
  }>;
  variants: Array<{
    id: string;
    title: string;
    price: string;
    compareAtPrice?: string;
    available: boolean;
  }>;
  priceRange: {
    minVariantPrice: string;
    maxVariantPrice: string;
  };
  tags: string[];
}

class ShopifyService {
  private client: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeClient();
    }
  }

  private initializeClient() {
    try {
      this.client = Client.buildClient({
        domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'your-store.myshopify.com',
        storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'your-storefront-access-token',
        apiVersion: '2024-01'
      });
    } catch (error) {
      console.warn('Failed to initialize Shopify client:', error);
    }
  }

  async fetchProduct(productId: string): Promise<ShopifyProduct | null> {
    if (!this.client) return null;

    try {
      const product = await this.client.product.fetch(productId);
      return this.transformProduct(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

  async fetchProducts(limit = 10): Promise<ShopifyProduct[]> {
    if (!this.client) return [];

    try {
      const products = await this.client.product.fetchAll(limit);
      return products.map((product: any) => this.transformProduct(product));
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  private transformProduct(shopifyProduct: any): ShopifyProduct {
    return {
      id: shopifyProduct.id,
      title: shopifyProduct.title,
      handle: shopifyProduct.handle,
      description: shopifyProduct.description,
      images: shopifyProduct.images.map((img: any) => ({
        src: img.src,
        altText: img.altText
      })),
      variants: shopifyProduct.variants.map((variant: any) => ({
        id: variant.id,
        title: variant.title,
        price: variant.price.amount,
        compareAtPrice: variant.compareAtPrice?.amount,
        available: variant.available
      })),
      priceRange: {
        minVariantPrice: shopifyProduct.priceRange.minVariantPrice.amount,
        maxVariantPrice: shopifyProduct.priceRange.maxVariantPrice.amount
      },
      tags: shopifyProduct.tags
    };
  }

  async createCheckout() {
    if (!this.client) return null;
    return await this.client.checkout.create();
  }

  async addToCheckout(checkoutId: string, variantId: string, quantity = 1) {
    if (!this.client) return null;

    const lineItemsToAdd = [{
      variantId,
      quantity
    }];

    return await this.client.checkout.addLineItems(checkoutId, lineItemsToAdd);
  }
}

export const shopifyService = new ShopifyService();
