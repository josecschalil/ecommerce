"use client";
import { useEffect, useState } from "react";
import { Search, ChevronDown, Star, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import FilterSidebar from "../components/filter";

const ShoppingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api/products/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Sort products based on selected option
  const sortedAndFilteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        product.category
          ?.toLowerCase()
          .includes(selectedCategory.toLowerCase());

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
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "newest":
          return new Date(b.created_at || 0) - new Date(a.created_at || 0);
        default:
          return 0;
      }
    });

  const handleProductClick = (productId) => {
    router.push(`/productDetails/${productId}`);
  };

  const renderStars = (rating) => {
    const ratingValue = rating || 0;
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(ratingValue)
            ? "text-yellow-400 fill-current"
            : "text-slate-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-slate-800 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <p className="text-slate-600 mb-4">Error loading products</p>
          <p className="text-sm text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

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
                    {sortedAndFilteredProducts.length} products found
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
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedAndFilteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="group backdrop-blur-md bg-white/25 rounded-2xl border border-white/30 shadow-xl overflow-hidden hover:bg-white/35 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <div className="aspect-w-3 aspect-h-4 bg-gradient-to-br from-white/20 to-slate-100/20">
                      <div className="w-full h-48 flex items-center justify-center">
                        <img
                          src={product.image1 || "/placeholder-image.jpg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Im0xMDAgNzUgMjUgMjUtMjUgMjUtMjUtMjUgMjUtMjV6IiBmaWxsPSIjZDFkNWRiIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmaWxsPSIjNmI3Mjg4Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+Cjwvc3ZnPgo=";
                          }}
                        />
                      </div>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/80 hover:scale-110 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent navigation when clicking wishlist
                        // Add to wishlist logic here
                      }}
                    >
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

                    {/* Category */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-slate-600 bg-slate-100/50 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-semibold text-slate-800">
                          ${product.price}
                        </span>
                        {product.original_price &&
                          product.original_price > product.price && (
                            <span className="text-sm text-slate-500 line-through">
                              ${product.original_price}
                            </span>
                          )}
                      </div>
                    </div>

                    {/* Key Features */}
                    {product.key_features &&
                      product.key_features.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm text-slate-600 line-clamp-2">
                            {product.key_features[0]}
                            {product.key_features.length > 1 && "..."}
                          </p>
                        </div>
                      )}

                    {/* Add to Cart Button */}
                    <button
                      className="w-full text-sm bg-gradient-to-r from-slate-800 to-slate-700 text-white px-4 py-3 rounded-xl font-medium hover:from-slate-700 hover:to-slate-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent navigation when clicking add to cart
                        // Add to cart logic here
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* No Products Found */}
            {sortedAndFilteredProducts.length === 0 && (
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
