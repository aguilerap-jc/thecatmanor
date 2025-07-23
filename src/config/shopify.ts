import { ShopifyProductData } from '../types/product';

export interface ShopifyProductConfig {
  id: string;
  shopifyProductId: string;
  shopifyVariantId?: string;
  shopifyHandle?: string;
  fallbackData?: Partial<ShopifyProductData>;
}

export interface ShopifyCollectionConfig {
  id: string;
  shopifyCollectionId: string;
  shopifyHandle?: string;
  maxProducts?: number; // Limit number of products to fetch from collection
}

// Single reusable fallback data for when Shopify is unavailable
const defaultFallbackData = {
  name: "Premium Cat Furniture", 
  price: "Price unavailable", 
  image: "images/products/placeholder.webp", 
  description: "Product information is currently unavailable. Please check back later or contact us for details.", 
  collection: "Cat Furniture", 
  materials: ["Premium Materials"], 
  dimensions: "Dimensions available upon request"
};

// Shopify product configurations
export const shopifyProductConfigs: ShopifyProductConfig[] = [
  {
    id: "shopify-premium-cat-tower",
    shopifyProductId: process.env.NEXT_PUBLIC_SHOPIFY_PRODUCT_ID_1 || "gid://shopify/Product/example-product-id",
    shopifyVariantId: process.env.NEXT_PUBLIC_SHOPIFY_VARIANT_ID_1 || "gid://shopify/ProductVariant/example-variant-id",
    shopifyHandle: "cat-step-wall-mounter-furniture",
    fallbackData: defaultFallbackData
  },
  {
    id: "shopify-premium-cat-tower2",
    shopifyProductId: process.env.NEXT_PUBLIC_SHOPIFY_PRODUCT_ID_2 || "gid://shopify/Product/example-product-id",
    shopifyVariantId: process.env.NEXT_PUBLIC_SHOPIFY_VARIANT_ID_2 || "gid://shopify/ProductVariant/example-variant-id",
    shopifyHandle: "weaving-rattan-circular-cat-bed",
    fallbackData: defaultFallbackData
  }
  
  // Easy to add more products - all use the same fallback:
  // {
  //   id: "shopify-cat-tree",
  //   shopifyProductId: process.env.NEXT_PUBLIC_SHOPIFY_PRODUCT_ID_3 || "gid://shopify/Product/example-product-id-3",
  //   shopifyVariantId: process.env.NEXT_PUBLIC_SHOPIFY_VARIANT_ID_3 || "gid://shopify/ProductVariant/example-variant-id-3",
  //   shopifyHandle: "cat-tree-cat-tower-for-indoor",
  //   fallbackData: defaultFallbackData
  // }
];

// Shopify collection configurations
export const shopifyCollectionConfigs: ShopifyCollectionConfig[] = [
  {
    id: "shopify-main-collection",
    shopifyCollectionId: process.env.NEXT_PUBLIC_SHOPIFY_COLLECTION_ID_1 || "gid://shopify/Collection/example-collection-id",
    shopifyHandle: "cat-furniture", // Optional: collection handle for URL-based fetching
    maxProducts: 10 // Limit to 10 products from this collection
  }
  
  // Add more collections:
  // {
  //   id: "shopify-premium-collection",
  //   shopifyCollectionId: process.env.NEXT_PUBLIC_SHOPIFY_COLLECTION_ID_2 || "gid://shopify/Collection/example-collection-id-2",
  //   shopifyHandle: "premium-cat-furniture",
  //   maxProducts: 5
  // }
];
