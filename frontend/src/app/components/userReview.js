import React, { useState } from "react";
import { Star, Upload, X, ThumbsUp } from "lucide-react"; // Added ThumbsUp

const CustomerReviews = () => {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [filterRating, setFilterRating] = useState(0);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
    images: [],
  });

  // Sample product data
  const product = {
    rating: 4.3,
    reviewCount: 156,
  };

  const [displayReviews, setDisplayReviews] = useState([
    // ... (Your original sample reviews data remains unchanged)
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Absolutely love this product! The quality exceeded my expectations and delivery was super fast. I've been using it for a month now and it's been perfect.",
      date: "2 days ago",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100&h=100&fit=crop",
      ],
    },
    {
      id: 5,
      name: "Lisa Park",
      rating: 5,
      comment:
        "Exceeded all my expectations! The build quality is amazing and it arrived much faster than expected. Highly recommend!",
      date: "1 month ago",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=100&h=100&fit=crop",
      ],
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      comment:
        "Great value for money. Works exactly as described. Minor packaging issues but the product itself is perfect. Would recommend to others.",
      date: "1 week ago",
      images: [],
    },
    {
      id: 4,
      name: "David Rodriguez",
      rating: 3,
      comment:
        "It's okay. Does what it's supposed to do but nothing extraordinary. The price point is fair for what you get.",
      date: "3 weeks ago",
      images: [],
    },
  ]);

  // --- HELPER FUNCTIONS ---

  const ratingDistribution = {
    5: Math.floor(product.reviewCount * 0.6),
    4: Math.floor(product.reviewCount * 0.25),
    3: Math.floor(product.reviewCount * 0.1),
    2: Math.floor(product.reviewCount * 0.03),
    1: Math.floor(product.reviewCount * 0.02),
  };

  const renderStars = (
    rating,
    interactive = false,
    onRatingChange = null,
    size = "w-5 h-5"
  ) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} ${
            star <= rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-slate-300"
          } ${
            interactive
              ? "cursor-pointer transition-transform hover:scale-125"
              : ""
          }`}
          onClick={interactive ? () => onRatingChange(star) : undefined}
        />
      ))}
    </div>
  );

  const renderAvatar = (name) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    const colors = [
      "bg-blue-200 text-blue-800",
      "bg-green-200 text-green-800",
      "bg-purple-200 text-purple-800",
      "bg-red-200 text-red-800",
      "bg-yellow-200 text-yellow-800",
    ];
    const colorClass = colors[name.length % colors.length];
    return (
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${colorClass}`}
      >
        {initials}
      </div>
    );
  };

  // --- EVENT HANDLERS ---

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setNewReview((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls].slice(0, 5),
    }));
  };

  const removeImage = (indexToRemove) => {
    setNewReview((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const submitReview = () => {
    if (!newReview.name.trim() || !newReview.comment.trim()) return;
    const review = {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: "Just now",
      images: newReview.images,
    };
    setDisplayReviews((prev) => [review, ...prev]);
    setNewReview({ name: "", rating: 5, comment: "", images: [] });
    setShowWriteReview(false);
  };

  const filteredReviews =
    filterRating === 0
      ? displayReviews
      : displayReviews.filter((review) => review.rating === filterRating);

  const getProgressBarWidth = (count) =>
    Math.max((count / product.reviewCount) * 100, 2);

  // --- RENDER ---

  return (
    <div className="font-sans bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <h2 className="text-3xl font-bold text-slate-800">
              Customer Reviews
            </h2>
            <button
              onClick={() => setShowWriteReview(!showWriteReview)}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {showWriteReview ? "Cancel Review" : "Write a Review"}
            </button>
          </div>

          {/* Write Review Form (Animated) */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              showWriteReview
                ? "max-h-[600px] opacity-100 mb-8"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-white border border-slate-200 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                What's your experience?
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-slate-400"
                  placeholder="Your Name"
                />
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-slate-700">
                    Your Rating:
                  </span>
                  {renderStars(newReview.rating, true, (rating) =>
                    setNewReview((prev) => ({ ...prev, rating }))
                  )}
                </div>
                <textarea
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview((prev) => ({
                      ...prev,
                      comment: e.target.value,
                    }))
                  }
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 h-28 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none placeholder-slate-400"
                  placeholder="Tell us more about your experience..."
                />
                <div>
                  <label className="flex items-center space-x-3 bg-slate-100 border border-dashed border-slate-300 rounded-lg px-4 py-3 cursor-pointer hover:bg-slate-200 transition-colors w-fit">
                    <Upload className="w-5 h-5 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">
                      Upload Photos
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-slate-500 mt-2">
                    You can add up to 5 images.
                  </p>
                  {newReview.images.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {newReview.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Upload preview ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg border-2 border-slate-200"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={submitReview}
                    disabled={
                      !newReview.name.trim() || !newReview.comment.trim()
                    }
                    className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                  >
                    Post Review
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Ratings Overview */}
          <div className="max-w-2xl mx-auto mb-10 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              {renderStars(product.rating, false, null, "w-6 h-6")}
              <span className="text-4xl font-bold text-slate-800">
                {product.rating}
              </span>
            </div>
            <p className="text-slate-600">
              Based on {product.reviewCount} reviews
            </p>
          </div>

          {/* Rating Distribution & Filtering */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setFilterRating(filterRating === star ? 0 : star)
                    }
                    className={`flex items-center space-x-1 text-sm hover:text-blue-600 transition-colors min-w-[50px] ${
                      filterRating === star
                        ? "text-blue-600 font-bold"
                        : "text-slate-600 font-medium"
                    }`}
                  >
                    <span>{star}</span>
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                  <div className="flex-1 bg-slate-200 rounded-full h-2.5">
                    <div
                      className="bg-yellow-400 h-2.5 rounded-full"
                      style={{
                        width: `${getProgressBarWidth(
                          ratingDistribution[star]
                        )}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-slate-500 w-10 text-right">
                    {ratingDistribution[star]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Info */}
          {filterRating > 0 && (
            <div className="mb-6 flex items-center space-x-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-3">
              <span>
                Showing {filteredReviews.length} reviews for{" "}
                {renderStars(filterRating, false, null, "w-4 h-4 inline-block")}
              </span>
              <button
                onClick={() => setFilterRating(0)}
                className="font-semibold hover:underline"
              >
                Clear filter
              </button>
            </div>
          )}

          {/* Reviews Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col transition-all duration-300 hover:shadow-lg hover:border-slate-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {renderAvatar(review.name)}
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {review.name}
                      </h4>
                      <span className="text-xs text-slate-500">
                        {review.date}
                      </span>
                    </div>
                  </div>
                  {renderStars(review.rating, false, null, "w-4 h-4")}
                </div>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-5 flex-grow">
                  {review.comment}
                </p>
                {review.images && review.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {review.images.slice(0, 3).map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Review ${index + 1}`}
                          className="w-12 h-12 object-cover rounded-md border cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => window.open(image, "_blank")}
                        />
                        {index === 2 && review.images.length > 3 && (
                          <div className="absolute inset-0 bg-black bg-opacity-60 rounded-md flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                              +{review.images.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-3 mt-auto">
                  <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    Helpful
                  </button>
                  <button className="hover:text-red-600 transition-colors">
                    Report
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredReviews.length === 0 && filterRating > 0 && (
            <div className="text-center py-16">
              <div className="bg-white border border-dashed border-slate-300 rounded-lg p-10 max-w-md mx-auto">
                <Star className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 mb-3 font-semibold">
                  No {filterRating}-star reviews found.
                </p>
                <button
                  onClick={() => setFilterRating(0)}
                  className="text-blue-600 hover:underline font-medium text-sm"
                >
                  View all reviews
                </button>
              </div>
            </div>
          )}

          {/* Load More Button */}
          {filteredReviews.length > 0 && (
            <div className="text-center mt-10">
              <button className="bg-white border border-slate-300 text-slate-700 py-2.5 px-6 rounded-lg font-semibold hover:border-slate-400 hover:bg-slate-100 transition-all duration-200">
                Load More Reviews
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
