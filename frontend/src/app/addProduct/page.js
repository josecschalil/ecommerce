"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Filter,
  X,
  Save,
  ArrowLeft,
  Package,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api/products/";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [currentView, setCurrentView] = useState("list");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterCategory, setFilterCategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    original_price: "",
    description: "",
    key_features: [""],
    size: [""],
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    category: "",
  });

  // Fetch products on first render
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = useMemo(() => {
    return [...new Set(products.map((p) => p.category))];
  }, [products]);

  const addProduct = async (product) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
      }

      const data = await response.json();
      setProducts((prev) => [...prev, data]);
      return data;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product");
      }

      const data = await response.json();
      setProducts((prev) => prev.map((p) => (p.id === id ? data : p)));
      return data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  // Add the missing handleView function
  const handleView = (product) => {
    setSelectedProduct(product);
    setCurrentView("view");
  };

  // Form helpers
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      original_price: "",
      description: "",
      key_features: [""],
      size: [""],
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      category: "",
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (
      !formData.price ||
      isNaN(formData.price) ||
      parseFloat(formData.price) <= 0
    )
      newErrors.price = "Enter valid price";
    if (
      !formData.original_price ||
      isNaN(formData.original_price) ||
      parseFloat(formData.original_price) <= 0
    )
      newErrors.original_price = "Enter valid original price";
    if (!formData.description.trim())
      newErrors.description = "Description required";
    if (!formData.category.trim()) newErrors.category = "Category required";

    // Validate that at least one key feature is provided
    const validFeatures = formData.key_features.filter((f) => f.trim() !== "");
    if (validFeatures.length === 0) {
      newErrors.key_features = "At least one key feature is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field, index) => {
    if (formData[field].length > 1) {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };

  // Fixed handleSubmit function
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitLoading(true);

    try {
      // Clean up the data before sending
      const cleanedData = {
        ...formData,
        price: parseFloat(formData.price),
        original_price: parseFloat(formData.original_price),
        key_features: formData.key_features.filter((f) => f.trim() !== ""),
        size: formData.size.filter((s) => s.trim() !== ""),
      };

      // Remove empty image fields
      Object.keys(cleanedData).forEach((key) => {
        if (key.startsWith("image") && !cleanedData[key]) {
          delete cleanedData[key];
        }
      });

      if (currentView === "create") {
        await addProduct(cleanedData);
      } else if (currentView === "edit" && selectedProduct) {
        await updateProduct(selectedProduct.id, cleanedData);
      }

      resetForm();
      setCurrentView("list");
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`Error: ${error.message || "Failed to save product"}`);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name || "",
      price: product.price?.toString() || "",
      original_price: product.original_price?.toString() || "",
      description: product.description || "",
      key_features:
        product.key_features?.length > 0 ? [...product.key_features] : [""],
      size: product.size?.length > 0 ? [...product.size] : [""],
      image1: product.image1 || "",
      image2: product.image2 || "",
      image3: product.image3 || "",
      image4: product.image4 || "",
      category: product.category || "",
    });
    setCurrentView("edit");
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const productName = product.name ? product.name.toLowerCase() : "";
      const search = searchTerm ? searchTerm.toLowerCase() : "";

      return (
        productName.includes(search) &&
        (filterCategory === "" || product.category === filterCategory)
      );
    });

    return filtered.sort((a, b) => {
      let aValue = a[sortBy] ?? "";
      let bValue = b[sortBy] ?? "";

      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      return sortOrder === "asc"
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
        ? 1
        : -1;
    });
  }, [products, searchTerm, sortBy, sortOrder, filterCategory]);

  const renderForm = () => (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Package className="w-8 h-8 text-gray-600" />
        </div>
        <h1 className="text-3xl font-light text-gray-800 mb-3 tracking-wide">
          {currentView === "create" ? "Add New Product" : "Edit Product"}
        </h1>
        <p className="text-gray-600 leading-relaxed">
          {currentView === "create"
            ? "Create a new product with detailed information"
            : "Update product details and information"}
        </p>
      </div>

      {/* Main Form Card */}
      <div className="backdrop-blur-xl bg-white/90 rounded-3xl border border-gray-200/50 shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-medium text-gray-800">
            Product Information
          </h2>
          <button
            onClick={() => {
              resetForm();
              setCurrentView("list");
              setSelectedProduct(null);
            }}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter product name"
                className={`w-full px-4 py-4 rounded-xl bg-white/80 border transition-all duration-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent ${
                  errors.name
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-200 focus:ring-gray-300"
                }`}
                disabled={isLoading}
              />
              {errors.name && (
                <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                placeholder="Enter category"
                className={`w-full px-4 py-4 rounded-xl bg-white/80 border transition-all duration-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent ${
                  errors.category
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-200 focus:ring-gray-300"
                }`}
                disabled={isLoading}
              />
              {errors.category && (
                <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.category}</span>
                </div>
              )}
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Current Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="0.00"
                className={`w-full px-4 py-4 rounded-xl bg-white/80 border transition-all duration-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent ${
                  errors.price
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-200 focus:ring-gray-300"
                }`}
                disabled={isLoading}
              />
              {errors.price && (
                <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.price}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Original Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.original_price}
                onChange={(e) =>
                  handleInputChange("original_price", e.target.value)
                }
                placeholder="0.00"
                className={`w-full px-4 py-4 rounded-xl bg-white/80 border transition-all duration-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent ${
                  errors.original_price
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-200 focus:ring-gray-300"
                }`}
                disabled={isLoading}
              />
              {errors.original_price && (
                <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.original_price}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              placeholder="Enter product description"
              className={`w-full px-4 py-4 rounded-xl bg-white/80 border transition-all duration-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent resize-none ${
                errors.description
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-200 focus:ring-gray-300"
              }`}
              disabled={isLoading}
            />
            {errors.description && (
              <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errors.description}</span>
              </div>
            )}
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Key Features
            </label>
            {formData.key_features.map((feature, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) =>
                    handleArrayChange("key_features", index, e.target.value)
                  }
                  placeholder="Enter feature"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-200 transition-all duration-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                  disabled={isLoading}
                />
                {formData.key_features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("key_features", index)}
                    className="p-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-300"
                    disabled={isLoading}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("key_features")}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-all duration-300"
              disabled={isLoading}
            >
              + Add Feature
            </button>
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Available Sizes
            </label>
            {formData.size.map((size, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={size}
                  onChange={(e) =>
                    handleArrayChange("size", index, e.target.value)
                  }
                  placeholder="Enter size (e.g., S, M, L)"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-200 transition-all duration-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                  disabled={isLoading}
                />
                {formData.size.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("size", index)}
                    className="p-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-300"
                    disabled={isLoading}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("size")}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-all duration-300"
              disabled={isLoading}
            >
              + Add Size
            </button>
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["image1", "image2", "image3", "image4"].map((field, index) => (
              <div key={field} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Image {index + 1} URL
                </label>
                <input
                  type="url"
                  value={formData[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-4 rounded-xl bg-white/80 border border-gray-200 transition-all duration-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full py-4 rounded-2xl font-medium text-sm tracking-wide transition-all duration-300 shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2 group ${
              isLoading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-900 text-white"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {currentView === "create" ? "Creating..." : "Updating..."}
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {currentView === "create" ? "Create Product" : "Update Product"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const renderProductView = () => (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Eye className="w-8 h-8 text-gray-600" />
        </div>
        <h1 className="text-3xl font-light text-gray-800 mb-3 tracking-wide">
          Product Details
        </h1>
        <p className="text-gray-600 leading-relaxed">
          View detailed information about {selectedProduct.name}
        </p>
      </div>

      {/* Main View Card */}
      <div className="backdrop-blur-xl bg-white/90 rounded-3xl border border-gray-200/50 shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-medium text-gray-800">
            {selectedProduct.name}
          </h2>
          <button
            onClick={() => setCurrentView("list")}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white/50 rounded-2xl p-6 border border-gray-200/50">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Basic Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Category
                  </label>
                  <p className="text-gray-800 font-medium">
                    {selectedProduct.category}
                  </p>
                </div>
                <div className="flex gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Current Price
                    </label>
                    <p className="text-2xl font-bold text-gray-800">
                      ${selectedProduct.price}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Original Price
                    </label>
                    <p className="text-xl text-gray-500 line-through">
                      ${selectedProduct.original_price}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/50 rounded-2xl p-6 border border-gray-200/50">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            <div className="bg-white/50 rounded-2xl p-6 border border-gray-200/50">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Key Features
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.key_features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/50 rounded-2xl p-6 border border-gray-200/50">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Available Sizes
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.size.map((size, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/50 rounded-2xl p-6 border border-gray-200/50">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Product Images
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                selectedProduct.image1,
                selectedProduct.image2,
                selectedProduct.image3,
                selectedProduct.image4,
              ]
                .filter((img) => img)
                .map((img, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-xl bg-gray-100 border border-gray-200 overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Im0xMDAgNzUgMjUgMjUtMjUgMjUtMjUtMjUgMjUtMjV6IiBmaWxsPSIjZDFkNWRiIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmaWxsPSIjNmI3Mjg4Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+Cjwvc3ZnPgo=";
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProductList = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-8 h-8 text-gray-600" />
        </div>
        <h1 className="text-3xl font-light text-gray-800 mb-3 tracking-wide">
          Product Management
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Manage your product catalog with ease
        </p>
      </div>

      {/* Controls */}
      <div className="backdrop-blur-xl bg-white/90 rounded-3xl border border-gray-200/50 shadow-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 border border-gray-200 transition-all duration-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 rounded-xl bg-white/80 hover:bg-white border border-gray-200 text-gray-700 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split("-");
                setSortBy(field);
                setSortOrder(order);
              }}
              className="px-4 py-3 rounded-xl bg-white/80 border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent shadow-md"
            >
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="price-asc">Price Low-High</option>
              <option value="price-desc">Price High-Low</option>
              <option value="category-asc">Category A-Z</option>
            </select>

            <button
              onClick={() => {
                resetForm();
                setCurrentView("create");
              }}
              className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-900 text-white font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-[1.02] transform"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="pt-4 border-t border-gray-200">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/80 border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedProducts.map((product) => (
          <div
            key={product.id}
            className="backdrop-blur-xl bg-white/90 rounded-3xl border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] p-6"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{product.category}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(product)}
                    className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors duration-300"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition-colors duration-300"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 text-sm line-clamp-2 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-800">
                  ${product.price}
                </span>
                {product.original_price !== product.price && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.original_price}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      {Math.round(
                        ((product.original_price - product.price) /
                          product.original_price) *
                          100
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {product.key_features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                  >
                    {feature}
                  </span>
                ))}
                {product.key_features.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    +{product.key_features.length - 3} more
                  </span>
                )}
              </div>

              <div className="pt-2">
                <div className="flex flex-wrap gap-1">
                  {product.size.map((size, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white border border-gray-200 text-gray-600 rounded text-xs font-medium"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className="backdrop-blur-xl bg-white/90 rounded-3xl border border-gray-200/50 shadow-xl p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setFilterCategory("");
            }}
            className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-900 text-white font-medium transition-all duration-300"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Stats Card */}
      <div className="backdrop-blur-xl bg-white/90 rounded-3xl border border-gray-200/50 shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-800">
              {products.length}
            </div>
            <div className="text-sm text-gray-600">Total Products</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">
              {categories.length}
            </div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">
              $
              {Math.round(
                products.reduce((sum, p) => sum + p.price, 0) / products.length
              ) || 0}
            </div>
            <div className="text-sm text-gray-600">Average Price</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-4 py-30">
      <div className="max-w-7xl mx-auto">
        {currentView === "list" && renderProductList()}
        {(currentView === "create" || currentView === "edit") && renderForm()}
        {currentView === "view" && selectedProduct && renderProductView()}
      </div>
    </div>
  );
};

export default ProductManager;
