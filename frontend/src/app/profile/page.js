"use client";
import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  ShoppingCart,
  Heart,
  LogOut,
  Edit3,
  Save,
  X,
  Trash2,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
import OrderHistory from "../components/orderHistory";
import ProfileWishlistPage from "../components/profileWishlist";
import ProfileCartPage from "../components/cart";
import AddressSection from "../components/address";
import { useRouter } from "next/navigation";
import { apiFetch } from "../lib/api";
const ProfilePage = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("basic-data");
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: "JOSE",
    lastName: "C S",
    email: "josecschail2101@gmail.com",
    phone: "+917012048527",
    gender: "Male",
  });

  const [editedInfo, setEditedInfo] = useState(userInfo);

  const sidebarItems = [
    { id: "basic-data", label: "Basic Data", icon: User },
    { id: "billing-addresses", label: "Billing Addresses", icon: MapPin },
    { id: "order-history", label: "Order History", icon: Package },
    { id: "my-cart", label: "My Cart", icon: ShoppingCart },
    { id: "my-wishlist", label: "My Wishlist", icon: Heart },
    { id: "logout", label: "Log Out", icon: LogOut },
  ];
  const activeItem =
    sidebarItems.find((item) => item.id === activeTab) || sidebarItems[0];
  const ActiveIcon = activeItem.icon;
  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout/", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      router.push("/login");
    } catch (err) {
      setError("Network error occurred");
      console.error("Error Logging Out:", err);
    }
  };
  const handleSave = () => {
    setUserInfo(editedInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInfo(userInfo);
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    console.log("Account deletion requested");
    setShowDeleteModal(false);
  };

  const renderBasicData = () => (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="backdrop-blur-md bg-white/25 rounded-2xl border border-white/30 shadow-xl p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-800">
            Personal Information
          </h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white/40 hover:bg-white/60 text-slate-700 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/30"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex flex-1 items-center justify-center gap-2 px-4 py-2 bg-green-500/90 hover:bg-green-600 text-white rounded-xl transition-all duration-200 backdrop-blur-sm"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex flex-1 items-center justify-center gap-2 px-4 py-2 bg-slate-500/90 hover:bg-slate-600 text-white rounded-xl transition-all duration-200 backdrop-blur-sm"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={editedInfo.firstName}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, firstName: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/30 text-slate-800 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:bg-white/50 transition-all duration-200 disabled:opacity-60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={editedInfo.lastName}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, lastName: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/30 text-slate-800 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:bg-white/50 transition-all duration-200 disabled:opacity-60"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Your Gender
          </label>
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={editedInfo.gender === "Male"}
                onChange={(e) =>
                  setEditedInfo({ ...editedInfo, gender: e.target.value })
                }
                disabled={!isEditing}
                className="mr-3 text-slate-600 focus:ring-slate-400"
              />
              <span className="text-slate-700">Male</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={editedInfo.gender === "Female"}
                onChange={(e) =>
                  setEditedInfo({ ...editedInfo, gender: e.target.value })
                }
                disabled={!isEditing}
                className="mr-3 text-slate-600 focus:ring-slate-400"
              />
              <span className="text-slate-700">Female</span>
            </label>
          </div>
        </div>
      </div>

      {/* Email Address */}
      <div className="backdrop-blur-md bg-white/25 rounded-2xl border border-white/30 shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">
            Email Address
          </h3>
        </div>
        <input
          type="email"
          value={editedInfo.email}
          onChange={(e) =>
            setEditedInfo({ ...editedInfo, email: e.target.value })
          }
          disabled={!isEditing}
          className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/30 text-slate-800 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:bg-white/50 transition-all duration-200 disabled:opacity-60"
        />
      </div>

      {/* Mobile Number */}
      <div className="backdrop-blur-md bg-white/25 rounded-2xl border border-white/30 shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">
            Mobile Number
          </h3>
        </div>
        <input
          type="tel"
          value={editedInfo.phone}
          onChange={(e) =>
            setEditedInfo({ ...editedInfo, phone: e.target.value })
          }
          disabled={!isEditing}
          className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/30 text-slate-800 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:bg-white/50 transition-all duration-200 disabled:opacity-60"
        />
      </div>

      {/* FAQs */}
      <div className="backdrop-blur-md bg-white/25 rounded-2xl border border-white/30 shadow-xl p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">FAQs</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-slate-700 mb-2">
              What happens when I update my email address or mobile number?
            </h4>
            <p className="text-sm text-slate-600">
              Your login email id (or mobile number) changes, likewise. You'll
              receive all your account related communication on your updated
              email address (or mobile number).
            </p>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 mb-2">
              When will my account be updated with the new email address or
              mobile number?
            </h4>
            <p className="text-sm text-slate-600">
              It happens as soon as you confirm the verification code sent to
              your email (or mobile) and save the changes.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 mb-2">
              What happens to my existing account when I update my email address
              or mobile number?
            </h4>
            <p className="text-sm text-slate-600">
              Updating your email address (or mobile number) doesn't invalidate
              your account. Your account remains fully functional. You'll
              continue seeing your Order history, saved information and personal
              details.
            </p>
          </div>
        </div>
      </div>

      {/* Delete Account */}
      <div className="backdrop-blur-md bg-white/25 rounded-2xl border border-white/30 shadow-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="sm:pr-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Delete Account
            </h3>
            <p className="text-sm text-slate-600">
              Permanently delete your account and all associated data.
            </p>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/90 hover:bg-red-600 text-white rounded-xl transition-all duration-200 backdrop-blur-sm flex-shrink-0"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderPlaceholderContent = (title, description) => (
    <div className="backdrop-blur-md bg-white/25 rounded-2xl border border-white/30 shadow-xl p-8 text-center h-full flex flex-col justify-center">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">{title}</h2>
      <p className="text-slate-600">{description}</p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "basic-data":
        return renderBasicData();
      case "billing-addresses":
        return <AddressSection />;
      case "order-history":
        return <OrderHistory />;
      case "my-cart":
        return <ProfileCartPage />;
      case "my-wishlist":
        return <ProfileWishlistPage />;
      default:
        return renderBasicData();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="relative z-10 w-full lg:w-72 lg:min-h-screen backdrop-blur-md bg-white/20 border-b border-white/30 lg:border-r lg:border-b-0 lg:p-6">
          {/* --- Mobile Dropdown Trigger and Menu (Visible on screens < 1024px) --- */}
          {/* --- Mobile Dropdown Trigger and Menu (Visible on screens < 1024px) --- */}
          <div className="lg:hidden border-b border-white/30">
            {/* This wrapper keeps the button's padding */}
            <div className="p-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <ActiveIcon className="w-5 h-5 text-slate-700" />
                  <span className="font-semibold text-slate-800">
                    {activeItem.label}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${
                    isMobileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* The new, in-flow dropdown menu with a smooth transition */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isMobileMenuOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <nav className="p-4 pt-0 space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  if (item.id === "logout") {
                    return (
                      <button
                        key={item.id}
                        onClick={async () => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left text-slate-700 hover:bg-white/30 rounded-lg transition-colors"
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {item.label}
                      </button>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                        isActive
                          ? "bg-slate-800 text-white"
                          : "text-slate-700 hover:bg-white/30"
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* --- Desktop Sidebar (Visible on screens >= 1024px) --- */}
          <div className="hidden lg:block">
            {/* Profile Header */}
            <div className="backdrop-blur-sm bg-white/30 rounded-2xl border border-white/20 p-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-white font-bold text-xl">
                    {userInfo.firstName.charAt(0)}
                    {userInfo.lastName.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Hello,</div>
                  <div className="font-semibold text-slate-800 text-lg break-words">
                    {userInfo.firstName} {userInfo.lastName}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                if (item.id === "logout") {
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleLogout()}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-slate-700 hover:bg-white/30 rounded-xl transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-white/20"
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {item.label}
                    </button>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-200 backdrop-blur-sm ${
                      isActive
                        ? "bg-slate-800 text-white shadow-lg"
                        : "text-slate-700 hover:bg-white/30 border border-transparent hover:border-white/20"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {item.label}
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">{renderContent()}</div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-md bg-white/90 rounded-2xl border border-white/30 shadow-2xl p-6 sm:p-8 max-w-md w-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Delete Account
                </h3>
                <p className="text-sm text-slate-600">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="text-slate-700 mb-6">
              Are you sure you want to delete your account? This will
              permanently remove all your data, including order history, saved
              addresses, and wishlist items.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-3 bg-white/60 hover:bg-white/80 text-slate-700 rounded-xl font-medium transition-all duration-200 backdrop-blur-sm border border-white/40"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-200"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
