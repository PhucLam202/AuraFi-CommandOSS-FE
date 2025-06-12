"use client";

import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-sm">
      {/* Logo - Enhanced */}
      <div className="flex items-center">
        <div className="text-black font-bold text-xl px-4 py-2">
          AuraFi AI{" "}
        </div>
      </div>

      <div className="flex gap-6 items-center">
        <NavItem
          href="/"
          className="text-gray-700 font-semibold text-lg hover:text-blue-600"
        >
          Home
        </NavItem>
        <NavItem
          href="/about"
          className="text-gray-700 font-semibold text-lg hover:text-blue-600"
        >
          About
        </NavItem>
      </div>

      {/* CTA Button - Fixed typo and improved */}
      <Link
        href="/login"
        className="bg-gradient-to-r from-blue-500 to-amber-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        <div className="flex items-center justify-center cursor-pointer">
          <p className="text-white font-semibold text-lg">Launch Now</p>
        </div>
      </Link>
    </nav>
  );
}

function NavItem({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 ${className}`}
    >
      {children}
    </Link>
  );
}
