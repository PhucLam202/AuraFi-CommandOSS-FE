'use client'

import { Chat } from "@/components/ui/chat";
import dynamic from 'next/dynamic';

const TopBar = dynamic(() => import('@/components/layouts/Topbar'), { ssr: false });
const MobileNavigation = dynamic(() => import('@/components/layouts/MobileNavigation'), { ssr: false });

const Chatbot = () => {
  return (
    <div className="flex flex-col min-h-screen lg:flex-row">
      <main className="flex-1">
        <TopBar />

        <div className="pt-16 pb-16 lg:pb-0 bg-amber-100">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
              <div className="lg:col-span-2">
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