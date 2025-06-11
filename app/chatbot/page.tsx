"use client";

import { Chat } from "@/components/ui/chat";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSuiWallet } from "../../hooks/useSuiWallet";

const TopBar = dynamic(() => import("@/components/layouts/Topbar"), {
  ssr: false,
});
const MobileNavigation = dynamic(
  () => import("@/components/layouts/MobileNavigation"),
  { ssr: false }
);
const Sidebar = dynamic(() => import("@/components/layouts/chatSidebar"), {
  ssr: false,
});

const Chatbot = () => {
  const router = useRouter();
  const { isConnected } = useSuiWallet();
 
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen lg:flex-row ">
      <main className="flex-1">
        <TopBar />

        <div className="pt-16 pb-16 lg:pb-0 bg-gradient-to-br from-orange-200 via-amber-300 to-blue-200 opacity-90">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
              <div className="lg:col-span-2">
                <div className="flex flex-col lg:flex-row">
                  <Sidebar onRoomSelect={() => {}} onNewRoom={() => {}} />

                  <div className="xl:pl-6 lg:pl-4 md:pl-2 sm:pl-1">
                    <Chat />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <MobileNavigation />
      </main>
    </div>
  );
};

export default Chatbot;
