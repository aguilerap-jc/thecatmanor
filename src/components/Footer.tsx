import React from "react";

export default function Footer() {
  return (
    <footer className="bg-snow border-t border-ash mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-charcoal font-semibold text-lg">
          © {new Date().getFullYear()} The Cat Manor
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-ash hover:text-terracotta">Instagram</a>
          <a href="#" className="text-ash hover:text-terracotta">Pinterest</a>
        </div>
      </div>
    </footer>
  );
}