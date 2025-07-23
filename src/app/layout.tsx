import type { Metadata } from 'next';
import React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../global.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'The Cat Manor – Modern Cat Furniture',
  description: 'Beautiful, modern cat furniture for stylish apartments.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-snow text-charcoal min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
