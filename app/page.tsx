'use client'

import TopBar from "../components/layouts/Topbar";
import MobileNavigation from "../components/layouts/MobileNavigation";
import ChatInterface from "../components/ChatBotInterface";
import { Chat } from "@/components/ui/chat";
const Chatbot = () => {
  return (
    <div className="flex flex-col min-h-screen lg:flex-row">
      {/* Main content */}
      <main className="flex-1">
        {/* TopBar */}
        <TopBar />

        {/* Content area */}
        <div className="pt-16 pb-16 lg:pb-0 bg-amber-100">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
              <div className="lg:col-span-2">
                {/* <ChatInterface /> */}
                <Chat />
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