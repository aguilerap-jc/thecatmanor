# The Cat Manor - AI Agent Instructions

## Architecture Overview

This is a **Next.js 15 e-commerce site** for premium cat furniture with a **hybrid data approach**: static native products (`src/data/products.ts`) + dynamic Shopify integration (`src/lib/shopifyProductManager.ts`). Built with **App Router**, **TypeScript**, and **Tailwind CSS** with a sophisticated design system.

### Key Design Patterns

**Design System**: Custom Tailwind config (`tailwind.config.js`) with brand colors (`terracotta`, `sage`, `deep-charcoal`) and typography (`Playfair Display` + `Inter`). All components follow this premium aesthetic with custom animations (`animate-fade-in`, `animate-slide-up`).

**Component Structure**: Clean separation between layout (`Navbar`, `Footer`) and content components (`ProductCard`). Layout components use responsive design with mobile-first approach and hover states with consistent transitions.

**Data Flow**: Products are typed unions (`Product = NativeProduct | ShopifyProductData`) allowing seamless switching between static and Shopify data sources. Use `isShopifyProduct()` type guard for differentiation.

## Critical Development Workflows

### Build Commands
- **Development**: `npm run dev` (standard Next.js)
- **CI Build**: `npm run build:ci` (uses dummy Shopify credentials for CI)
- **Production**: `npm run build` (requires real Shopify env vars)

### Quality Gates
All PRs run through **dual-node CI pipeline** (Node 18.x + 20.x) with:
```bash
npm run lint          # ESLint with Next.js config
npm run format:check  # Prettier formatting
npx tsc --noEmit     # TypeScript validation
npm run build:ci     # Build with dummy credentials
```

### Environment Setup
**Required**: `NEXT_PUBLIC_SHOPIFY_DOMAIN` and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
**Optional**: `NEXT_PUBLIC_GA_MEASUREMENT_ID` for analytics
**CI-Safe**: Dummy credentials in `package.json` scripts prevent CI failures

## Shopify Integration Specifics

### Client Initialization
`ShopifyProductManager` class handles client initialization with **graceful fallback**:
- Detects dummy/missing credentials and disables client
- Client-side only (`typeof window !== 'undefined'`)
- Uses Shopify Buy SDK v3 with API version `2023-01`

### Product Type System
```typescript
// Always check product type before Shopify operations
if (isShopifyProduct(product)) {
  // Safe to access product.shopifyProductId
  await shopifyManager.addToCart(product);
}
```

### Error Handling Pattern
Shopify operations should gracefully degrade - never break the UI if Shopify is unavailable. Native products always work as fallback.

## Project-Specific Conventions

### File Organization
- **Pages**: App Router in `src/app/` (layout.tsx pattern)
- **Components**: Reusable UI in `src/components/`
- **Data**: Static products in `src/data/`, types in `src/types/`
- **Lib**: Business logic like Shopify manager in `src/lib/`

### Styling Approach
- **No CSS modules** - pure Tailwind utility classes
- **Custom animations** defined in both `global.css` and Tailwind config
- **Responsive breakpoints**: Mobile-first with `md:` and `lg:` variants
- **Color palette**: Stick to defined brand colors, avoid arbitrary values

### Analytics Integration
Vercel Speed Insights and Analytics are configured in `layout.tsx`. Google Analytics uses environment variable pattern for optional inclusion.

## Common Pitfalls

1. **Shopify Client**: Always check `this.client` exists before operations
2. **Environment Variables**: Use `NEXT_PUBLIC_` prefix for client-side access
3. **Product Types**: Use type guards - don't assume Shopify vs native
4. **Mobile Navigation**: State management in `Navbar.tsx` handles menu toggle
5. **Build Process**: CI uses different script than production builds

## Key Files to Reference

- `src/lib/shopifyProductManager.ts` - Complete Shopify integration pattern
- `src/components/ProductCard.tsx` - Component styling patterns
- `tailwind.config.js` - Brand design system
- `src/types/product.ts` - Type system for hybrid data
- `.github/workflows/ci.yml` - Quality gates and CI patterns
