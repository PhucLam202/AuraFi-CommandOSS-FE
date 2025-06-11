"use client";

import React, { useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ConnectWalletButton from "@/components/layouts/ConnectWallet";
import { useSuiWallet } from "../../hooks/useSuiWallet";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { walletAddress, isConnected } = useSuiWallet();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleLoginWithSui = async (userAddress: string) => {
    setError(null);
    setSuccess(false);
    setIsLoading(true);
    try {
      if (!userAddress) {
        setError("Please connect your wallet to login");
        setIsLoading(false);
        return;
      }
      const response = await fetch("http://localhost:5000/v1/auth/loginWithSui", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          suiaddress: userAddress,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        if (data.data.token) {
          localStorage.setItem("authToken", data.data.token);
        } else {
          console.error("Token is undefined!");
        }
        localStorage.setItem("userWallet", userAddress);
        toast.success('Login success!');
        router.push("/chatbot");
      } else {
        setError(
          data.message ||
            "Login failed. Please check your email and password."
        );
        console.error("Lỗi đăng nhập:", data);
      }
    } catch (err) {
      setError("An error occurred while logging in.");
      console.error("Error when calling login API:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const { email, password } = formData;
      const response = await fetch('http://localhost:5000/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.data.token);
        setSuccess(true);
        toast.success('Login success!');
        router.push('/chatbot'); 
      } else {
        if (data.errCode === 20011) {
          toast.error(data.msg || 'This account is registered with a wallet. Please login with your Sui wallet.');
        } else {
          toast.error(data.msg || data.message || 'Login failed. Please try again.');
        }
      }
    } catch (err) {
      toast.error("An error occurred while calling the login API.");
    } finally {
      setIsLoading(false);
    }
  };

  //login with sui
  useEffect(() => {
    if (isConnected && walletAddress) {
      handleLoginWithSui(walletAddress);
    }
  }, [isConnected, walletAddress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-blue-50 to-amber-100 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Chào mừng trở lại!
            </h1>
            <p className="text-gray-600">Đăng nhập vào AuraFi AI để tiếp tục</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-amber-500/30 focus:border-amber-500 transition-all duration-300 text-gray-800 placeholder-gray-500"
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-4 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-amber-500/30 focus:border-amber-500 transition-all duration-300 text-gray-800 placeholder-gray-500"
                  placeholder="Nhập mật khẩu"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              {/* <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
                />
                <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
              </label> */}
              <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Quên mật khẩu?
              </button>
            </div>

            {/* Login Button */}
            {isLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={handleLogin}
                  className="w-full bg-gradient-to-r from-blue-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-amber-600 focus:outline-none focus:ring-3 focus:ring-blue-500/30 transition-all duration-300"
                >
                  Đăng nhập
                </button>
                
                {/* Hiển thị nút Connect Wallet khi có lỗi wallet */}
                {error === "400" && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">This account is registered with a wallet. Please login with your Sui wallet.</p>
                    <ConnectWalletButton />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="my-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 text-gray-500">
                Hoặc đăng nhập với
              </span>
            </div>
          </div>

          {/* Social Register Buttons */}
          <div className="space-y-3">
            <div className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50/50 transition-all duration-300 hover:scale-[1.02] bg-white/30">
              <Wallet className="w-5 h-5" />
              <div className="text-gray-700 font-medium">
                <ConnectWalletButton />
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Chưa có tài khoản?{" "}
              <button
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors hover:underline"
                onClick={() => router.push("/register")}
              >
                Đăng ký ngay
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            © 2025 AuraFi AI. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
