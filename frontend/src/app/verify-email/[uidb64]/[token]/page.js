"use client";
import React, { useState, useEffect } from "react";
import {
  Mail,
  CheckCircle,
  XCircle,
  Loader2,
  Shield,
  ArrowRight,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const VerifyEmailPage = () => {
  const [verificationStatus, setVerificationStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");
  const [uidb64, setUidb64] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  // Extract uidb64 and token from raw pathname to preserve case sensitivity
  useEffect(() => {
    if (pathname) {
      const pathParts = pathname.split("/");
      // Expected format: /verify-email/[uidb64]/[token]
      if (pathParts.length >= 4 && pathParts[1] === "verify-email") {
        const extractedUidb64 = pathParts[2];
        const extractedToken = pathParts[3];
        setUidb64(extractedUidb64);
        setToken(extractedToken);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (uidb64 && token) {
      console.log("Extracted parameters:", { uidb64, token }); // Debug log
      verifyEmail();
    } else if (pathname && pathname.includes("/verify-email/")) {
      // Still extracting parameters, wait a bit
      setTimeout(() => {
        if (!uidb64 || !token) {
          setVerificationStatus("error");
          setMessage(
            "Invalid verification link. Please check your email for the correct link."
          );
        }
      }, 100);
    }
  }, [uidb64, token, pathname]);

  const verifyEmail = async () => {
    try {
      setVerificationStatus("loading");

      console.log("Making request with:", { uidb64, token }); // Debug log

      // Replace with your actual backend domain
      const backendDomain =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
      const apiUrl = `${backendDomain}/api/verify-email/${uidb64}/${token}/`;

      console.log("API URL:", apiUrl); // Debug log

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationStatus("success");
        setMessage(data.message || "Email verified successfully!");

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setVerificationStatus("error");
        setMessage(
          data.error ||
            data.message ||
            "Email verification failed. Please try again."
        );
      }
    } catch (error) {
      setVerificationStatus("error");
      setMessage(
        "Network error occurred. Please check your connection and try again."
      );
      console.error("Verification error:", error);
    }
  };

  const handleRetryVerification = () => {
    if (uidb64 && token) {
      verifyEmail();
    }
  };

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
              verificationStatus === "success"
                ? "bg-green-100"
                : verificationStatus === "error"
                ? "bg-red-100"
                : "bg-gray-100"
            }`}
          >
            {verificationStatus === "loading" && (
              <Loader2 className="w-8 h-8 text-gray-600 animate-spin" />
            )}
            {verificationStatus === "success" && (
              <CheckCircle className="w-8 h-8 text-green-600" />
            )}
            {verificationStatus === "error" && (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
          </div>

          <h1 className="text-3xl font-light text-gray-800 mb-3 tracking-wide">
            {verificationStatus === "loading" && "Verifying Email"}
            {verificationStatus === "success" && "Email Verified"}
            {verificationStatus === "error" && "Verification Failed"}
          </h1>
          <p className="text-gray-600 leading-relaxed">
            {verificationStatus === "loading" &&
              "Please wait while we verify your email address"}
            {verificationStatus === "success" &&
              "Your email has been successfully verified"}
            {verificationStatus === "error" &&
              "There was an issue verifying your email"}
          </p>
        </div>

        {/* Main Card */}
        <div className="backdrop-blur-xl bg-white/90 rounded-3xl border border-gray-200/50 shadow-2xl p-8">
          <div className="text-center space-y-6">
            {/* Status Icon and Message */}
            <div className="space-y-4">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
                  verificationStatus === "success"
                    ? "bg-green-50 border-2 border-green-200"
                    : verificationStatus === "error"
                    ? "bg-red-50 border-2 border-red-200"
                    : "bg-gray-50 border-2 border-gray-200"
                }`}
              >
                {verificationStatus === "loading" && (
                  <Loader2 className="w-10 h-10 text-gray-500 animate-spin" />
                )}
                {verificationStatus === "success" && (
                  <CheckCircle className="w-10 h-10 text-green-500" />
                )}
                {verificationStatus === "error" && (
                  <XCircle className="w-10 h-10 text-red-500" />
                )}
              </div>

              <div
                className={`text-sm font-medium px-4 py-3 rounded-xl ${
                  verificationStatus === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : verificationStatus === "error"
                    ? "bg-red-50 text-red-800 border border-red-200"
                    : "bg-gray-50 text-gray-800 border border-gray-200"
                }`}
              >
                {message}
              </div>
            </div>

            {/* Loading State */}
            {(verificationStatus === "loading" ||
              verificationStatus === "initializing") && (
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                </div>
                <p className="text-sm text-gray-600">
                  This may take a few seconds...
                </p>
              </div>
            )}

            {/* Success State */}
            {verificationStatus === "success" && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 text-green-800">
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium">Welcome aboard!</p>
                      <p>You can now sign in to your account.</p>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  Redirecting to login page in 3 seconds...
                </div>

                <button
                  onClick={handleGoToLogin}
                  className="w-full py-4 rounded-2xl font-medium text-sm tracking-wide transition-all duration-300 shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white"
                >
                  Continue to Login
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Error State */}
            {verificationStatus === "error" && (
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="text-red-800 text-sm space-y-2">
                    <p className="font-medium">What you can do:</p>
                    <ul className="text-left space-y-1">
                      <li>
                        • Check if you clicked the correct verification link
                      </li>
                      <li>• Try requesting a new verification email</li>
                      <li>• Contact support if the issue persists</li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleRetryVerification}
                    className="w-full py-4 rounded-2xl font-medium text-sm tracking-wide transition-all duration-300 shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Loader2 className="w-5 h-5" />
                    Try Again
                  </button>

                  <button
                    onClick={handleGoToLogin}
                    className="w-full py-4 rounded-2xl font-medium text-sm tracking-wide transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-800"
                  >
                    Go to Login
                  </button>
                </div>
              </div>
            )}
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
                Secure Verification
              </p>
              <p className="leading-relaxed">
                This verification process ensures the security and authenticity
                of your email address.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
