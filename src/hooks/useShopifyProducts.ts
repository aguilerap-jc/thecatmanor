"use client";

import { useState, useEffect } from 'react';
import { shopifyService, ShopifyProduct } from '../lib/shopify';
import { Product, ShopifyProductData } from '../types/product';

export const useShopifyProducts = () => {
  const [shopifyProducts, setShopifyProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (limit = 10) => {
    setLoading(true);
    setError(null);
    
    try {
      const products = await shopifyService.fetchProducts(limit);
      setShopifyProducts(products);
    } catch (err) {
      setError('Failed to fetch Shopify products');
      console.error('Error fetching Shopify products:', err);
    } finally {
      setLoading(false);
    }
  };

  const transformToAppProduct = (shopifyProduct: ShopifyProduct): ShopifyProductData => {
    const mainVariant = shopifyProduct.variants[0];
    const mainImage = shopifyProduct.images[0];

    return {
      id: `shopify-${shopifyProduct.handle}`,
      name: shopifyProduct.title,
      price: `$${mainVariant?.price || shopifyProduct.priceRange.minVariantPrice}`,
      image: mainImage?.src || '/images/placeholder.jpg',
      description: shopifyProduct.description,
      collection: shopifyProduct.tags.find(tag => tag.toLowerCase().includes('collection')) || 'Shopify',
      type: 'shopify',
      shopifyProductId: shopifyProduct.id,
      shopifyVariantId: mainVariant?.id,
      shopifyHandle: shopifyProduct.handle
    };
  };

  return {
    shopifyProducts,
    loading,
    error,
    fetchProducts,
    transformToAppProduct
  };
};

export const useMergedProducts = (nativeProducts: Product[]) => {
  const { shopifyProducts, loading, error, fetchProducts, transformToAppProduct } = useShopifyProducts();
  const [mergedProducts, setMergedProducts] = useState<Product[]>(nativeProducts);

  useEffect(() => {
    const syncProducts = () => {
      const transformedShopifyProducts = shopifyProducts.map(transformToAppProduct);
      const combined = [...nativeProducts, ...transformedShopifyProducts];
      setMergedProducts(combined);
    };

    if (shopifyProducts.length > 0) {
      syncProducts();
    } else {
      setMergedProducts(nativeProducts);
    }
  }, [shopifyProducts, nativeProducts]);

  const syncWithShopify = async (limit = 10) => {
    await fetchProducts(limit);
  };

  return {
    products: mergedProducts,
    loading,
    error,
    syncWithShopify,
    shopifyProductsCount: shopifyProducts.length
  };
};
