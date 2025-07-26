export default function NewArrivals() {
  const cards = [
    {
      badge: "NEW ARRIVAL",
      title: "Latest Qpad with keyboard",
      buttonText: "Buy Now",
      bgColor: "bg-gray-800",
      textColor: "text-white",
      badgeColor: "text-yellow-400",
      image:
        "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=300&fit=crop&auto=format&q=80",
    },
    {
      badge: "GET UP TO 35% OFF",
      title: "And then their was pro versions",
      buttonText: "Buy Now",
      bgColor: "bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900",
      textColor: "text-white",
      badgeColor: "text-purple-300",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&auto=format&q=80",
    },
    {
      badge: "HURRY UP!",
      title: "Modern & Style Headphone",
      buttonText: "Buy Now",
      bgColor: "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900",
      textColor: "text-white",
      badgeColor: "text-green-400",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&auto=format&q=80",
    },
  ];

  return (
    <div className="w-full bg-gray-50 py-4">
      <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`${card.bgColor} rounded-2xl overflow-hidden relative h-100 group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
            >
              {/* Content Section */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                {/* Badge and Title */}
                <div>
                  <div
                    className={`text-xs font-large ${card.badgeColor} mb-3 tracking-wide`}
                  >
                    {card.badge}
                  </div>
                  <h3
                    className={`text-3xl font-bold ${card.textColor} leading-tight mb-6 mt-5`}
                  >
                    {card.title}
                  </h3>
                  <button
                    className={`${card.textColor} text-sm font-semibold underline underline-offset-4 hover:no-underline transition-all duration-200`}
                  >
                    {card.buttonText}
                  </button>
                </div>
              </div>

              {/* Product Image - Full Background */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300 transform group-hover:scale-110"
                />
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
