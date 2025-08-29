import React, { useState, useEffect } from "react";

const OfferDisplay = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 49,
    hours: 23,
    minutes: 14,
    seconds: 36,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Product Image */}
          <div className="relative flex justify-center">
            <div className=" rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg">
              <img
                src={
                  "https://elexy-demo.myshopify.com/cdn/shop/collections/Rectangle_396.png?v=1709445941&width=535"
                }
                alt="Air Fryer"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Sale Badge */}
            <div className="inline-block">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-lg">
                GET UP TO 65% OFF
              </span>
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-3 sm:mb-4">
                Pexoli Air Fryer
              </h1>
              <p className="text-2xl sm:text-3xl font-bold text-amber-600">
                $462.00
              </p>
            </div>

            {/* Product Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Electronics products continue to drive innovation and shape the
              way we live, work, and interact with our environment.
            </p>

            {/* Countdown Timer */}
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xs sm:max-w-md mx-auto lg:mx-0">
                {[
                  { value: timeLeft.days, label: "DAYS" },
                  { value: timeLeft.hours, label: "HRS" },
                  { value: timeLeft.minutes, label: "MIN" },
                  { value: timeLeft.seconds, label: "SEC" },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-1">
                      -{item.value.toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 font-medium tracking-wider">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between max-w-xs sm:max-w-md mx-auto lg:mx-0 text-gray-400 text-lg sm:text-2xl">
                <span>:</span>
                <span>:</span>
                <span>:</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2 sm:pt-4">
              <button className="group relative overflow-hidden bg-white border-2 border-gray-900 px-8 sm:px-12 py-3 sm:py-4 rounded-full text-gray-900 font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-gray-900 hover:text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-6 sm:pt-8 max-w-xs sm:max-w-md mx-auto lg:mx-0">
              {[
                "Energy Efficient",
                "Easy to Clean",
                "Digital Control",
                "Large Capacity",
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-2 sm:space-x-3"
                >
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm sm:text-base text-gray-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDisplay;
