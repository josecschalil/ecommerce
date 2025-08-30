"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Check,
  Edit3,
  Plus,
  Shield,
  Package,
  Trash2, // Added for delete functionality
} from "lucide-react";

// A reusable, modernized section component with conditional icon rendering
const Section = ({ title, icon: Icon, children, rightContent }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
    <div className="p-6">
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-3">
            {Icon && (
              <div className="p-2 bg-slate-100 rounded-lg">
                <Icon className="w-5 h-5 text-slate-600" />
              </div>
            )}
            {title}
          </h2>
          {rightContent}
        </div>
      )}
      {children}
    </div>
  </div>
);

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState("checkout"); // 'checkout' or 'summary'
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null); // State to track editing
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "John Doe",
      address: "123 Main Street, Apt 4B",
      place: "Manhattan",
      pincode: "10001",
      state: "New York",
      phone: "+1 (555) 123-4567",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      name: "John Doe",
      address: "456 Business Ave, Suite 200",
      place: "Brooklyn",
      pincode: "10002",
      state: "New York",
      phone: "+1 (555) 987-6543",
      isDefault: false,
    },
  ]);

  const [orderItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 199.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center",
      color: "Black",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 299.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center",
      color: "Silver",
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    place: "",
    pincode: "",
    state: "",
    phone: "",
    type: "Home",
  });

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const discount = appliedPromo ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + tax + shipping;

  const handlePromoApply = () => {
    if (promoCode.toLowerCase() === "save10")
      setAppliedPromo({ code: "SAVE10", discount: 10 });
    else setAppliedPromo(null);
  };

  const handleSaveAddress = () => {
    // Basic validation
    if (
      !newAddress.name ||
      !newAddress.address ||
      !newAddress.place ||
      !newAddress.pincode ||
      !newAddress.state ||
      !newAddress.phone
    ) {
      alert("Please fill in all address fields.");
      return;
    }

    if (editingAddress) {
      // Update existing address
      setSavedAddresses(
        savedAddresses.map((addr) =>
          addr.id === editingAddress.id ? { ...addr, ...newAddress } : addr
        )
      );
    } else {
      // Add new address
      const newAddr = {
        ...newAddress,
        id: Date.now(), // Use a more unique ID
        isDefault: savedAddresses.length === 0,
      };
      setSavedAddresses([...savedAddresses, newAddr]);
      setSelectedAddress(savedAddresses.length); // Select the newly added address
    }

    // Reset form and close it
    setShowAddressForm(false);
    setEditingAddress(null);
    setNewAddress({
      name: "",
      address: "",
      place: "",
      pincode: "",
      state: "",
      phone: "",
      type: "Home",
    });
  };

  const handleAddNewClick = () => {
    setEditingAddress(null);
    setNewAddress({
      name: "",
      address: "",
      place: "",
      pincode: "",
      state: "",
      phone: "",
      type: "Home",
    });
    setShowAddressForm(true);
  };

  const handleEditClick = (address) => {
    setEditingAddress(address);
    setNewAddress(address);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (idToDelete) => {
    const updatedAddresses = savedAddresses.filter(
      (address) => address.id !== idToDelete
    );
    setSavedAddresses(updatedAddresses);

    // Adjust selected address if the deleted one was selected or was last
    if (selectedAddress >= updatedAddresses.length) {
      setSelectedAddress(Math.max(0, updatedAddresses.length - 1));
    }
  };

  const handleCancelForm = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
    setNewAddress({
      name: "",
      address: "",
      place: "",
      pincode: "",
      state: "",
      phone: "",
      type: "Home",
    });
  };

  const handleConfirmOrder = () => setCurrentStep("summary");

  // --- ORDER SUMMARY VIEW ---
  if (currentStep === "summary") {
    const deliveryAddress = savedAddresses[selectedAddress];
    return (
      <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8 py-30">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentStep("checkout")}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-slate-900">
                  Order Summary
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Your order has been confirmed and is being processed.
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                <Check className="w-4 h-4" />
                <span>Confirmed</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-8">
              <Section title="Ordered Items" icon={Package}>
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800">
                          {item.name}
                        </h4>
                        <p className="text-sm text-slate-500">{item.color}</p>
                        <div className="flex justify-between items-end mt-2">
                          <span className="text-sm text-slate-600">
                            Quantity: {item.quantity}
                          </span>
                          <span className="text-lg font-medium text-slate-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="Shipping To" icon={MapPin}>
                {deliveryAddress ? (
                  <div className="text-sm text-slate-600 leading-relaxed">
                    <p className="font-semibold text-slate-800">
                      {deliveryAddress.name}
                    </p>
                    <p>{deliveryAddress.address}</p>
                    <p>
                      {deliveryAddress.place}, {deliveryAddress.state} -{" "}
                      {deliveryAddress.pincode}
                    </p>
                    <p>{deliveryAddress.phone}</p>
                  </div>
                ) : (
                  <p className="text-slate-500">No address selected.</p>
                )}
              </Section>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:sticky lg:top-8">
                <h3 className="text-xl font-semibold text-slate-800 mb-6">
                  Price Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount ({appliedPromo.code})</span>
                      <span className="font-medium">
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="font-medium text-emerald-600">Free</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tax (8%)</span>
                    <span className="font-medium text-slate-900">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between text-base font-semibold text-slate-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <button className="w-full py-3.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
                    Track Order
                  </button>
                  <p className="text-center mt-4 text-xs text-slate-500 font-medium">
                    Order ID: #ORD-2025-0830-001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- CHECKOUT VIEW ---
  return (
    <>
      {/* Global styles for input fields */}
      <style jsx global>{`
        .input-field {
          @apply w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors duration-200;
        }
      `}</style>
      <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8 py-26 text-black">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-8">
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
                <p className="text-slate-500 text-sm mt-1">
                  Complete your purchase securely
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-8">
              <Section
                title="Shipping Address"
                icon={MapPin}
                rightContent={
                  <button
                    onClick={handleAddNewClick}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white hover:bg-slate-900 rounded-lg text-sm font-semibold transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add New
                  </button>
                }
              >
                <div className="space-y-4">
                  {savedAddresses.map((address, index) => (
                    <div
                      key={address.id}
                      onClick={() => setSelectedAddress(index)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedAddress === index
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 text-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                address.type === "Home"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {address.type}
                            </span>
                            {address.isDefault && (
                              <span className="px-2.5 py-0.5 bg-emerald-100 rounded-full text-xs font-semibold text-emerald-800">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="font-semibold text-slate-800">
                            {address.name}
                          </p>
                          <p className="text-slate-600">
                            {address.address}, {address.place}, {address.state}{" "}
                            - {address.pincode}
                          </p>
                          <p className="text-slate-600 mt-1">{address.phone}</p>
                        </div>
                        {/* Edit and Delete Buttons */}
                        <div className="flex items-center gap-1 ml-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(address);
                            }}
                            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAddress(address.id);
                            }}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {showAddressForm && (
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <h3 className="font-semibold text-lg text-slate-800 mb-4">
                      {editingAddress ? "Edit Address" : "Add New Address"}
                    </h3>
                    <div className="space-y-4 ">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={newAddress.name}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              name: e.target.value,
                            })
                          }
                          className="input-field bg-gray-100 py-2 px-3 rounded-lg"
                        />
                        <select
                          value={newAddress.type}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              type: e.target.value,
                            })
                          }
                          className="input-field bg-gray-100 py-2 px-3 rounded-lg"
                        >
                          <option>Home</option>
                          <option>Work</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        <textarea
                          placeholder="Street Address"
                          value={newAddress.address}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              address: e.target.value,
                            })
                          }
                          className=" bg-gray-100 py-2 px-3 rounded-lg "
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <input
                          type="text"
                          placeholder="Place/City"
                          value={newAddress.place}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              place: e.target.value,
                            })
                          }
                          className="text-field bg-gray-100 py-2 px-3 rounded-lg "
                        />
                        <input
                          type="text"
                          placeholder="Pincode"
                          value={newAddress.pincode}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              pincode: e.target.value,
                            })
                          }
                          className="input-field bg-gray-100 py-2 px-3 rounded-lg "
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={newAddress.state}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              state: e.target.value,
                            })
                          }
                          className="input-field bg-gray-100 py-2 px-3 rounded-lg "
                        />
                      </div>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={newAddress.phone}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            phone: e.target.value,
                          })
                        }
                        className="input-field bg-gray-100 py-2 px-3 rounded-lg "
                      />
                      <div className="flex gap-4">
                        <button
                          onClick={handleSaveAddress}
                          className="px-6 py-2.5 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-900 transition-colors"
                        >
                          Save Address
                        </button>
                        <button
                          onClick={handleCancelForm}
                          className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-800 font-semibold transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Section>

              <Section title="Payment Method" icon={CreditCard}>
                <div className="p-4 rounded-lg border-2 border-slate-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CreditCard className="w-6 h-6 text-indigo-600" />
                      <div>
                        <p className="font-semibold text-slate-800">
                          Razorpay Payment Gateway
                        </p>
                        <p className="text-sm text-slate-600">
                          Credit Card, Debit Card, UPI & more
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                      <Shield className="w-4 h-4" />
                      <span>Secure</span>
                    </div>
                  </div>
                </div>
              </Section>
            </div>

            <div className="lg:col-span-2 text-black">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:sticky lg:top-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800">
                          {item.name}
                        </p>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">
                            Qty: {item.quantity}
                          </span>
                          <span className="font-medium text-slate-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 py-6 border-y border-slate-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="input-field flex-1 text-sm bg-gray-200 py-3 px-3 rounded-lg"
                    />
                    <button
                      onClick={handlePromoApply}
                      className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 rounded-lg text-white font-semibold text-sm transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedPromo && (
                    <div className="p-2.5 bg-emerald-50 rounded-lg text-sm text-emerald-700 font-medium flex items-center gap-2">
                      <Check className="w-4 h-4" /> {appliedPromo.code} applied
                      - {appliedPromo.discount}% off
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-6 mb-6">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount</span>
                      <span className="font-medium">
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="font-medium text-emerald-600">Free</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tax</span>
                    <span className="font-medium text-slate-900">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-slate-200 pt-4 mt-2">
                    <div className="flex justify-between text-lg font-bold text-slate-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm text-sm"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
