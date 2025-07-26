import {
  ChevronDown,
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigationItems = [
    { name: "Home", href: "/", hasDropdown: true },
    { name: "Shop", href: "/shop", hasDropdown: true },
    { name: "Products", href: "/products", hasDropdown: true },
    { name: "Pages", href: "/pages", hasDropdown: true },
    { name: "Contact", href: "/contact", hasDropdown: false },
  ];
  // Scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.08; // 80vh
      setIsScrolled(scrollPosition > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-8xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-white font-bold text-3xl tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Elexy
            </a>
          </div>

          {/* Right: Navigation + Icons */}
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                {navigationItems.map((item) => (
                  <div key={item.name} className="relative group">
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-white px-4 py-3 text-sm font-medium transition-all duration-300 flex items-center gap-1 hover:bg-slate-800/50 rounded-lg"
                    >
                      {item.name}
                      {item.hasDropdown && (
                        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                      )}
                    </a>

                    {item.hasDropdown && (
                      <div
                        className={`absolute top-full left-0 mt-2 w-48 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border ${
                          isScrolled
                            ? "bg-slate-800/95 backdrop-blur-md border-slate-700/50"
                            : "bg-slate-900/90 backdrop-blur-md border-slate-600/30"
                        }`}
                      >
                        <div className="py-2">
                          <a
                            href="#"
                            className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200"
                          >
                            Submenu Item 1
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200"
                          >
                            Submenu Item 2
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200"
                          >
                            Submenu Item 3
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-2">
              <button className="text-gray-300 hover:text-white transition-all duration-300 p-3 hover:bg-slate-800/50 rounded-xl hover:scale-110">
                <Search className="w-5 h-5" />
              </button>

              <button className="text-gray-300 hover:text-white transition-all duration-300 p-3 hover:bg-slate-800/50 rounded-xl hover:scale-110 relative hidden md:block">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                  0
                </span>
              </button>

              <button className="text-gray-300 hidden md:block hover:text-white transition-all duration-300 p-3 hover:bg-slate-800/50 rounded-xl hover:scale-110 relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                  0
                </span>
              </button>

              <button className="text-gray-300 hidden md:block hover:text-white transition-all duration-300 p-3 hover:bg-slate-800/50 rounded-xl hover:scale-110">
                <User className="w-5 h-5" />
              </button>

              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-300 hover:text-white transition-all duration-300 p-3 hover:bg-slate-800/50 rounded-xl"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden ">
            <div
              className={`px-4 pt-2 pb-3 space-y-1 border-t transition-all duration-300 ${
                isScrolled
                  ? "bg-slate-800/95 backdrop-blur-md border-slate-700/50"
                  : "bg-slate-900/90 backdrop-blur-md border-slate-600/30"
              }`}
            >
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white block px-4 py-3 text-base font-medium transition-all duration-300 hover:bg-slate-700/50 rounded-xl"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
