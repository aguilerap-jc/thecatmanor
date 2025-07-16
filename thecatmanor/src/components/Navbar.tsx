import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-snow border-b border-ash">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-charcoal tracking-tight">
          The Cat Manor
        </Link>
        <div className="space-x-6">
          <Link href="/products" className="text-charcoal hover:text-terracotta font-medium">
            Products
          </Link>
          <a href="#" className="text-charcoal hover:text-terracotta font-medium">
            About
          </a>
          <a href="#" className="text-charcoal hover:text-terracotta font-medium">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}