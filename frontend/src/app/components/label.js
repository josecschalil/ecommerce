import { Truck, CreditCard, Gift } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Shipping",
      description: "Free shipping for order over $250",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Flexible Payment",
      description: "Easy and secure payment system",
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Earn Point",
      description: "Shop more and earn points",
    },
  ];

  return (
    <div className="w-full bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              {/* Icon Container */}
              <div className="flex-shrink-0 w-14 h-14 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm">
                <div className="text-gray-700">{feature.icon}</div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
