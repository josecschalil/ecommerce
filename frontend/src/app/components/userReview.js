import React, { useState } from "react";
import { Star, Upload, X } from "lucide-react";

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
      id: 2,
      name: "Mike Chen",
      rating: 4,
      comment:
        "Great value for money. Works exactly as described. Minor packaging issues but the product itself is perfect. Would recommend to others.",
      date: "1 week ago",
      images: [],
    },
    {
      id: 3,
      name: "Emma Wilson",
      rating: 5,
      comment:
        "Outstanding quality and customer service. Will definitely purchase again! The team was very responsive to my questions.",
      date: "2 weeks ago",
      images: [
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
      ],
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
      id: 6,
      name: "Tom Anderson",
      rating: 4,
      comment:
        "Really good product overall. The features work well and it's been reliable. Only minor complaint is the instructions could be clearer.",
      date: "1 month ago",
      images: [],
    },
    {
      id: 7,
      name: "Jennifer Kim",
      rating: 2,
      comment:
        "Not what I expected. The product works but feels cheaply made. Customer service was helpful though.",
      date: "2 months ago",
      images: [],
    },
    {
      id: 8,
      name: "Alex Thompson",
      rating: 1,
      comment:
        "Disappointed with this purchase. Product broke after just a few uses. Would not recommend.",
      date: "2 months ago",
      images: [],
    },
  ]);

  // Calculate rating distribution
  const ratingDistribution = {
    5: Math.floor(product.reviewCount * 0.6),
    4: Math.floor(product.reviewCount * 0.25),
    3: Math.floor(product.reviewCount * 0.1),
    2: Math.floor(product.reviewCount * 0.03),
    1: Math.floor(product.reviewCount * 0.02),
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            } ${
              interactive
                ? "cursor-pointer hover:text-yellow-400 hover:fill-yellow-400"
                : ""
            }`}
            onClick={interactive ? () => onRatingChange(star) : undefined}
          />
        ))}
      </div>
    );
  };

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

  const getProgressBarWidth = (count) => {
    return Math.max((count / product.reviewCount) * 100, 2);
  };

  return (
    <div className="mb-16">
      <div className="bg-gray-50/50 backdrop-blur-sm border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <button
            onClick={() => setShowWriteReview(!showWriteReview)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showWriteReview ? "Cancel" : "Write a Review"}
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Rating Overview */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                {renderStars(product.rating)}
                <span className="text-3xl font-bold text-gray-900">
                  {product.rating}
                </span>
              </div>
              <span className="text-gray-600">
                Based on {product.reviewCount} reviews
              </span>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      setFilterRating(filterRating === star ? 0 : star)
                    }
                    className={`flex items-center space-x-1 text-sm hover:text-blue-600 transition-colors min-w-12 ${
                      filterRating === star
                        ? "text-blue-600 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    <span>{star}</span>
                    <Star className="w-3 h-3 fill-current" />
                  </button>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${getProgressBarWidth(
                          ratingDistribution[star]
                        )}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">
                    {ratingDistribution[star]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Write Review Section */}
          {showWriteReview && (
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Write Your Review
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) =>
                      setNewReview((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  {renderStars(newReview.rating, true, (rating) =>
                    setNewReview((prev) => ({ ...prev, rating }))
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview((prev) => ({
                        ...prev,
                        comment: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    placeholder="Share your experience..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Photos (Optional)
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-200 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm">Upload Photos</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-xs text-gray-500">Max 5 images</span>
                  </div>

                  {newReview.images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {newReview.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Upload ${index + 1}`}
                            className="w-16 h-16 object-cover rounded-lg border"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={submitReview}
                    disabled={
                      !newReview.name.trim() || !newReview.comment.trim()
                    }
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Post Review
                  </button>
                  <button
                    onClick={() => setShowWriteReview(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter Info */}
        {filterRating > 0 && (
          <div className="mb-4 flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Showing {filterRating}-star reviews ({filteredReviews.length})
            </span>
            <button
              onClick={() => setFilterRating(0)}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Reviews Grid - Compact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                </div>
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>

              <h4 className="font-semibold text-gray-900 text-sm mb-2">
                {review.name}
              </h4>

              <p className="text-gray-700 text-sm mb-3 leading-relaxed line-clamp-4">
                {review.comment}
              </p>

              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {review.images.slice(0, 4).map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-10 h-10 object-cover rounded border cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => window.open(image, "_blank")}
                      />
                      {index === 3 && review.images.length > 4 && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            +{review.images.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Helpful Actions */}
              <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-2">
                <button className="hover:text-blue-600 transition-colors">
                  👍 Helpful (0)
                </button>
                <button className="hover:text-red-600 transition-colors">
                  Report
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && filterRating > 0 && (
          <div className="text-center py-12">
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">
                No {filterRating}-star reviews found.
              </p>
              <button
                onClick={() => setFilterRating(0)}
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                View all reviews
              </button>
            </div>
          </div>
        )}

        {filteredReviews.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-white border-2 border-gray-300 text-gray-700 py-3 px-8 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 hover:shadow-md transition-all duration-200">
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CustomerReviews;
