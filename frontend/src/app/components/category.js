import React from "react";

const CategorySelector = () => {
  const categories = [
    {
      id: 1,
      title: "Home Appliances",
      items: 1,
      image:
        "https://elexy-demo.myshopify.com/cdn/shop/collections/Rectangle_395.png?v=1709184724&width=535",
      bgGradient: "from-purple-600 via-blue-500 to-pink-500",
    },
    {
      id: 2,
      title: "PC & Laptop",
      items: 6,
      image:
        "https://elexy-demo.myshopify.com/cdn/shop/collections/Rectangle_398.png?v=1709445870&width=535",
      bgGradient: "from-orange-400 via-red-400 to-pink-400",
    },
    {
      id: 3,
      title: "Kitchen Appliances",
      items: 10,
      image:
        "https://elexy-demo.myshopify.com/cdn/shop/collections/Rectangle_399.png?v=1709445902&width=535",
      bgGradient: "from-green-600 via-emerald-500 to-teal-500",
    },
    {
      id: 4,
      title: "Phone & Tablet",
      items: 11,
      image:
        "https://elexy-demo.myshopify.com/cdn/shop/collections/Rectangle_397.png?v=1709445921&width=535",
      bgGradient: "from-slate-700 via-gray-600 to-slate-800",
    },
    {
      id: 5,
      title: "Accessories",
      items: 6,
      image:
        "https://elexy-demo.myshopify.com/cdn/shop/collections/Rectangle_396.png?v=1709445941&width=535",
      bgGradient: "from-cyan-400 via-teal-500 to-orange-400",
    },
  ];

  return (
    <div className="w-full max-w-8xl mx-auto  py-16 bg-white">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Choose your Category
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Smartwatches provide quick access to notifications, calls, messages,
          and apps right on your wrist, reducing the constantly check your
          phone.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center px-25">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            {/* Circular Image Container */}
            <div className="relative w-70 h-70 rounded-full overflow-hidden bg-white p-2 mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                {/* Display actual image inside circular div */}
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Category Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center group-hover:text-blue-600 transition-colors duration-300">
              {category.title}
            </h3>

            {/* Items Count */}
            <p className="text-gray-500 text-sm">{category.items} Items</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
