"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Search, ChevronDown, Star, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import FilterSidebar from "../components/filter";
import Pagination from "../components/pagination";

const ShoppingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Debounce function to prevent too many API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const fetchProducts = async (page = 1, pageSize = itemsPerPage) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page,
        page_size: pageSize,
      });

      // Add filters to the API call
      if (searchQuery) params.append("search", searchQuery);
      if (selectedCategory !== "All")
        params.append("category", selectedCategory);

      // Add price range filtering if needed
      if (priceRange !== "all") {
        const [min, max] = priceRange.split("-").map((p) => p.replace("+", ""));
        if (min) params.append("min_price", min);
        if (max) params.append("max_price", max);
      }

      // Add sorting
      if (sortBy !== "featured") {
        const sortMapping = {
          "price-low": "price",
          "price-high": "-price",
          newest: "-created_at",
        };
        params.append("ordering", sortMapping[sortBy] || "name");
      }

      const response = await fetch(
        `http://127.0.0.1:8000/api/products/?${params}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data = await response.json();

      // Handle both paginated response and simple array
      if (data.results) {
        // Paginated response
        setProducts(data.results);
        setTotalItems(data.count);
        setTotalPages(Math.ceil(data.count / pageSize));
      } else if (Array.isArray(data)) {
        // Simple array response (fallback)
        setProducts(data);
        setTotalItems(data.length);
        setTotalPages(Math.ceil(data.length / pageSize));
      } else {
        setProducts([]);
        setTotalItems(0);
        setTotalPages(0);
      }

      setCurrentPage(page);
      setItemsPerPage(pageSize);

      // Extract unique categories from all products (for filter sidebar)
      if (data.results || Array.isArray(data)) {
        const productsArray = data.results || data;
        const uniqueCategories = [
          ...new Set(
            productsArray.map((product) => product.category).filter(Boolean)
          ),
        ];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage, newItemsPerPage = itemsPerPage) => {
    if (newItemsPerPage !== itemsPerPage) {
      fetchProducts(1, newItemsPerPage);
    } else {
      fetchProducts(newPage, newItemsPerPage);
    }
  };

  // Debounced fetch for search
  const debouncedFetchProducts = useCallback(
    debounce((page = 1, pageSize = itemsPerPage) => {
      fetchProducts(page, pageSize);
    }, 300),
    []
  );

  // Initial fetch and when filters change
  useEffect(() => {
    fetchProducts(1, itemsPerPage);
  }, []); // Empty dependency array for initial fetch only

  // Fetch when filters change (with debounce)
  useEffect(() => {
    debouncedFetchProducts(1, itemsPerPage);
  }, [
    searchQuery,
    selectedCategory,
    priceRange,
    sortBy,
    debouncedFetchProducts,
    itemsPerPage,
  ]);

  const handleProductClick = (productId) => {
    router.push(`/productDetails/${productId}`);
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
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-6 py-4 text-md rounded-xl bg-white/40 border border-white/30 placeholder-slate-500 text-slate-800 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:bg-white/50 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            categories={categories}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results Info */}
            <div className="backdrop-blur-md bg-white/25 rounded-2xl border border-white/30 shadow-xl p-6 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800 mb-1">
                    Product Collection
                  </h2>
                  <p className="text-slate-600">
                    Showing {(currentPage - 1) * itemsPerPage + 1}-
                    {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
                    {totalItems} products
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full"
                >
                  {/* Image Container with Fixed Aspect Ratio */}
                  <div className="relative overflow-hidden aspect-square bg-gray-50 flex items-center justify-center p-4">
                    <img
                      src={product.image1 || "/placeholder-image.jpg"}
                      alt={product.name}
                      className="w-full h-full object-contain max-h-48 group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Im0xMDAgNzUgMjUgMjUtMjUgMjUtMjUtMjUgMjUtMjV6IiBmaWxsPSIjZDFkNWRiIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmaWxsPSIjNmI3Mjg4Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+Cjwvc3ZnPgo=";
                      }}
                    />

                    {/* Wishlist Button */}
                    <button
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-sm border border-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Heart className="h-4 w-4 text-gray-600 hover:text-rose-500" />
                    </button>
                  </div>

                  {/* Content Container */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors line-clamp-2 text-sm leading-tight min-h-[2.5rem]">
                      {product.name}
                    </h3>

                    {/* Category */}
                    {product.category && (
                      <div className="mb-2">
                        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          ${product.price}
                        </span>
                        {product.original_price &&
                          product.original_price > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.original_price}
                            </span>
                          )}
                      </div>
                    </div>

                    {/* Key Features Preview */}
                    {product.key_features &&
                      product.key_features.length > 0 && (
                        <div className="mb-3 flex-grow">
                          <ul className="text-xs text-gray-600 space-y-1">
                            {product.key_features
                              .slice(0, 2)
                              .map((feature, index) => (
                                <li key={index} className="line-clamp-1">
                                  • {feature}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                    {/* Add to Cart Button */}
                    <button
                      className="w-full text-xs bg-gray-900 text-white px-3 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 mt-auto" // mt-auto pushes to bottom
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
              />
            )}

            {/* No Products Found */}
            {products.length === 0 && !loading && (
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
