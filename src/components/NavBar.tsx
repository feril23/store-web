"use client";

import { Menu, ShoppingCart, Utensils, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/#CTASection");

    // This scrolling logic might need adjustment in Next.js
    // if the target is on a different page.
    setTimeout(() => {
      const element = document.getElementById("CTASection");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const navigationItems = [
    { id: "home", label: "Beranda", href: "/" },
    { id: "catalog", label: "Daftar eBook", href: "/catalog" },
    { id: "faq", label: "FAQ", href: "/faq" },
    { id: "contact", label: "Kontak", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <Utensils className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-800">ChikaRasa</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-green-600 ${
                  pathname === item.href ? "text-green-600" : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA & Stats */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/#CTASection"
              onClick={handleCTAClick}
              className="bg-green-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <ShoppingCart className="h-4 w-4 inline mr-2" />
              Beli Sekarang
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)} // Close menu on click
                  className={`text-left text-sm font-medium transition-colors hover:text-green-600 ${
                    pathname === item.href ? "text-green-600" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <a
                  href="/#CTASection"
                  onClick={(e) => {
                    handleCTAClick(e);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center bg-green-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-200"
                >
                  <ShoppingCart className="h-4 w-4 inline mr-2" />
                  Beli Sekarang
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
