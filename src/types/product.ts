export interface NativeProduct {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  collection?: string;
  materials?: string[];
  dimensions?: string;
  type: 'native';
}

export interface ShopifyProductData {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  collection?: string;
  materials?: string[];
  dimensions?: string;
  type: 'shopify';
  shopifyProductId: string;
  shopifyVariantId?: string;
  shopifyHandle?: string;
}

export type Product = NativeProduct | ShopifyProductData;

export const isShopifyProduct = (product: Product): product is ShopifyProductData => {
  return product.type === 'shopify';
};

export const isNativeProduct = (product: Product): product is NativeProduct => {
  return product.type === 'native';
};
