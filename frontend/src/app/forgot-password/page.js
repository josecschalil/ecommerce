"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Send,
  Check,
  AlertCircle,
  Lock,
  Shield,
} from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center px-4 py-25">
        <div className="w-full max-w-md">
          {/* Success Card */}
          <div className="backdrop-blur-xl bg-white/90 rounded-3xl border border-gray-200/50 shadow-2xl p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-emerald-600" />
              </div>
              <h1 className="text-2xl font-light text-gray-800 mb-2 tracking-wide">
                Check Your Email
              </h1>
              <p className="text-gray-600 leading-relaxed">
                We've sent a password reset link to
              </p>
              <p className="text-gray-800 font-medium mt-1">{email}</p>
            </div>

            <div className="bg-gray-50/60 rounded-2xl border border-gray-200 p-6 mb-6">
              <div className="flex items-start gap-3 text-left">
                <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0 mt-1">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <p className="mb-2">
                    Click the link in the email to reset your password. The link
                    will expire in{" "}
                    <span className="font-medium text-gray-800">24 hours</span>.
                  </p>
                  <p>If you don't see the email, check your spam folder.</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full py-3 bg-gray-800 text-white rounded-2xl font-medium hover:bg-gray-900 transition-all duration-300 shadow-lg text-sm tracking-wide"
              >
                Send Another Link
              </button>

              <button className="text-sm w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </button>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 backdrop-blur-xl bg-white/80 rounded-2xl border border-gray-200/50 shadow-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Shield className="w-4 h-4 text-gray-600" />
              </div>
              <h3 className="font-medium text-gray-800">Need Help?</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              If you continue to have trouble accessing your account, please
              contact our support team.
            </p>
            <button className="mt-3 text-sm text-gray-800 hover:text-gray-900 font-medium underline underline-offset-2 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center px-4 py-25">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-gray-600" />
          </div>

          <h1 className="text-3xl font-light text-gray-800 mb-3 tracking-wide">
            Forgot Password?
          </h1>
          <p className="text-gray-600 leading-relaxed">
            No worries! Enter your email address and we'll send you a link to
            reset your password.
          </p>
        </div>

        {/* Main Card */}
        <div className="backdrop-blur-xl bg-white/90 rounded-3xl border border-gray-200/50 shadow-2xl p-8">
          <div className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your email address"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 border transition-all duration-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent ${
                    error
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-gray-300"
                  }`}
                  disabled={isLoading}
                />
              </div>
              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl font-medium text-sm tracking-wide transition-all duration-300 shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2 ${
                isLoading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-900 text-white"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Reset Link
                </>
              )}
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div className="leading-relaxed">
                <p className="mb-2 font-medium text-gray-700">
                  What happens next?
                </p>
                <ul className="space-y-1 text-gray-600">
                  <li>• You'll receive an email with a secure reset link</li>
                  <li>• The link expires in 24 hours for security</li>
                  <li>• Follow the link to create a new password</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Remember Password */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Remember your password?{" "}
            <button className="text-gray-800 hover:text-gray-900 font-medium underline underline-offset-2 transition-colors">
              Sign In
            </button>
          </p>
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
                For your security, password reset links can only be used once
                and expire after 24 hours. We'll never ask for your password via
                email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
