"use client";
import { useState } from "react";
import { Search, Filter, ChevronDown, Star, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import FilterSidebar from "../components/filter";

const ShoppingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  const products = [
    {
      id: 1,
      name: "Pottu pookalam - onam earrings",
      price: 799.0,
      originalPrice: 999.0,
      image:
        "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/m/o/b/-original-imaghx9qkugtbfrn.jpeg?q=100",
      rating: 4.8,
      reviews: 124,
      colors: ["red", "gold"],
      isNew: true,
    },
    {
      id: 2,
      name: "Kasav n thetti poov - onam earrings",
      price: 545.0,
      image:
        "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/1/p/c/-original-imah9khhnfvstqka.jpeg?q=100",
      rating: 4.9,
      reviews: 89,
      colors: ["white", "red", "gold"],
      isBestseller: true,
    },
    {
      id: 3,
      name: "Marigold bloom - onam earring",
      price: 649.0,
      image:
        "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/u/r/r/-original-imah9khh8wgzdafb.jpeg?q=100",
      rating: 4.7,
      reviews: 156,
      colors: ["yellow", "green"],
    },
    {
      id: 4,
      name: "Zari glow - onam earrings",
      price: 465.0,
      originalPrice: 580.0,
      image:
        "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/m/o/b/-original-imaghx9qkugtbfrn.jpeg?q=100",
      rating: 4.6,
      reviews: 78,
      colors: ["white", "gold"],
    },
    {
      id: 5,
      name: "Banana leaf - onam earrings",
      price: 560.0,
      image:
        "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/1/p/c/-original-imah9khhnfvstqka.jpeg?q=100",
      rating: 4.8,
      reviews: 203,
      colors: ["green", "gold"],
      isNew: true,
    },
    {
      id: 6,
      name: "Onathumbi - onam earrings",
      price: 549.0,
      image:
        "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/u/r/r/-original-imah9khh8wgzdafb.jpeg?q=100",
      rating: 4.5,
      reviews: 67,
      colors: ["white", "gold"],
    },
  ];

  const categories = ["All", "Earrings", "Necklaces", "Bracelets", "Rings"];
  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-500", label: "₹0 - ₹500" },
    { value: "500-1000", label: "₹500 - ₹1000" },
    { value: "1000+", label: "₹1000+" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      product.name.toLowerCase().includes(selectedCategory.toLowerCase());

    let matchesPrice = true;
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map((p) => p.replace("+", ""));
      if (max) {
        matchesPrice =
          product.price >= parseInt(min) && product.price <= parseInt(max);
      } else {
        matchesPrice = product.price >= parseInt(min);
      }
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-4xl mx-auto">
            <div className="backdrop-blur-md bg-white/30 rounded-2xl border border-white/20 shadow-xl p-4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <div className="p-2 rounded-full bg-slate-800/90 backdrop-blur-sm">
                    <Search className="h-5 w-5 text-white" />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Search for diamonds, rings, necklaces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-6 py-4 text-md rounded-xl bg-white/40 border border-white/30 placeholder-slate-500 text-slate-800 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:bg-white/50 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar />

          {/* Main Content */}
          <div className="flex-1 order-2 lg:order-2">
            {/* Sort and Results Info */}
            <div className="backdrop-blur-md bg-white/25 rounded-2xl border border-white/30 shadow-xl p-6 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800 mb-1">
                    Onam Special Collection
                  </h2>
                  <p className="text-slate-600">
                    {filteredProducts.length} products found
                  </p>
                </div>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl px-4 py-3 pr-10 focus:bg-white/50 focus:ring-2 focus:ring-slate-400/50 outline-none cursor-pointer text-slate-700 font-medium transition-all duration-200"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => router.push(`/productDetails/`)}
                  className="group backdrop-blur-md bg-white/25 rounded-2xl border border-white/30 shadow-xl overflow-hidden hover:bg-white/35 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <div className="aspect-w-3 aspect-h-4 bg-gradient-to-br from-white/20 to-slate-100/20">
                      <div className="w-full h-48 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {product.isNew && (
                        <span className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                          New
                        </span>
                      )}
                      {product.isBestseller && (
                        <span className="bg-rose-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                          Bestseller
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-white/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/80 hover:scale-110 shadow-lg">
                      <Heart className="h-4 w-4 text-slate-600 hover:text-rose-500" />
                    </button>

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <button className="bg-white/90 backdrop-blur-sm text-slate-800 px-6 py-3 rounded-xl font-medium hover:bg-white transition-all duration-200 transform translate-y-4 group-hover:translate-y-0 shadow-lg border border-white/30">
                        Quick View
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors line-clamp-2 leading-snug">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Colors */}
                    <div className="flex gap-2 mb-4">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className={`w-5 h-5 rounded-full border-2 border-white/50 shadow-sm backdrop-blur-sm ${
                            color === "red"
                              ? "bg-red-500"
                              : color === "gold"
                              ? "bg-yellow-400"
                              : color === "white"
                              ? "bg-white"
                              : color === "yellow"
                              ? "bg-yellow-500"
                              : color === "green"
                              ? "bg-green-500"
                              : "bg-slate-400"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-semibold text-slate-800">
                          ₹{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-slate-500 line-through">
                            ₹{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="w-full text-sm bg-gradient-to-r from-slate-800 to-slate-700 text-white px-4 py-3 rounded-xl font-medium hover:from-slate-700 hover:to-slate-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* No Products Found */}
            {filteredProducts.length === 0 && (
              <div className="backdrop-blur-md bg-white/20 rounded-2xl border border-white/30 shadow-xl p-16 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                  <Search className="h-12 w-12 text-slate-500" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-3">
                  No products found
                </h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  Try adjusting your search or filter criteria to find what
                  you're looking for
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingPage;
