import React from "react";
import { Star, ShoppingCart } from "lucide-react";

const ProductShowcase = () => {
  const products = [
    {
      id: 1,
      category: "Mobile",
      name: "Smart Phone 12",
      price: "2,900.00",
      originalPrice: null,
      rating: 5.0,
      reviews: 2,
      image:
        "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/m/o/b/-original-imaghx9qkugtbfrn.jpeg?q=100",
      hasOptions: true,
      inCart: false,
      onSale: false,
    },
    {
      id: 2,
      category: "Oven",
      name: "Maxoni Microwave Oven",
      price: "105,900.00",
      originalPrice: "122,500.00",
      rating: 4.0,
      reviews: 2,
      image:
        "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/1/p/c/-original-imah9khhnfvstqka.jpeg?q=100",
      hasOptions: true,
      inCart: false,
      onSale: true,
    },
    {
      id: 3,
      category: "elexy-demo",
      name: "Ornex Blender",
      price: "105,900.00",
      originalPrice: null,
      rating: null,
      reviews: null,
      image:
        "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/c/v/p/-original-imah4jyfcjgcghqs.jpeg?q=100",
      hasOptions: true,
      inCart: false,
      onSale: false,
    },
    {
      id: 4,
      category: "elexy-demo",
      name: "LF 7 pro",
      price: "39,700.00",
      originalPrice: null,
      rating: 5.0,
      reviews: 2,
      image:
        "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/u/r/r/-original-imah9khh8wgzdafb.jpeg?q=100",
      hasOptions: false,
      inCart: true,
      onSale: false,
    },
  ];

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Sale Badge */}
      {product.onSale && (
        <div className="absolute z-10 mt-4 ml-4">
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
            SALE
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="bg-gray-100 h-64 flex items-center justify-center relative overflow-hidden">
        <img
          src={product.image}
          className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          alt={product.name}
        />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-2">{product.category}</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-medium text-gray-900">
            From Rs. {product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              Rs. {product.originalPrice}
            </span>
          )}
        </div>

        {/* Actions and Rating */}
        <div className="flex items-center justify-between">
          {product.hasOptions ? (
            <button className="text-gray-700 font-medium underline underline-offset-2 hover:text-gray-900 transition-colors">
              + Select options
            </button>
          ) : product.inCart ? (
            <button className="flex items-center gap-2 text-gray-700 font-medium underline underline-offset-2 hover:text-gray-900 transition-colors">
              <ShoppingCart size={16} />
              Add to cart
            </button>
          ) : null}

          {product.rating && (
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviews})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div className="flex-1 max-w-2xl">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Highly Recommended
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Electronics products continue to drive innovation and shape the
              way we live, work, and interact with our environment.
            </p>
          </div>

          <div className="ml-8">
            <button className="px-8 py-3 border-2 border-gray-300 rounded-full text-gray-700 font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
              View All
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
