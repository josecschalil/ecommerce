"use client";
import React, { useState } from "react";
import { MapPin, Edit3, Plus, Trash2 } from "lucide-react";

// A reusable section component (kept with the component for self-containment)
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

// Component to display a single saved address card
const SavedAddress = ({ address, isSelected, onSelect, onEdit, onDelete }) => {
  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected
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
          <p className="font-semibold text-slate-800">{address.name}</p>
          <p className="text-slate-600">
            {address.address}, {address.place}, {address.state} -{" "}
            {address.pincode}
          </p>
          <p className="text-slate-600 mt-1">{address.phone}</p>
        </div>
        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Component for the Add/Edit Address form
const AddressForm = ({ initialData, onSave, onCancel, isEditing }) => {
  const [address, setAddress] = useState(
    initialData || {
      name: "",
      address: "",
      place: "",
      pincode: "",
      state: "",
      phone: "",
      type: "Home",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Basic validation can be improved with a library like Zod or Yup
    if (Object.values(address).some((field) => field === "")) {
      // In a real app, you'd show a more user-friendly notification
      alert("Please fill in all address fields.");
      return;
    }
    onSave(address);
  };

  return (
    <div className="mt-6 pt-6 border-t border-slate-200 text-black">
      <h3 className="font-semibold text-lg text-slate-800 mb-4">
        {isEditing ? "Edit Address" : "Add New Address"}
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={address.name}
            onChange={handleChange}
            className="input-field m-2 bg-gray-100 py-2 px-3 rounded-lg"
          />
          <select
            name="type"
            value={address.type}
            onChange={handleChange}
            className="input-field m-2 bg-gray-100 py-2 px-3 rounded-lg"
          >
            <option>Home</option>
            <option>Work</option>
            <option>Other</option>
          </select>
        </div>
        <textarea
          name="address"
          placeholder="Street Address"
          value={address.address}
          onChange={handleChange}
          className="input-field w-full m-2 bg-gray-100 py-2 px-3 rounded-lg"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            name="place"
            type="text"
            placeholder="Place/City"
            value={address.place}
            onChange={handleChange}
            className="input-field m-2 bg-gray-100 py-2 px-3 rounded-lg"
          />
          <input
            name="pincode"
            type="text"
            placeholder="Pincode"
            value={address.pincode}
            onChange={handleChange}
            className="input-field m-2 bg-gray-100 py-2 px-3 rounded-lg"
          />
          <input
            name="state"
            type="text"
            placeholder="State"
            value={address.state}
            onChange={handleChange}
            className="input-field m-2 bg-gray-100 py-2 px-3 rounded-lg"
          />
        </div>
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={address.phone}
          onChange={handleChange}
          className="input-field m-2 bg-gray-100 py-2 px-3 rounded-lg"
        />
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-900 transition-colors"
          >
            Save Address
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-800 font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// The main, exported component that manages address state and logic
const AddressSection = () => {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null); // This will hold the address object being edited

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

  const handleSaveAddress = (addressData) => {
    if (editingAddress) {
      // Update existing address
      setSavedAddresses(
        savedAddresses.map((addr) =>
          addr.id === editingAddress.id ? { ...addr, ...addressData } : addr
        )
      );
    } else {
      // Add new address
      const newAddr = {
        ...addressData,
        id: Date.now(), // Use a more robust unique ID in a real application
        isDefault: savedAddresses.length === 0,
      };
      setSavedAddresses([...savedAddresses, newAddr]);
      setSelectedAddressIndex(savedAddresses.length); // Select the newly added address
    }

    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleAddNewClick = () => {
    setEditingAddress(null);
    setShowAddressForm(true);
  };

  const handleEditClick = (address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (idToDelete) => {
    const updatedAddresses = savedAddresses.filter(
      (address) => address.id !== idToDelete
    );
    setSavedAddresses(updatedAddresses);

    // Adjust selected address if the deleted one was selected or was the last one
    if (selectedAddressIndex >= updatedAddresses.length) {
      setSelectedAddressIndex(Math.max(0, updatedAddresses.length - 1));
    }
  };

  const handleCancelForm = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  return (
    <>
      {/* These styles would ideally be in a global stylesheet */}
      <style jsx global>{`
        .input-field {
          @apply w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors duration-200;
        }
      `}</style>
      <Section
        title="Shipping Address"
        icon={MapPin}
        rightContent={
          !showAddressForm && (
            <button
              onClick={handleAddNewClick}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white hover:bg-slate-900 rounded-lg text-sm font-semibold transition-colors"
            >
              <Plus className="w-4 h-4" /> Add New
            </button>
          )
        }
      >
        <div className="space-y-4">
          {savedAddresses.map((address, index) => (
            <SavedAddress
              key={address.id}
              address={address}
              isSelected={selectedAddressIndex === index}
              onSelect={() => setSelectedAddressIndex(index)}
              onEdit={() => handleEditClick(address)}
              onDelete={() => handleDeleteAddress(address.id)}
            />
          ))}
        </div>

        {showAddressForm && (
          <AddressForm
            isEditing={!!editingAddress}
            initialData={editingAddress}
            onSave={handleSaveAddress}
            onCancel={handleCancelForm}
          />
        )}
      </Section>
    </>
  );
};

export default AddressSection;
