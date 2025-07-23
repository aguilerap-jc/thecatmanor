# The Cat Manor

Modern cat furniture designed to blend seamlessly with minimalistic, Scandinavian, and contemporary apartment styles.

## 🐱 About

The Cat Manor is an e-commerce website showcasing premium cat furniture including perches, wall steps, and sofas. Our products are designed for cat owners who value both functionality and aesthetic appeal in their living spaces.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Runtime**: [React 19](https://react.dev/)
- **Build Tool**: [PostCSS](https://postcss.org/) with Autoprefixer

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js**: Version 18.18.0 or higher
- **npm**: Version 9.0.0 or higher (comes with Node.js)

You can check your versions by running:
```bash
node --version
npm --version
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone git@github.com:aguilerap-jc/thecatmanor.git
   cd thecatmanor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy the environment example file:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then edit `.env.local` with your Shopify credentials:
   ```bash
   NEXT_PUBLIC_SHOPIFY_DOMAIN=your-shop-name.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
   ```

4. **Verify the installation**
   ```bash
   npm run build
   ```

## 🏃‍♂️ Running the Project

### Development Mode
Start the development server with hot reloading:
```bash
npm run dev
```
The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build
Build the application for production:
```bash
npm run build
```

### Start Production Server
After building, start the production server:
```bash
npm start
```

### Linting
Run ESLint to check for code quality issues:
```bash
npm run lint
```

## 📁 Project Structure

```
thecatmanor/
├── public/                 # Static assets
│   └── images/            # Product images and media
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── layout.tsx     # Root layout component
│   │   ├── page.tsx       # Home page
│   │   └── products/      # Products page
│   │       └── page.tsx
│   ├── components/        # Reusable UI components
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── ProductCard.tsx
│   ├── data/              # Static data and mock content
│   │   └── products.ts
│   └── global.css         # Global styles and Tailwind imports
├── next.config.mjs        # Next.js configuration
├── postcss.config.mjs     # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🛒 Shopify Integration

This project includes Shopify Buy Button integration for e-commerce functionality.

### Setup Shopify Integration

1. **Create a Shopify Store** or use an existing one
2. **Enable Storefront API**: 
   - Go to Apps → Manage private apps → Create private app
   - Enable Storefront API access
   - Copy your Storefront access token

3. **Get Product IDs**:
   - In Shopify Admin, go to Products
   - Open a product and copy the ID from the URL
   - Format as: `gid://shopify/Product/PRODUCT_ID`

4. **Update Product Data**:
   - Edit `src/data/products.ts`
   - Add `shopifyProductId` and `shopifyVariantId` to each product

### Environment Variables

Create a `.env.local` file with:
```bash
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-shop-name.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
```

## 🎨 Design System

The application uses a custom color palette inspired by modern, minimalist aesthetics:

- **Snow**: `#FAFAFA` - Primary background
- **Ash**: `#BDBDBD` - Secondary text
- **Charcoal**: `#333333` - Primary text
- **Dusty**: `#CBBBA0` - Accent color
- **Sage**: `#9BAF9B` - Primary brand color
- **Terracotta**: `#D17A66` - Call-to-action color

## 🚢 Deployment

This project is optimized for deployment on platforms like:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Docker** containers

For Vercel deployment:
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and configure the build settings
3. Deploy with a single click

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## 🐛 Troubleshooting

### Common Issues

**Build fails with PostCSS errors:**
- Ensure `@tailwindcss/postcss` is installed
- Check that `postcss.config.mjs` uses the correct syntax

**TypeScript errors:**
- Run `npm install --save-dev @types/node @types/react @types/react-dom`
- Verify `tsconfig.json` configuration

**Port 3000 already in use:**
- Kill the process: `lsof -ti:3000 | xargs kill -9`
- Or use a different port: `npm run dev -- -p 3001`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Juan Aguilera** - [@aguilerap-jc](https://github.com/aguilerap-jc)

---

*Built with ❤️ for cat lovers everywhere* 🐾