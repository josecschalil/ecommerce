"use client";
import React, { useState } from "react";
import {
  Heart,
  ArrowLeft,
  Star,
  ShoppingCart,
  Trash2,
  Share2,
  Eye,
} from "lucide-react";

const ProfileWishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Pottu pookalam - onam earrings",
      price: 799.0,
      originalPrice: 999.0,
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 124,
      colors: ["red", "gold"],
      inStock: true,
      isNew: true,
      addedDate: "2 days ago",
    },
    {
      id: 2,
      name: "Kasav n thetti poov - onam earrings",
      price: 545.0,
      image:
        "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      reviews: 89,
      colors: ["white", "red", "gold"],
      inStock: true,
      isBestseller: true,
      addedDate: "1 week ago",
    },
    {
      id: 3,
      name: "Marigold bloom - onam earring",
      price: 649.0,
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center",
      rating: 4.7,
      reviews: 156,
      colors: ["yellow", "green"],
      inStock: false,
      addedDate: "3 days ago",
    },
    {
      id: 4,
      name: "Zari glow - onam earrings",
      price: 465.0,
      originalPrice: 580.0,
      image:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      reviews: 78,
      colors: ["white", "gold"],
      inStock: true,
      addedDate: "5 days ago",
    },
    {
      id: 5,
      name: "Banana leaf - onam earrings",
      price: 560.0,
      image:
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      reviews: 203,
      colors: ["green", "gold"],
      inStock: true,
      isNew: true,
      addedDate: "1 day ago",
    },
  ]);

  const [selectedItems, setSelectedItems] = useState(new Set());

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const toggleSelection = (id) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const moveToCart = (id) => {
    console.log(`Moving item ${id} to cart`);
    removeFromWishlist(id);
  };

  const addAllToCart = () => {
    const availableItems = wishlistItems.filter(
      (item) => item.inStock && selectedItems.has(item.id)
    );
    console.log(`Adding ${availableItems.length} items to cart`);
    availableItems.forEach((item) => removeFromWishlist(item.id));
  };

  const EmptyWishlist = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-2 md:py-2">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-md bg-white/30 rounded-2xl border border-white/20 shadow-xl p-4 md:px-6 md:pb-6 mb-6 md:mb-8">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-xl bg-white/40 hover:bg-white/60 transition-all duration-300 backdrop-blur-sm">
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
            <h1 className="text-xl md:text-2xl font-semibold text-slate-800">
              My Wishlist
            </h1>
          </div>
        </div>
        <div className="backdrop-blur-md bg-white/20 rounded-3xl border border-white/30 shadow-2xl p-6 md:p-12 text-center">
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 md:mb-8 rounded-full bg-gradient-to-br from-rose-200/50 to-pink-300/50 flex items-center justify-center backdrop-blur-sm">
            <Heart className="w-10 h-10 md:w-16 md:h-16 text-rose-500" />
          </div>
          <h2 className="text-xl md:text-3xl font-light text-slate-800 mb-3 md:mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-slate-600 mb-6 md:mb-8 max-w-md mx-auto leading-relaxed text-sm md:text-base">
            Save your favorite items here and never lose track of what you love.
            Start browsing to add items to your wishlist!
          </p>
          <button className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-xl md:rounded-2xl font-medium hover:from-slate-700 hover:to-slate-600 transform hover:scale-105 transition-all duration-300 shadow-lg text-sm md:text-base">
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );

  if (wishlistItems.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-2 md:py-2">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="backdrop-blur-md bg-white/30 rounded-2xl border border-white/20 shadow-xl p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-xl bg-white/40 hover:bg-white/60 transition-all duration-300 backdrop-blur-sm">
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-slate-800">
                  My Wishlist
                </h1>
                <p className="text-slate-600 text-sm md:text-base">
                  {wishlistItems.length} items saved
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 md:p-3 rounded-xl bg-white/40 hover:bg-white/60 transition-all duration-300 backdrop-blur-sm">
                <Share2 className="w-4 h-4 md:w-5 md:h-5 text-slate-700" />
              </button>
              {selectedItems.size > 0 && (
                <button
                  onClick={addAllToCart}
                  className="px-4 py-2 md:px-5 md:py-2.5 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-lg md:rounded-xl font-medium hover:from-slate-700 hover:to-slate-600 transition-all duration-300 shadow-lg text-sm"
                >
                  Add ({selectedItems.size})
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          <div className="lg:w-1/3 lg:order-2">
            <div className="backdrop-blur-md bg-white/25 rounded-2xl border border-white/30 shadow-xl p-4 md:p-6 lg:sticky top-6">
              <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-4 md:mb-6">
                Wishlist Summary
              </h2>
              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="flex justify-between text-slate-700 text-sm md:text-base">
                  <span>Total Items</span>
                  <span className="font-medium">{wishlistItems.length}</span>
                </div>
                <div className="flex justify-between text-slate-700 text-sm md:text-base">
                  <span>In Stock</span>
                  <span className="font-medium text-green-600">
                    {wishlistItems.filter((item) => item.inStock).length}
                  </span>
                </div>
                <hr className="border-white/30" />
                <div className="flex justify-between text-slate-700 text-sm md:text-base">
                  <span>Selected Items</span>
                  <span className="font-medium">{selectedItems.size}</span>
                </div>
                {selectedItems.size > 0 && (
                  <div className="flex justify-between text-base md:text-lg font-semibold text-slate-800">
                    <span>Selected Total</span>
                    <span>
                      ₹
                      {wishlistItems
                        .filter((item) => selectedItems.has(item.id))
                        .reduce((total, item) => total + item.price, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-2 md:space-y-3">
                <button
                  onClick={addAllToCart}
                  disabled={selectedItems.size === 0}
                  className={`w-full py-3 md:py-3.5 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                    selectedItems.size > 0
                      ? "bg-gradient-to-r from-slate-800 to-slate-700 text-white hover:from-slate-700 hover:to-slate-600 transform hover:scale-[1.02] shadow-lg"
                      : "bg-slate-300/50 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  Add Selected to Cart
                </button>
                <button
                  onClick={() =>
                    setSelectedItems(
                      new Set(
                        wishlistItems
                          .filter((item) => item.inStock)
                          .map((item) => item.id)
                      )
                    )
                  }
                  className="w-full py-2.5 md:py-3 bg-white/40 hover:bg-white/60 text-slate-700 rounded-lg md:rounded-xl font-medium transition-all duration-200 backdrop-blur-sm border border-white/30 text-sm md:text-base"
                >
                  Select All Available
                </button>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 lg:order-1 space-y-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="backdrop-blur-md bg-white/25 rounded-2xl border border-white/30 shadow-xl p-4 md:p-5 hover:bg-white/30 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 pt-1">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.id)}
                        onChange={() => toggleSelection(item.id)}
                        className="w-5 h-5 rounded border-2 border-white/50 bg-white/40 backdrop-blur-sm focus:ring-2 focus:ring-slate-400/50"
                      />
                    </div>
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover shadow-lg"
                      />
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <span className="text-white text-xs font-medium bg-red-500/90 px-2 py-1 rounded-full">
                            Out of Stock
                          </span>
                        </div>
                      )}
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition-colors duration-200 shadow-lg"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="font-semibold text-slate-800 text-base md:text-lg line-clamp-2">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="p-2 rounded-lg bg-white/40 hover:bg-red-100 text-slate-600 hover:text-red-600 transition-all duration-200 flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {item.isNew && (
                          <span className="bg-green-500/90 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                            New
                          </span>
                        )}
                        {item.isBestseller && (
                          <span className="bg-rose-500/90 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                            Bestseller
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-slate-600">
                            {item.rating}
                          </span>
                        </div>
                        <span className="text-slate-400 text-xs">•</span>
                        <span className="text-sm text-slate-600">
                          {item.reviews} reviews
                        </span>
                      </div>
                    </div>
                    <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg md:text-xl font-semibold text-slate-800">
                          ₹{item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-slate-500 line-through">
                            ₹{item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => moveToCart(item.id)}
                        disabled={!item.inStock}
                        className={`w-full sm:w-auto px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
                          item.inStock
                            ? "bg-gradient-to-r from-slate-800 to-slate-700 text-white hover:from-slate-700 hover:to-slate-600 shadow-lg hover:scale-105"
                            : "bg-slate-300/50 text-slate-500 cursor-not-allowed"
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {item.inStock ? "Add to Cart" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWishlistPage;
