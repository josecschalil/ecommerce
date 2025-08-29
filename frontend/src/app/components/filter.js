import { Filter, ChevronUp, ChevronDown, X } from "lucide-react";
import { useState } from "react";

export default function FilterSidebar() {
  const [showFilters, setShowFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    availability: true,
    brand: true,
    category: true,
    price: true,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    availability: [],
    brand: [],
    category: "",
    price: "",
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCheckboxChange = (section, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [section]: prev[section].includes(value)
        ? prev[section].filter((item) => item !== value)
        : [...prev[section], value],
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      availability: [],
      brand: [],
      category: "",
      price: "",
    });
  };

  const availabilityOptions = [
    { label: "In stock", count: 13 },
    { label: "Out of stock", count: 7 },
  ];

  const brandOptions = [
    { label: "Camera", count: 1 },
    { label: "elexy-demo", count: 4 },
    { label: "Laptop", count: 1 },
    { label: "Mobile", count: 3 },
    { label: "Oven", count: 1 },
    { label: "Router", count: 1 },
    { label: "Speaker", count: 3 },
  ];

  const categories = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"];
  const priceRanges = [
    { label: "Under $50", value: "under-50" },
    { label: "$50 - $200", value: "50-200" },
    { label: "$200 - $500", value: "200-500" },
    { label: "Over $500", value: "over-500" },
  ];

  return (
    <div className="bg-gray-50 lg:mt-21">
      <div className="max-w-sm mx-auto">
        {/* Mobile Dropdown Header */}
        <div className="lg:hidden flex items-center">
          <span className="text-gray-700 mr-2">Filters</span>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-lg bg-gray-200 flex items-center"
          >
            {showFilters ? (
              <ChevronUp className="h-4 w-4 text-gray-600" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-600" />
            )}
          </button>
        </div>

        <div
          className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${
            showFilters ? "block" : "hidden lg:block"
          }`}
        >
          {/* Desktop Header */}
          <div className="p-6 border-b border-gray-100 hidden lg:block">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 rounded-full hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between lg:hidden">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="p-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div>
            {/* Availability Section */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleSection("availability")}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-700 text-base">
                  Availability
                </span>
                {expandedSections.availability ? (
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </button>

              {expandedSections.availability && (
                <div className="px-6 pb-4 space-y-3">
                  {availabilityOptions.map((option) => (
                    <label
                      key={option.label}
                      className="flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFilters.availability.includes(
                            option.label
                          )}
                          onChange={() =>
                            handleCheckboxChange("availability", option.label)
                          }
                          className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="ml-3 text-gray-600 group-hover:text-gray-900 transition-colors">
                          {option.label}
                        </span>
                      </div>
                      <span className="text-gray-400 text-sm">
                        ({option.count})
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Brand Section */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleSection("brand")}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-700 text-base">
                  Brand
                </span>
                {expandedSections.brand ? (
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </button>

              {expandedSections.brand && (
                <div className="px-6 pb-4 space-y-3">
                  {brandOptions.map((option) => (
                    <label
                      key={option.label}
                      className="flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFilters.brand.includes(option.label)}
                          onChange={() =>
                            handleCheckboxChange("brand", option.label)
                          }
                          className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="ml-3 text-gray-600 group-hover:text-gray-900 transition-colors">
                          {option.label}
                        </span>
                      </div>
                      <span className="text-gray-400 text-sm">
                        ({option.count})
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Category Section */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleSection("category")}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-700 text-base">
                  Category
                </span>
                {expandedSections.category ? (
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </button>

              {expandedSections.category && (
                <div className="px-6 pb-4 space-y-3">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedFilters.category === category}
                        onChange={(e) =>
                          setSelectedFilters((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-4 h-4 text-blue-600 bg-white border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-3 text-gray-600 group-hover:text-gray-900 transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range Section */}
            <div>
              <button
                onClick={() => toggleSection("price")}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-700 text-base">
                  Price Range
                </span>
                {expandedSections.price ? (
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </button>

              {expandedSections.price && (
                <div className="px-6 pb-6 space-y-3">
                  {priceRanges.map((range) => (
                    <label
                      key={range.value}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="price"
                        value={range.value}
                        checked={selectedFilters.price === range.value}
                        onChange={(e) =>
                          setSelectedFilters((prev) => ({
                            ...prev,
                            price: e.target.value,
                          }))
                        }
                        className="w-4 h-4 text-blue-600 bg-white border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-3 text-gray-600 group-hover:text-gray-900 transition-colors">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="max-w-full mx-10 mb-6">
              <button
                onClick={clearAllFilters}
                className="w-full mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 transition-colors text-sm font-medium"
              >
                Apply Filters
              </button>
              {/* Clear Filters Button */}
              <button
                onClick={clearAllFilters}
                className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
