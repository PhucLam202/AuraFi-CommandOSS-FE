"use client";

import { useEffect, useState } from "react";
import TopbarItem from "../topBarItem/TopbarItem";
import ConnectWalletButton from "./ConnectWallet";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Link, useLocation } from "wouter";
import { useRouter } from 'next/navigation';
import { CircleUser, LogOut } from "lucide-react";
import UserProfileModal from "../modal/userDetailModals";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopBar = () => {
  const currentAccount = useCurrentAccount();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [location, setLocation] = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
  localStorage.removeItem('authToken');
  router.push("/");
};
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLocation("/");
    }
  }, [setLocation]);

  const navigationItems = [{ title: "Chatbot", path: "/chatbot" }];

  return (
    <header className="bg-beige-500 border-b border-slate-200 fixed top-0 right-0 left-0 z-10">
      {" "}
      {/* Changed to beige */}
      <div className="px-4 py-3 sm:px-6 flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <h1 className="font-heading font-bold text-xl text-black">
            {" "}
            {/* Changed text color to black */}
            <Link href="/">
              AuraFi AI{" "}
            </Link>
          </h1>
          <div className="flex items-center space-x-4">
            {navigationItems.map((item) => (
              <Link href={item.path} key={item.title}>
                <TopbarItem
                  title={item.title}
                  isActive={location === item.path}
                  onClick={() => setActiveItem(item.title)}
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-black">
              {" "}
              {/* Changed icon color to black */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search analytics..."
              className="border border-gray-300 rounded-3 py-2 pl-10 pr-4 text-sm w-64
                       transition-colors hover:border
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        placeholder:text-gray-600"
            />
          </div>

          <div className="relative">
            <button className="p-2 rounded-lg text-black">
              {" "}
              {/* Changed button text color to black */}
              <i className="fas fa-bell"></i>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-orange-200 via-amber-300 to-blue-200 opacity-90 hover:to-pink-700 text-white rounded-xl shadow-lg transition-all duration-300"
                  aria-label="User menu"
                >
                  <CircleUser className="w-5 h-5 text-yellow-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-yellow-100 rounded-xl shadow-lg border-none min-w-[180px] p-2">
                <DropdownMenuItem onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-black hover:bg-yellow-200 hover:text-black cursor-pointer">
                  <CircleUser className="w-4 h-4 text-yellow-600" /> Thông tin cá nhân
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg px-3 py-2 text-black hover:bg-yellow-200 hover:text-black cursor-pointer">
                  <div className="bg-white px-3 py-1.5 rounded-lg font-mono text-gray-700 text-sm shadow border h-10 flex items-center cursor-pointer">
                    <ConnectWalletButton />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 rounded-lg px-3 py-2 text-red-600 hover:bg-yellow-200 hover:text-red-700 cursor-pointer">
                  <LogOut className="w-4 h-4" /> Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <UserProfileModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
