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
import { useRouter } from "next/navigation";

const Navbar = ({ isHome }) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(!isHome);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const navigationItems = [
    {
      name: "Home",
      href: "/",
      hasDropdown: true,
      dropOneHref: "/about",
      dropTwoHref: "/terms",
      dropThreeHref: "/faq",
      dropOne: "About Us",
      dropTwo: "T&C",
      dropThree: "FAQ",
    },
    {
      name: "Shop",
      href: "/Shop",
      hasDropdown: true,
      dropOneHref: "/Shop",
      dropTwoHref: "/Shop",
      dropThreeHref: "/Shop",
      dropOne: "All Products",
      dropTwo: "Popular Items",
      dropThree: "New Arrivals",
    },
    {
      name: "Products",
      href: "/products",
      dropOneHref: "/products",
      dropTwoHref: "/products/single",
      dropThreeHref: "/products/checkout",
      hasDropdown: true,
      dropOne: "About Us",
      dropTwo: "T&C",
      dropThree: "FAQ",
    },
    {
      name: "Pages",
      href: "/pages",
      dropOneHref: "/pages/about",
      dropTwoHref: "/pages/terms",
      dropThreeHref: "/pages/faq",
      hasDropdown: true,
      dropOne: "About Us",
      dropTwo: "T&C",
      dropThree: "FAQ",
    },
    {
      name: "Contact",
      href: "/contact",
      hasDropdown: false,
      dropOne: "About Us",
      dropTwo: "T&C",
      dropThree: "FAQ",
    },
  ];

  // Scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.08; // 8% of viewport height
      if (isHome) {
        setIsScrolled(scrollPosition > heroHeight);
      } else {
        setIsScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Toggle mobile dropdown
  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-50 ${
          isScrolled
            ? "bg-slate-900/95 backdrop-blur-md border-slate-700/50 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-white font-bold text-xl md:text-2xl lg:text-3xl tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Elexy
            </a>
          </div>

          {/* Right: Navigation + Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-1 lg:space-x-4">
                {navigationItems.map((item) => (
                  <div key={item.name} className="relative group">
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-white px-2 lg:px-4 py-2 lg:py-3 text-sm font-medium transition-all duration-300 flex items-center gap-1 hover:bg-slate-800/50 rounded-lg"
                    >
                      {item.name}
                      {item.hasDropdown && (
                        <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-300 group-hover:rotate-180" />
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
                            href={item.dropOneHref}
                            className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200"
                          >
                            {item.dropOne}
                          </a>
                          <a
                            href={item.dropTwoHref}
                            className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200"
                          >
                            {item.dropTwo}
                          </a>
                          <a
                            href={item.dropThreeHref}
                            className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors duration-200"
                          >
                            {item.dropThree}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right side icons (desktop only) */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <button className="text-gray-300 hover:text-white transition-all duration-300 p-2 lg:p-3 hover:bg-slate-800/50 rounded-xl hover:scale-110">
                <Search className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>

              <button
                onClick={() => router.push("/wishlist")}
                className="text-gray-300 hover:text-white transition-all duration-300 p-2 lg:p-3 hover:bg-slate-800/50 rounded-xl hover:scale-110 relative"
              >
                <Heart className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center font-bold animate-pulse">
                  0
                </span>
              </button>

              <button
                className="text-gray-300 hover:text-white transition-all duration-300 p-2 lg:p-3 hover:bg-slate-800/50 rounded-xl hover:scale-110 relative"
                onClick={() => router.push("/cart")}
              >
                <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center font-bold animate-pulse">
                  0
                </span>
              </button>

              <button
                className="text-gray-300 hover:text-white transition-all duration-300 p-2 lg:p-3 hover:bg-slate-800/50 rounded-xl hover:scale-110"
                onClick={() => router.push("/login")}
              >
                <User className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white transition-all duration-300 p-2 hover:bg-slate-800/50 rounded-xl"
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

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div
            className={`px-4 pt-2 pb-3 space-y-1 border-t ${
              isScrolled
                ? "bg-slate-800/95 backdrop-blur-md border-slate-700/50"
                : "bg-slate-900/90 backdrop-blur-md border-slate-600/30"
            }`}
          >
            {navigationItems.map((item) => (
              <div key={item.name}>
                <button
                  onClick={() => item.hasDropdown && toggleDropdown(item.name)}
                  className="w-full flex justify-between items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-xl"
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {item.hasDropdown && openDropdown === item.name && (
                  <div className="pl-6 space-y-1">
                    <a
                      href={item.dropOneHref}
                      className="block px-4 py-2 text-sm text-gray-400 hover:text-white"
                    >
                      {item.dropOne}
                    </a>
                    <a
                      href={item.dropTwoHref}
                      className="block px-4 py-2 text-sm text-gray-400 hover:text-white"
                    >
                      {item.dropTwo}
                    </a>
                    <a
                      href={item.dropThreeHref}
                      className="block px-4 py-2 text-sm text-gray-400 hover:text-white"
                    >
                      {item.dropThree}
                    </a>
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Icons */}
            <div className="flex justify-center space-x-4 pt-4 border-t border-slate-700/50">
              <button className="text-gray-300 hover:text-white transition-all duration-300 p-2 hover:bg-slate-800/50 rounded-xl">
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  router.push("/wishlist");
                  setIsMobileMenuOpen(false);
                }}
                className="text-gray-300 hover:text-white transition-all duration-300 p-2 hover:bg-slate-800/50 rounded-xl relative"
              >
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  0
                </span>
              </button>
              <button
                className="text-gray-300 hover:text-white transition-all duration-300 p-2 hover:bg-slate-800/50 rounded-xl relative"
                onClick={() => {
                  router.push("/cart");
                  setIsMobileMenuOpen(false);
                }}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  0
                </span>
              </button>
              <button
                className="text-gray-300 hover:text-white transition-all duration-300 p-2 hover:bg-slate-800/50 rounded-xl"
                onClick={() => {
                  router.push("/login");
                  setIsMobileMenuOpen(false);
                }}
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
