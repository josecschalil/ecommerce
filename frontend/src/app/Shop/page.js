"use client";
import { useState } from "react";
import { Search, Filter, ChevronDown, Star, Heart } from "lucide-react";
import FilterSidebar from "../components/filter";

const ShoppingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: "Pottu pookalam - onam earrings",
      price: 799.0,
      originalPrice: 999.0,
      image: "/api/placeholder/300/400",
      rating: 4.8,
      reviews: 124,
      colors: ["red", "gold"],
      isNew: true,
    },
    {
      id: 2,
      name: "Kasav n thetti poov - onam earrings",
      price: 545.0,
      image: "/api/placeholder/300/400",
      rating: 4.9,
      reviews: 89,
      colors: ["white", "red", "gold"],
      isBestseller: true,
    },
    {
      id: 3,
      name: "Marigold bloom - onam earring",
      price: 649.0,
      image: "/api/placeholder/300/400",
      rating: 4.7,
      reviews: 156,
      colors: ["yellow", "green"],
    },
    {
      id: 4,
      name: "Zari glow - onam earrings",
      price: 465.0,
      originalPrice: 580.0,
      image: "/api/placeholder/300/400",
      rating: 4.6,
      reviews: 78,
      colors: ["white", "gold"],
    },
    {
      id: 5,
      name: "Banana leaf - onam earrings",
      price: 560.0,
      image: "/api/placeholder/300/400",
      rating: 4.8,
      reviews: 203,
      colors: ["green", "gold"],
      isNew: true,
    },
    {
      id: 6,
      name: "Onathumbi - onam earrings",
      price: 549.0,
      image: "/api/placeholder/300/400",
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar - Moved to the top */}
        <div className="mb-6">
          <div className="relative max-w-4xl mx-auto">
            {/* Main search tile */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 backdrop-blur-lg bg-white/90">
              <div className="relative">
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
                  <div className="p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
                    <Search className="h-5 w-5 text-white" />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Search for diamonds, rings, necklaces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-20 pr-6 py-3 text-md rounded-2xl border-2 border-gray-200 focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none bg-gray-50/50 transition-all duration-300 placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Sidebar Filters - Now positioned after search bar on mobile */}
          <div className="lg:w-65 order-1 lg:order-1">
            <FilterSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 order-2 lg:order-2">
            {/* Sort and Results Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Onam Special Collection
                </h2>
                <p className="text-gray-600">
                  {filteredProducts.length} products found
                </p>
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white/70 backdrop-blur-sm border border-rose-200 rounded-full px-4 py-2 pr-8 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm border border-rose-100 hover:shadow-lg hover:border-rose-200 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <div className="aspect-w-3 aspect-h-4 bg-gradient-to-br from-rose-100 to-amber-100">
                      <div className="w-full h-80 flex items-center justify-center text-gray-400 text-sm">
                        Product Image
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {product.isNew && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          New
                        </span>
                      )}
                      {product.isBestseller && (
                        <span className="bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Bestseller
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110">
                      <Heart className="h-4 w-4 text-gray-600 hover:text-rose-500" />
                    </button>

                    {/* Quick View */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform duration-200">
                        Quick View
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "text-amber-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Colors */}
                    <div className="flex gap-2 mb-4">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className={`w-4 h-4 rounded-full border-2 border-gray-200 ${
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
                              : "bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900">
                          ₹{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <button className="bg-gradient-to-r from-rose-500 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
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
