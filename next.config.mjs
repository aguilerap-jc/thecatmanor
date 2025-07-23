/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize images for Vercel deployment
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
};

export default nextConfig;
