"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  ShoppingCart,
  Zap,
  Share2,
} from "lucide-react";
import CustomerReviews from "../components/userReview";

const ProductDetailPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  // Sample product data
  const product = {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    description:
      "Experience exceptional sound quality with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium materials for all-day comfort.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium leather padding",
      "Bluetooth 5.0 connectivity",
      "Quick charge - 5 min for 2 hours",
    ],
    images: [
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/m/o/b/-original-imaghx9qkugtbfrn.jpeg",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/m/o/b/-original-imaghx9qkugtbfrn.jpeg",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/m/o/b/-original-imaghx9qkugtbfrn.jpeg",
      "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/m/o/b/-original-imaghx9qkugtbfrn.jpeg",
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 1247,
  };

  // Sample reviews data (assuming CustomerReviews component uses it)
  const reviews = [
    /* ... your reviews data ... */
  ];

  // Sample similar products
  const similarProducts = [
    /* ... your similar products data ... */
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-25">
        {/* --- MODIFICATION START --- */}
        {/* Main Product Section: Changed to Flex for mobile ordering, and back to Grid for desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 mb-16">
          {/* Block 1: Product Info (Name, Rating, Price) */}
          {/* On mobile, this is order-1 (first). On desktop, it's order-2 (top of the right column). */}
          <div className="order-1 lg:order-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              <span className="text-xl text-gray-500 line-through">
                ${product.originalPrice}
              </span>
              <span className="bg-red-100 text-red-800 px-2 py-1 text-sm font-medium">
                25% OFF
              </span>
            </div>
          </div>

          {/* Block 2: Image Carousel */}
          {/* On mobile, this is order-2 (second). On desktop, it's order-1 (the left column). */}
          <div className="space-y-4 text-black order-2 lg:order-1 lg:row-span-2">
            <div className="relative bg-gray-50 backdrop-blur-sm border border-gray-200 overflow-hidden aspect-square">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-scale-down"
                priority
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm border border-gray-200 p-2 hover:bg-white transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm border border-gray-200 p-2 hover:bg-white transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 p-2 hover:bg-white transition-all duration-200 rounded-full shadow-sm hover:shadow-md"
                  aria-label="Share product"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 p-2 hover:bg-white transition-all duration-200 rounded-full shadow-sm hover:shadow-md"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square bg-gray-50 border-2 ${
                    currentImageIndex === index
                      ? "border-black"
                      : "border-gray-200"
                  } hover:border-gray-400 transition-colors duration-200`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-scale-down"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Block 3: Product Details (Description, Size, Quantity, Buttons) */}
          {/* On mobile, this is order-3 (third). On desktop, it's order-3 (bottom of the right column). */}
          <div className="space-y-6 order-3 lg:order-3">
            <div className="bg-gray-50/50 backdrop-blur-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Product Description
              </h3>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-700 text-sm">
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 border-2 text-center text-black font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-white hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-3">Quantity</h3>
              <div className="flex items-center space-x-3 text-black">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center font-bold"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-black text-white py-4 px-6 font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Buy Now</span>
              </button>
              <button className="w-full bg-white border-2 border-black text-black py-4 px-6 font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
        {/* --- MODIFICATION END --- */}

        {/* Customer Reviews Section */}
        <div className="mb-16">
          <CustomerReviews />
        </div>
        {/* Similar Products Section */}
        <div>{/* ... your similar products JSX ... */}</div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
