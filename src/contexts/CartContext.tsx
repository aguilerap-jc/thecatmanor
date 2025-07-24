'use client';

import React, { createContext, useContext, useReducer, useEffect, useState, ReactNode } from 'react';
import Client from 'shopify-buy';

// Types
interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  title: string;
  price: string;
  quantity: number;
  image?: string;
  variant?: {
    title: string;
    selectedOptions: Array<{ name: string; value: string }>;
  };
}

interface CartState {
  items: CartItem[];
  checkout: any;
  isOpen: boolean;
  isLoading: boolean;
  subtotal: string;
  itemCount: number;
}

type CartAction =
  | { type: 'SET_CHECKOUT'; payload: any }
  | { type: 'SET_ITEMS'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'UPDATE_SUBTOTAL'; payload: string }
  | { type: 'UPDATE_ITEM_COUNT'; payload: number };

interface CartContextType extends CartState {
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  addNativeToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (lineItemId: string) => Promise<void>;
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  proceedToCheckout: () => void;
}

// Initial state
const initialState: CartState = {
  items: [],
  checkout: null,
  isOpen: false,
  isLoading: false,
  subtotal: '$0.00',
  itemCount: 0,
};

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_CHECKOUT':
      return { ...state, checkout: action.payload };
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'UPDATE_SUBTOTAL':
      return { ...state, subtotal: action.payload };
    case 'UPDATE_ITEM_COUNT':
      return { ...state, itemCount: action.payload };
    default:
      return state;
  }
}

// Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [client, setClient] = useState<any>(null);

  // Initialize Shopify client and load saved cart data
  useEffect(() => {
    // Load native products from localStorage
    const savedNativeCart = localStorage.getItem('native-cart');
    if (savedNativeCart) {
      try {
        const nativeItems = JSON.parse(savedNativeCart);
        dispatch({ type: 'SET_ITEMS', payload: nativeItems });
      } catch (error) {
        console.error('Failed to load native cart from localStorage:', error);
      }
    }

    if (typeof window !== 'undefined') {
      const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'your-store.myshopify.com';
      const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'your-storefront-access-token';

      // Check for dummy data
      const isDummyData = 
        domain.includes('dummy-store') ||
        token.includes('dummy-token') ||
        domain === 'your-store.myshopify.com' ||
        token === 'your-storefront-access-token';

      if (isDummyData) {
        console.warn('Using dummy Shopify credentials - cart functionality will be limited');
        return;
      }

      try {
        const shopifyClient = Client.buildClient({
          domain,
          storefrontAccessToken: token,
          apiVersion: '2023-01',
        });

        setClient(shopifyClient);

        // Create or restore checkout
        initializeCheckout(shopifyClient);
      } catch (error) {
        console.error('Failed to initialize Shopify client:', error);
      }
    }
  }, []);

  const initializeCheckout = async (shopifyClient: any) => {
    try {
      // Try to restore existing checkout from localStorage
      const existingCheckoutId = localStorage.getItem('shopify_checkout_id');
      
      if (existingCheckoutId) {
        try {
          const existingCheckout = await shopifyClient.checkout.fetch(existingCheckoutId);
          if (existingCheckout && !existingCheckout.completedAt) {
            dispatch({ type: 'SET_CHECKOUT', payload: existingCheckout });
            updateCartFromCheckout(existingCheckout);
            return;
          }
        } catch (error) {
          // Existing checkout is invalid, create new one
          localStorage.removeItem('shopify_checkout_id');
        }
      }

      // Create new checkout
      const newCheckout = await shopifyClient.checkout.create();
      dispatch({ type: 'SET_CHECKOUT', payload: newCheckout });
      localStorage.setItem('shopify_checkout_id', newCheckout.id);
    } catch (error) {
      console.error('Failed to initialize checkout:', error);
    }
  };

  const updateCartFromCheckout = (checkout: any) => {
    const shopifyItems: CartItem[] = checkout.lineItems.map((item: any) => ({
      id: item.id,
      productId: item.variant.product.id,
      variantId: item.variant.id,
      title: item.title,
      price: `$${parseFloat(item.variant.price.amount).toFixed(2)}`,
      quantity: item.quantity,
      image: item.variant.image?.src,
      variant: {
        title: item.variant.title,
        selectedOptions: item.variant.selectedOptions,
      },
    }));

    // Merge with existing native items (keep native items, update Shopify items)
    const currentNativeItems = state.items.filter(item => item.id.startsWith('native-'));
    const allItems = [...currentNativeItems, ...shopifyItems];

    dispatch({ type: 'SET_ITEMS', payload: allItems });
    dispatch({ type: 'UPDATE_SUBTOTAL', payload: `$${parseFloat(checkout.subtotalPrice.amount).toFixed(2)}` });
    dispatch({ type: 'UPDATE_ITEM_COUNT', payload: allItems.length });
  };

  const addToCart = async (variantId: string, quantity: number = 1) => {
    if (!client || !state.checkout) {
      console.error('Shopify client or checkout not initialized');
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Convert raw variant ID to Global ID format if needed
      const globalVariantId = variantId.startsWith('gid://') 
        ? variantId 
        : `gid://shopify/ProductVariant/${variantId}`;

      const lineItemsToAdd = [{
        variantId: globalVariantId,
        quantity: quantity,
      }];

      const updatedCheckout = await client.checkout.addLineItems(state.checkout.id, lineItemsToAdd);
      dispatch({ type: 'SET_CHECKOUT', payload: updatedCheckout });
      updateCartFromCheckout(updatedCheckout);
      
      // Open cart sidebar to show added item
      dispatch({ type: 'OPEN_CART' });
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addNativeToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    // For native products, we'll add them to a separate cart state
    // This is a simplified implementation - in a real app, you might want to merge this with Shopify cart
    const cartItem: CartItem = {
      ...item,
      quantity
    };

    // Add to existing items or update quantity if item already exists
    const existingItemIndex = state.items.findIndex(existingItem => existingItem.id === item.id);
    let updatedItems: CartItem[];

    if (existingItemIndex >= 0) {
      updatedItems = [...state.items];
      updatedItems[existingItemIndex].quantity += quantity;
    } else {
      updatedItems = [...state.items, cartItem];
    }

    dispatch({ type: 'SET_ITEMS', payload: updatedItems });
    dispatch({ type: 'OPEN_CART' });
    
    // Save to localStorage and update totals
    localStorage.setItem('native-cart', JSON.stringify(updatedItems));
    updateTotals(updatedItems);
  };

  const updateTotals = (items: CartItem[]) => {
    // Calculate total for native products only (Shopify totals come from checkout)
    const nativeItems = items.filter(item => item.id.startsWith('native-'));
    const nativeTotal = nativeItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);

    // For now, just update with native total (in a full implementation, you'd merge with Shopify total)
    if (nativeItems.length > 0 && !state.checkout?.lineItems?.length) {
      dispatch({ type: 'UPDATE_SUBTOTAL', payload: `$${nativeTotal.toFixed(2)}` });
    }
    
    dispatch({ type: 'UPDATE_ITEM_COUNT', payload: items.length });
  };

  const removeFromCart = async (lineItemId: string) => {
    // Check if this is a native product ID
    if (lineItemId.startsWith('native-')) {
      // Handle native product removal
      const updatedItems = state.items.filter(item => item.id !== lineItemId);
      dispatch({ type: 'SET_ITEMS', payload: updatedItems });
      localStorage.setItem('native-cart', JSON.stringify(updatedItems));
      updateTotals(updatedItems);
      return;
    }

    // Handle Shopify product removal
    if (!client || !state.checkout) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const updatedCheckout = await client.checkout.removeLineItems(state.checkout.id, [lineItemId]);
      dispatch({ type: 'SET_CHECKOUT', payload: updatedCheckout });
      updateCartFromCheckout(updatedCheckout);
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateQuantity = async (lineItemId: string, quantity: number) => {
    // Check if this is a native product ID
    if (lineItemId.startsWith('native-')) {
      // Handle native product quantity update
      const updatedItems = state.items.map(item => 
        item.id === lineItemId ? { ...item, quantity } : item
      );
      dispatch({ type: 'SET_ITEMS', payload: updatedItems });
      localStorage.setItem('native-cart', JSON.stringify(updatedItems));
      updateTotals(updatedItems);
      return;
    }

    // Handle Shopify product quantity update
    if (!client || !state.checkout) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const lineItemsToUpdate = [{
        id: lineItemId,
        quantity: quantity,
      }];

      const updatedCheckout = await client.checkout.updateLineItems(state.checkout.id, lineItemsToUpdate);
      dispatch({ type: 'SET_CHECKOUT', payload: updatedCheckout });
      updateCartFromCheckout(updatedCheckout);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearCart = async () => {
    if (!client) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const newCheckout = await client.checkout.create();
      dispatch({ type: 'SET_CHECKOUT', payload: newCheckout });
      dispatch({ type: 'SET_ITEMS', payload: [] });
      dispatch({ type: 'UPDATE_SUBTOTAL', payload: '$0.00' });
      dispatch({ type: 'UPDATE_ITEM_COUNT', payload: 0 });
      localStorage.setItem('shopify_checkout_id', newCheckout.id);
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });
  const openCart = () => dispatch({ type: 'OPEN_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });

  const proceedToCheckout = () => {
    if (state.checkout && state.checkout.webUrl) {
      window.open(state.checkout.webUrl, '_self');
    }
  };

  const contextValue: CartContextType = {
    ...state,
    addToCart,
    addNativeToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    proceedToCheckout,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
