"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  User,
  Shield,
} from "lucide-react";

axios.defaults.withCredentials = true;

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "Josecschalil@gmail.com",
    password: "PASSpass1234*#",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  useEffect(() => {
    const verifySession = async () => {
      try {
        // Step 1: Optimistically check if the access token is still valid.
        // We do this by hitting a protected endpoint that requires authentication.
        // A common endpoint is one that fetches the current user's data.
        await axios.get("http://127.0.0.1:8000/api/user/profile/"); // ⚠️ ASSUMPTION: This is your protected route

        // If the request above succeeds, the access token is valid. Redirect.
        console.log("Active session found. Redirecting to profile.");
        window.location.href = "/profile";
      } catch (error) {
        // If it fails (e.g., 401 Unauthorized), the access token is likely expired.
        console.log("Access token invalid, attempting to refresh...");

        try {
          // Step 2: Fallback to refreshing the token using the HttpOnly refresh token.
          await axios.post("http://127.0.0.1:8000/api/token/refresh/");

          // If the refresh is successful, new tokens are set by the backend. Redirect.
          console.log("Token refresh successful. Redirecting to profile.");
          window.location.href = "/profile";
        } catch (refreshError) {
          // If the refresh also fails, the user is not authenticated. Show the login form.
          console.log("No valid session found. Please log in.");
          setIsVerifying(false); // Stop verifying and show the form
        }
      }
    };

    verifySession();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (apiError) {
      setApiError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setApiError("");
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const normalizedEmail = formData.email.toLowerCase();
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email: normalizedEmail,
        password: formData.password,
      });

      // With HttpOnly cookies, we don't get tokens back in the response body.
      // A successful status code (200 OK) is all we need to confirm the login.
      // The browser will automatically store the cookies sent by the server.
      if (response.status === 200) {
        console.log("Login successful:", response.data.message);

        // No longer need to store tokens or user ID in local storage.
        // On success, redirect to the dashboard. Authenticated requests from here
        // will automatically include the cookies.
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Login error:", error);
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        // The error response from DRF for invalid credentials might be in a 'non_field_errors'
        // key or a general 'detail' key. This handles both.
        const errorData = error.response.data;
        const errorMessage =
          errorData.detail ||
          (errorData.non_field_errors
            ? errorData.non_field_errors.join(" ")
            : "Invalid email or password. Please try again.");
        setApiError(errorMessage);
      } else {
        setApiError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg rounded-2xl flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-gray-600" />
          </div>
          <h1 className="text-3xl font-light text-gray-800 mb-3 tracking-wide">
            Welcome Back
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Sign in to your account to continue
          </p>
        </div>

        {/* Main Card */}
        <div className="backdrop-blur-xl bg-white/90 rounded-3xl border border-gray-200/50 shadow-2xl p-8 text-sm">
          <div className="space-y-6">
            {/* Email Field */}
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
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 border transition-all duration-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent ${
                    errors.email
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-gray-300"
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`w-full pl-12 pr-12 py-4 rounded-xl bg-white/80 border transition-all duration-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent ${
                    errors.password
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-gray-300"
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* API Error Message Display */}
            {apiError && (
              <div className="flex items-start text-center gap-2.5 text-red-600 bg-red-50 p-3 rounded-lg text-sm mt-4">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1">{apiError}</span>
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-gray-800 border-gray-300 rounded focus:ring-gray-300 focus:ring-2 transition-colors"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => (window.location.href = "/forgot-password")}
                className="text-sm text-gray-800 hover:text-gray-900 font-medium underline underline-offset-2 transition-colors"
              >
                Forgot password?
              </button>
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
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="my-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/90 text-gray-500 font-medium">
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          {/* Social Login */}
          <button className="w-full flex items-center justify-center gap-3 px-4 py-4 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white/80 hover:bg-white/90 transition-all duration-300 shadow-md hover:shadow-lg">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285f4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34a853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#fbbc05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#ea4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <div className="mt-6 text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => (window.location.href = "/signup")}
                className="text-gray-800 hover:text-gray-900 font-medium underline underline-offset-2 transition-colors"
              >
                Sign up now
              </button>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 backdrop-blur-xl bg-white/80 rounded-2xl border border-gray-200/50 shadow-xl p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
              <Shield className="w-4 h-4 text-gray-600" />
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-700 mb-1">Secure Sign In</p>
              <p className="leading-relaxed">
                Your login is protected with industry-standard encryption and
                security measures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
