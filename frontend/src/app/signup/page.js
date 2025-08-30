"use client";
import React, { useState } from "react";
// import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Check,
  AlertCircle,
  UserPlus,
  Shield,
  CheckCircle,
} from "lucide-react";

const SignupForm = () => {
  // const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreements, setAgreements] = useState({
    terms: false,
    newsletter: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAgreementChange = (name) => {
    setAgreements((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
    if (errors.terms && name === "terms") {
      setErrors((prev) => ({
        ...prev,
        terms: "",
      }));
    }
  };

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const validationErrors = validatePassword(formData.password);
      if (validationErrors.length > 0) {
        newErrors.password = "Password does not meet requirements";
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreements.terms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log("Signup submitted:", formData);
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
                Account Created Successfully
              </h1>
              <p className="text-gray-600 leading-relaxed">
                Welcome to our platform! Your account has been created for
              </p>
              <p className="text-gray-800 font-medium mt-1">{formData.email}</p>
            </div>

            <div className="bg-green-50/60 rounded-2xl border border-green-200 p-6 mb-6">
              <div className="flex items-start gap-3 text-left">
                <div className="p-2 bg-green-100 rounded-lg flex-shrink-0 mt-1">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <p className="mb-2 font-medium text-gray-700">What's next?</p>
                  <p>
                    We've sent a verification email to your address. Please
                    verify your email to access all features.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => console.log("Navigate to login")}
                className="w-full py-4 bg-gray-800 text-white rounded-2xl font-medium hover:bg-gray-900 transition-all duration-300 shadow-lg text-sm tracking-wide"
              >
                Continue to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordValidationErrors = validatePassword(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center px-4 py-30">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <UserPlus className="w-8 h-8 text-gray-600" />
          </div>

          <h1 className="text-3xl font-light text-gray-800 mb-3 tracking-wide">
            Create Your Account
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Join us today and get started
          </p>
        </div>

        {/* Main Card */}
        <div className="backdrop-blur-xl bg-white/90 rounded-3xl border border-gray-200/50 shadow-2xl p-8">
          <div className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="relative text-sm">
                  <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 border transition-all duration-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent ${
                      errors.firstName
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-200 focus:ring-gray-300"
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.firstName && (
                  <div className="flex items-center gap-2 text-red-600 text-xs">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{errors.firstName}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div className="relative text-sm">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className={`w-full px-4 py-4 rounded-xl bg-white/80 border transition-all duration-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent ${
                      errors.lastName
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-200 focus:ring-gray-300"
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.lastName && (
                  <div className="flex items-center gap-2 text-red-600 text-xs">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{errors.lastName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative text-sm">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 border transition-all duration-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent ${
                    errors.email
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-gray-300"
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="relative text-sm">
                <Phone className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 border transition-all duration-300 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent ${
                    errors.phone
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-gray-300"
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.phone && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.phone}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative text-sm">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
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

              {/* Password Strength Indicator */}
              {formData.password && (
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

              {errors.password && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.password}</span>
                </div>
              )}

              {/* Password Requirements */}
              {formData.password && passwordValidationErrors.length > 0 && (
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

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative text-sm">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
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
              {formData.confirmPassword && (
                <div className="flex items-center gap-2 mt-2">
                  {formData.password === formData.confirmPassword ? (
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
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.confirmPassword}</span>
                </div>
              )}
            </div>

            {/* Terms and Newsletter */}
            <div className="space-y-3">
              <div className="flex items-start">
                <button
                  type="button"
                  onClick={() => handleAgreementChange("terms")}
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 mr-3 mt-0.5 transition-all duration-300 ${
                    agreements.terms
                      ? "bg-gray-800 border-gray-800"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {agreements.terms && (
                    <Check className="w-3 h-3 text-white m-auto" />
                  )}
                </button>
                <div className="text-sm">
                  <span className="text-gray-700">I agree to the </span>
                  <button className="text-gray-800 hover:text-gray-900 font-medium underline underline-offset-2">
                    Terms of Service
                  </button>
                  <span className="text-gray-700"> and </span>
                  <button className="text-gray-800 hover:text-gray-900 font-medium underline underline-offset-2">
                    Privacy Policy
                  </button>
                </div>
              </div>

              {errors.terms && (
                <div className="flex items-center gap-2 text-red-600 text-sm ml-8">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.terms}</span>
                </div>
              )}

              <div className="flex items-start">
                <button
                  type="button"
                  onClick={() => handleAgreementChange("newsletter")}
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 mr-3 mt-0.5 transition-all duration-300 ${
                    agreements.newsletter
                      ? "bg-gray-800 border-gray-800"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {agreements.newsletter && (
                    <Check className="w-3 h-3 text-white m-auto" />
                  )}
                </button>
                <span className="text-sm text-gray-700">
                  Send me updates and marketing communications
                </span>
              </div>
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
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/90 text-gray-500">
                  Or sign up with
                </span>
              </div>
            </div>
          </div>

          {/* Social Signup Button */}
          <button className="w-full flex items-center justify-center px-4 py-4 border border-gray-200 rounded-2xl text-sm font-medium text-gray-700 bg-white/80 hover:bg-gray-50/80 transition-all duration-300 shadow-sm hover:shadow group">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
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

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                className="font-medium text-gray-800 hover:text-gray-900 underline underline-offset-2 transition-colors"
                onClick={() => router.push("/login")}
              >
                Sign in here
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
              <p className="font-medium text-gray-700 mb-1">
                Your data is secure
              </p>
              <p className="leading-relaxed">
                We use industry-standard encryption to protect your information
                and never share your data without your consent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
