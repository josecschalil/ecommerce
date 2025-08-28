import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function ClientHappiness() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      rating: 5,
      title: "Amazing build quality",
      content:
        "This smart home assistant has become very important part of my daily routine. From managing my schedule and setting reminders to controlling smart home devices and answering questions.",
      author: "Cameron Williamson",
      position: "Banker, Simtom Bank Co.",
    },
    {
      id: 2,
      rating: 5,
      title: "Smart Home Assistant",
      content:
        "This smart home assistant has become very important part of my daily routine. From managing my schedule and setting reminders to controlling smart home devices and answering questions.",
      author: "Willie Bradley",
      position: "/ Reporter",
    },
    {
      id: 3,
      rating: 5,
      title: "Smart Home Assistant",
      content:
        "This smart home assistant has become very important part of my daily routine. From managing my schedule and setting reminders to controlling smart home devices and answering questions.",
      author: "Brain Armstrong",
      position: "CEO Deplex Group",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-8xl mx-auto px-20 py-16 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Client's Happiness
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            The Best electronics products continue to drive innovation and shape
            the way we live, work, and interact with our environment.
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`bg-white p-6 rounded-lg border border-gray-200 transition-all duration-300 ${
              index === currentIndex ? "shadow-lg scale-105" : "shadow-sm"
            }`}
          >
            <StarRating rating={testimonial.rating} />

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {testimonial.title}
            </h3>

            <blockquote className="text-gray-600 mb-6 leading-relaxed">
              "{testimonial.content}"
            </blockquote>

            <div className="border-t border-gray-100 pt-4">
              <p className="font-semibold text-gray-900">
                {testimonial.author}
              </p>
              <p className="text-sm text-gray-500">{testimonial.position}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
