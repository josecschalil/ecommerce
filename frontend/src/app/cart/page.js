"use client";
import React, { useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Heart,
  Star,
} from "lucide-react";

// The main CartPage component, which is the entire shopping cart page.
const CartPage = () => {
  // State for managing items in the cart.
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
      rating: 4.8,
      color: "Midnight Black",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center",
      rating: 4.6,
      color: "Space Gray",
    },
    {
      id: 3,
      name: "Minimalist Laptop Stand",
      price: 89.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center",
      rating: 4.9,
      color: "Silver",
    },
  ]);

  // Function to update the quantity of an item. Removes the item if quantity becomes 0.
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Function to remove an item from the cart.
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculates the total price of all items in the cart.
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Calculates the total number of items in the cart.
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Component to display when the cart is empty.
  const EmptyCart = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-16 md:py-24 flex items-center justify-center">
      <div className="max-w-md mx-auto w-full">
        {/* Empty State Card */}
        <div className="backdrop-blur-md bg-white/20 rounded-3xl border border-white/30 shadow-2xl p-6 sm:p-12 text-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-slate-200/50 to-slate-300/50 flex items-center justify-center backdrop-blur-sm">
            <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-slate-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-slate-800 mb-4">
            Your cart is empty
          </h2>
          <p className="text-slate-600 mb-8 max-w-sm mx-auto leading-relaxed">
            Looks like you haven't added anything yet. Start shopping to find
            amazing products!
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-2xl font-medium hover:from-slate-700 hover:to-slate-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );

  // If cart is empty, render the EmptyCart component.
  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  // Main component render for when the cart has items.
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="backdrop-blur-md bg-white/30 rounded-2xl border border-white/20 shadow-xl p-4 sm:p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-xl bg-white/40 hover:bg-white/60 transition-all duration-300 backdrop-blur-sm">
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">
                Shopping Cart
              </h1>
            </div>
            <div className="text-slate-600 font-medium">
              {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
            </div>
          </div>
        </div>

        {/* Main content grid: stacks on mobile, two columns on large screens. */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="backdrop-blur-md bg-white/25 rounded-2xl border border-white/30 shadow-xl p-4 sm:p-6 hover:bg-white/30 transition-all duration-300"
              >
                {/* Item layout: stacks on mobile, row on larger screens. */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Product Image */}
                  <div className="relative w-32 h-32 sm:w-24 sm:h-24 flex-shrink-0 mx-auto sm:mx-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full rounded-xl object-cover shadow-lg"
                    />
                    <button
                      onClick={() => {
                        // This would typically involve a wishlist state update
                        console.log(`Added ${item.name} to wishlist`);
                      }}
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white/50 backdrop-blur-sm text-red-500 flex items-center justify-center hover:bg-white/70 transition-colors duration-200 shadow-lg"
                      aria-label="Add to Wishlist"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-slate-800 text-base sm:text-lg pr-2">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 rounded-lg bg-white/40 hover:bg-red-100 text-slate-600 hover:text-red-600 transition-all duration-200 flex-shrink-0"
                          aria-label="Remove Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-slate-600">
                            {item.rating}
                          </span>
                        </div>
                        <span className="text-slate-400">•</span>
                        <span className="text-sm text-slate-600">
                          {item.color}
                        </span>
                      </div>
                    </div>

                    {/* Quantity and Price section */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center backdrop-blur-sm bg-white/40 rounded-lg border border-white/30">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2 hover:bg-white/50 transition-colors duration-200 rounded-l-lg"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4 text-slate-700" />
                        </button>
                        <span className="px-4 py-1 text-slate-800 font-medium min-w-[50px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-white/50 transition-colors duration-200 rounded-r-lg"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4 text-slate-700" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-lg sm:text-xl font-semibold text-slate-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-sm text-slate-500">
                            ${item.price.toFixed(2)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary: becomes sticky on large screens. */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-md bg-white/25 rounded-2xl border border-white/30 shadow-xl p-6 lg:sticky lg:top-12">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-700">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Tax (8%)</span>
                  <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                <hr className="border-white/30" />
                <div className="flex justify-between text-lg font-semibold text-slate-800">
                  <span>Total</span>
                  <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/40 border border-white/30 placeholder-slate-500 text-slate-800 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-400/50"
                  />
                  <button className="px-6 py-3 bg-white/40 hover:bg-white/60 rounded-xl border border-white/30 text-slate-700 font-medium transition-all duration-200 backdrop-blur-sm sm:w-auto w-full">
                    Apply
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <button className="w-full py-4 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-2xl font-semibold hover:from-slate-700 hover:to-slate-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg mb-4">
                Proceed to Checkout
              </button>
              <button className="w-full py-3 bg-white/40 hover:bg-white/60 text-slate-700 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm border border-white/30">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-12 backdrop-blur-md bg-white/20 rounded-2xl border border-white/30 shadow-xl p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">
            You might also like
          </h3>
          {/* Responsive grid for recommended items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                name: "Bluetooth Speaker",
                price: 79.99,
                image:
                  "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop&crop=center",
                rating: 4.5,
              },
              {
                name: "Wireless Charger",
                price: 49.99,
                image:
                  "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop&crop=center",
                rating: 4.7,
              },
              {
                name: "Phone Case",
                price: 29.99,
                image:
                  "https://images.unsplash.com/photo-1601593346740-925612772716?w=300&h=300&fit=crop&crop=center",
                rating: 4.4,
              },
            ].map((product, index) => (
              <div
                key={index}
                className="backdrop-blur-sm bg-white/30 rounded-xl border border-white/20 p-4 hover:bg-white/40 transition-all duration-300 group cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform duration-300"
                />
                <h4 className="font-medium text-slate-800 mb-1 truncate">
                  {product.name}
                </h4>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-slate-600">
                    {product.rating}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-slate-800">
                    ${product.price}
                  </span>
                  <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm hover:bg-slate-700 transition-colors duration-200">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
