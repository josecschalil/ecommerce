"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  ShoppingCart,
  Zap,
  Share2,
} from "lucide-react";
import CustomerReviews from "@/app/components/userReview";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/api/products/${id}/`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);

        // Set default size if available
        if (data.size && data.size.length > 0) {
          setSelectedSize(data.size[0]);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  // Get all product images from the API response
  const productImages = product
    ? [product.image1, product.image2, product.image3, product.image4].filter(
        (img) => img
      )
    : [];

  const nextImage = () => {
    if (productImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }
  };

  const prevImage = () => {
    if (productImages.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + productImages.length) % productImages.length
      );
    }
  };

  const renderStars = (rating) => {
    const ratingValue = rating || 0;
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(ratingValue)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <p className="text-gray-600 mb-4">Error loading product</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Product not found</p>
        </div>
      </div>
    );
  }

  // Calculate discount percentage
  const discountPercentage =
    product.original_price && product.price
      ? Math.round(
          ((product.original_price - product.price) / product.original_price) *
            100
        )
      : 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-30">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Info */}
          <div className="order-1 lg:order-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {renderStars(product.rating || 4.5)}
              </div>
              <span className="text-sm text-gray-600">
                ({product.review_count || 0} reviews)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.original_price &&
                product.original_price > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.original_price}
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 text-sm font-medium">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
            </div>
          </div>

          {/* Image Carousel */}
          <div className="space-y-4 text-black order-2 lg:order-1 lg:row-span-2">
            {productImages.length > 0 ? (
              <>
                <div className="relative bg-gray-50 backdrop-blur-sm border border-gray-200 overflow-hidden aspect-square">
                  <Image
                    src={productImages[currentImageIndex]}
                    alt={product.name}
                    fill
                    className="object-scale-down"
                    priority
                  />
                  {productImages.length > 1 && (
                    <>
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
                    </>
                  )}
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
                {productImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {productImages.map((image, index) => (
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
                )}
              </>
            ) : (
              <div className="relative bg-gray-50 border border-gray-200 aspect-square flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6 order-3 lg:order-3">
            <div className="bg-gray-50/50 backdrop-blur-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Product Description
              </h3>
              <p className="text-gray-700 mb-4">{product.description}</p>
              {product.key_features && product.key_features.length > 0 && (
                <>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Key Features:
                  </h4>
                  <ul className="space-y-1">
                    {product.key_features.map((feature, index) => (
                      <li key={index} className="text-gray-700 text-sm">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {product.size && product.size.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.size.map((size) => (
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
            )}

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

        {/* Customer Reviews Section */}
        <div className="mb-16">
          <CustomerReviews />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
