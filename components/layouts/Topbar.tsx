import { useState } from "react";
import TopbarItem from "../topBarItem/TopbarItem";
import ConnectWalletButton from "./ConnectWallet";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Link, useLocation } from "wouter";

const TopBar = () => {
  const currentAccount = useCurrentAccount();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [location] = useLocation();

  const navigationItems = [
    { title: "Dashboard", path: "/" },
    { title: "Chatbot", path: "/chatbot" },
  ];

  return (
    <header className="bg-beige-500 border-b border-slate-200 fixed top-0 right-0 left-0 z-10"> {/* Changed to beige */}
      <div className="px-4 py-3 sm:px-6 flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <h1 className="font-heading font-bold text-xl text-black"> {/* Changed text color to black */}
            AI Agent
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
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-black"> {/* Changed icon color to black */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
            <button className="p-2 rounded-lg text-black"> {/* Changed button text color to black */}
              <i className="fas fa-bell"></i>
            </button>
          </div>

          <div className="lg:block hover:bg-amber-100" >
            <ConnectWalletButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;