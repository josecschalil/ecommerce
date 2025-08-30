"use client";
import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Truck,
  Shield,
  Heart,
  Globe,
  Award,
  Users,
  Star,
  Package,
  CreditCard,
  Headphones,
  ChevronRight,
  MapPin,
  Mail,
  Phone,
  Clock,
} from "lucide-react";

const AboutUsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: "1M+", label: "Products Sold", icon: Package },
    { number: "250K+", label: "Happy Customers", icon: Users },
    { number: "99.8%", label: "Customer Satisfaction", icon: Star },
    { number: "50+", label: "Countries Delivered", icon: Globe },
  ];

  const features = [
    {
      icon: Truck,
      title: "Fast & Free Shipping",
      description:
        "Free shipping on orders over $50. Express delivery available.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description:
        "Your data is protected with bank-level security encryption.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: CreditCard,
      title: "Easy Returns",
      description: "30-day hassle-free returns. No questions asked policy.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description:
        "Round-the-clock customer service via chat, email, or phone.",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const team = [
    {
      name: "Emily Zhang",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Former retail executive passionate about creating seamless shopping experiences.",
      achievement: "Built 3 successful ecommerce brands",
    },
    {
      name: "Alex Rivera",
      role: "Head of Product",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Product strategist focused on customer-centric innovation.",
      achievement: "Led product teams at major retailers",
    },
    {
      name: "Sophie Chen",
      role: "Customer Experience Director",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Dedicated to making every customer interaction exceptional.",
      achievement: "Improved customer satisfaction by 40%",
    },
    {
      name: "James Wilson",
      role: "Supply Chain Manager",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Logistics expert ensuring timely delivery worldwide.",
      achievement: "Reduced delivery times by 50%",
    },
  ];

  const timeline = [
    {
      year: "2020",
      title: "The Beginning",
      description:
        "Started as a small online store with big dreams and 10 products.",
      milestone: "First 100 orders",
    },
    {
      year: "2021",
      title: "Rapid Growth",
      description: "Expanded to 1,000+ products and launched mobile app.",
      milestone: "10K customers milestone",
    },
    {
      year: "2022",
      title: "Global Reach",
      description:
        "International shipping to 25 countries with local warehouses.",
      milestone: "Global expansion achieved",
    },
    {
      year: "2023",
      title: "Technology Innovation",
      description: "Launched AI-powered recommendations and virtual try-on.",
      milestone: "100K products in catalog",
    },
    {
      year: "2024",
      title: "Sustainability Focus",
      description:
        "Introduced eco-friendly packaging and carbon-neutral shipping.",
      milestone: "Carbon neutral operations",
    },
    {
      year: "2025",
      title: "Market Leadership",
      description:
        "Became the preferred choice for millions of shoppers worldwide.",
      milestone: "1M+ products sold",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Our Story Section */}
      <section className="py-35">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2020, ShopMart began with a simple belief: shopping
                online should be as enjoyable and trustworthy as visiting your
                favorite local store. What started as a small team with big
                dreams has grown into a global marketplace serving millions of
                customers.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Today, we're proud to offer over 100,000 carefully curated
                products from trusted brands and emerging creators. Every item
                in our catalog is selected with quality, value, and customer
                satisfaction in mind.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {team.slice(0, 3).map((member, index) => (
                    <img
                      key={index}
                      src={member.image}
                      alt={member.name}
                      className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Meet our team</p>
                  <p className="text-sm text-gray-600">
                    Passionate about your success
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <ShoppingBag className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">
                        100K+
                      </div>
                      <div className="text-sm text-gray-600">Products</div>
                    </div>
                    <div className="text-center">
                      <Truck className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">
                        2-Day
                      </div>
                      <div className="text-sm text-gray-600">Delivery</div>
                    </div>
                    <div className="text-center">
                      <Award className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">
                        5-Star
                      </div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                    <div className="text-center">
                      <Heart className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">
                        24/7
                      </div>
                      <div className="text-sm text-gray-600">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ShopMart?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built our platform around what matters most to online
              shoppers: quality, convenience, and trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  activeFeature === index ? "ring-4 ring-indigo-200" : ""
                }`}
              >
                <div
                  className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every
              interaction we have.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                <div className="bg-blue-600 p-3 rounded-full">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Customer First
                  </h3>
                  <p className="text-gray-600">
                    Every decision starts with asking: "How does this benefit
                    our customers?" Your satisfaction drives our innovation.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                <div className="bg-green-600 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Trust & Transparency
                  </h3>
                  <p className="text-gray-600">
                    We believe in honest pricing, clear policies, and
                    transparent communication at every step of your journey.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                <div className="bg-purple-600 p-3 rounded-full">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Quality Excellence
                  </h3>
                  <p className="text-gray-600">
                    We carefully vet every product and partner to ensure you
                    receive only the best quality items.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl">
                <div className="bg-orange-600 p-3 rounded-full">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Community Impact
                  </h3>
                  <p className="text-gray-600">
                    Supporting local artisans, sustainable practices, and giving
                    back to communities that help us grow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              From startup to your favorite shopping destination
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`lg:w-1/2 ${
                      index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                          {item.year}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3">
                        <p className="text-sm font-semibold text-indigo-800">
                          🎉 {item.milestone}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg border-4 border-indigo-500 relative z-10">
                    <div className="w-4 h-4 bg-indigo-500 rounded-full"></div>
                  </div>

                  <div className="lg:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The passionate people behind your shopping experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black bg-opacity-20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-indigo-600 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-indigo-800">
                      ⭐ {member.achievement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join millions of satisfied customers and discover your new favorite
            products today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
              Browse Products
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300">
              Sign Up for Deals
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Custom CSS for animations (add to your global CSS)
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float-delayed 8s ease-in-out infinite;
  }
  
  .line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export default AboutUsPage;
