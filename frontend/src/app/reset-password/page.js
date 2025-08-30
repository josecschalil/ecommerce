"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  Lock,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Shield,
  Key,
  CheckCircle,
} from "lucide-react";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock email from URL params or token
  const userEmail = "john.doe@example.com";

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("One number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      errors.push("One special character");
    return errors;
  };

  const getPasswordStrength = (password) => {
    const validationErrors = validatePassword(password);
    if (password.length === 0) return { strength: 0, text: "", color: "" };
    if (validationErrors.length > 3)
      return { strength: 1, text: "Weak", color: "text-red-500" };
    if (validationErrors.length > 1)
      return { strength: 2, text: "Fair", color: "text-orange-500" };
    if (validationErrors.length === 1)
      return { strength: 3, text: "Good", color: "text-blue-500" };
    return { strength: 4, text: "Strong", color: "text-green-500" };
  };

  const handleSubmit = async () => {
    const newErrors = {};

    // Validation
    if (!newPassword) {
      newErrors.newPassword = "Password is required";
    } else {
      const validationErrors = validatePassword(newPassword);
      if (validationErrors.length > 0) {
        newErrors.newPassword = "Password does not meet requirements";
      }
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center px-4 py-30">
        <div className="w-full max-w-md">
          {/* Success Card */}
          <div className="backdrop-blur-xl bg-white/90 rounded-3xl border border-gray-200/50 shadow-2xl p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-light text-gray-800 mb-2 tracking-wide">
                Password Reset Successful
              </h1>
              <p className="text-gray-600 leading-relaxed">
                Your password has been successfully updated for
              </p>
              <p className="text-gray-800 font-medium mt-1">{userEmail}</p>
            </div>

            <div className="bg-green-50/60 rounded-2xl border border-green-200 p-6 mb-6">
              <div className="flex items-start gap-3 text-left">
                <div className="p-2 bg-green-100 rounded-lg flex-shrink-0 mt-1">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <p className="mb-2 font-medium text-gray-700">
                    Your account is now secure
                  </p>
                  <p>
                    You can now sign in with your new password. For security
                    reasons, you'll need to sign in again on all devices.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-4 bg-gray-800 text-white rounded-2xl font-medium hover:bg-gray-900 transition-all duration-300 shadow-lg text-sm tracking-wide">
                Continue to Sign In
              </button>
            </div>
          </div>

          {/* Security Tips */}
          <div className="mt-6 backdrop-blur-xl bg-white/80 rounded-2xl border border-gray-200/50 shadow-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Shield className="w-4 h-4 text-gray-600" />
              </div>
              <h3 className="font-medium text-gray-800">Security Tips</h3>
            </div>
            <div className="text-sm text-gray-600 leading-relaxed space-y-2">
              <p>• Keep your password secure and don't share it</p>
              <p>• Consider using a password manager</p>
              <p>• Update your password regularly</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const passwordStrength = getPasswordStrength(newPassword);
  const passwordValidationErrors = validatePassword(newPassword);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center px-4 py-30">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Key className="w-8 h-8 text-gray-600" />
          </div>

          <h1 className="text-3xl font-light text-gray-800 mb-3 tracking-wide">
            Reset Your Password
          </h1>
          <p className="text-gray-600 leading-relaxed mb-4">
            Create a new password for your account
          </p>

          {/* Email Display */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100/80 rounded-xl border border-gray-200">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">
              {userEmail}
            </span>
          </div>
        </div>

        {/* Main Card */}
        <div className="backdrop-blur-xl bg-white/90 rounded-3xl border border-gray-200/50 shadow-2xl p-8">
          <div className="space-y-6">
            {/* New Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                New Password
              </label>
              <div className="relative text-sm">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, newPassword: "" }));
                  }}
                  placeholder="Enter your new password"
                  className={`w-full pl-12 pr-12 py-4 rounded-xl bg-white/80 border transition-all duration-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent ${
                    errors.newPassword
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-gray-300"
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength.strength === 1
                            ? "w-1/4 bg-red-500"
                            : passwordStrength.strength === 2
                            ? "w-1/2 bg-orange-500"
                            : passwordStrength.strength === 3
                            ? "w-3/4 bg-blue-500"
                            : "w-full bg-green-500"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-xs font-medium ${passwordStrength.color}`}
                    >
                      {passwordStrength.text}
                    </span>
                  </div>
                </div>
              )}

              {errors.newPassword && (
                <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.newPassword}</span>
                </div>
              )}

              {/* Password Requirements */}
              {newPassword && passwordValidationErrors.length > 0 && (
                <div className="mt-3 p-4 bg-gray-50/60 rounded-xl border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Password Requirements:
                  </p>
                  <div className="space-y-1">
                    {passwordValidationErrors.map((error, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Confirm New Password
              </label>
              <div className="relative text-sm">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                  }}
                  placeholder="Confirm your new password"
                  className={`w-full pl-12 pr-12 py-4 rounded-xl bg-white/80 border transition-all duration-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent ${
                    errors.confirmPassword
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-gray-300"
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Match Indicator */}
              {confirmPassword && (
                <div className="flex items-center gap-2 mt-2">
                  {newPassword === confirmPassword ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">
                        Passwords match
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-orange-600">
                        Passwords don't match
                      </span>
                    </>
                  )}
                </div>
              )}

              {errors.confirmPassword && (
                <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.confirmPassword}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || !newPassword || !confirmPassword}
              className={`w-full py-4 rounded-2xl font-medium text-sm tracking-wide transition-all duration-300 shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2 ${
                isLoading || !newPassword || !confirmPassword
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-900 text-white"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating Password...
                </>
              ) : (
                <>
                  <Key className="w-5 h-5" />
                  Update Password
                </>
              )}
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 backdrop-blur-xl bg-white/80 rounded-2xl border border-gray-200/50 shadow-xl p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
              <Shield className="w-4 h-4 text-gray-600" />
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-700 mb-1">Security Notice</p>
              <p className="leading-relaxed">
                After updating your password, you'll be signed out of all
                devices for security. You'll need to sign in again with your new
                password.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
