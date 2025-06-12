"use client";

import { useState } from 'react';
import ChatSidebar from '@/components/layouts/chatSidebar';
import { Chat } from '@/components/ui/chat';
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSuiWallet } from "../../hooks/useSuiWallet";
import {
  AIInput,
  AIInputButton,
  AIInputModelSelect,
  AIInputModelSelectContent,
  AIInputModelSelectItem,
  AIInputModelSelectTrigger,
  AIInputModelSelectValue,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from "@/components/ui/chat/ai/input";
import {
  GlobeIcon,
  MicIcon,
  PlusIcon,
  SendIcon,
  MessageCircleIcon,
} from "lucide-react";
import { useLocation } from "wouter";

const TopBar = dynamic(() => import("@/components/layouts/Topbar"), {
  ssr: false,
});
const MobileNavigation = dynamic(
  () => import("@/components/layouts/MobileNavigation"),
  { ssr: false }
);

// Mock models for empty state
const mockModels = [
  { id: "gpt-4", name: "GPT-4", description: "Most capable model" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fast and efficient" },
  { id: "claude-2", name: "Claude 2", description: "Anthropic's latest model" },
  { id: "claude-instant", name: "Claude Instant", description: "Fast Claude model" },
];

// Empty chat state component
function EmptyChatState() {
  const [model, setModel] = useState<string>(mockModels[0].id);

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] w-full space-y-4">
      {/* Empty chat messages area */}
      <div className="flex-1 p-4 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="size-full overflow-y-auto flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <MessageCircleIcon size={32} className="text-gray-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">
                Welcome to AI Assistant
              </h3>
              <p className="text-gray-500 text-sm max-w-md">
                Select a conversation from the sidebar or create a new conversation to get started.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disabled input form */}
      <AIInput onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <AIInputTextarea 
          disabled={true}
          placeholder="Select a conversation to start..."
          className="cursor-not-allowed"
        />
        <AIInputToolbar>
          <AIInputTools>
            <AIInputButton disabled={true}>
              <PlusIcon size={16} />
            </AIInputButton>
            <AIInputButton disabled={true}>
              <MicIcon size={16} />
            </AIInputButton>
            <AIInputButton disabled={true}>
              <GlobeIcon size={16} />
              <span>Search</span>
            </AIInputButton>
            <AIInputModelSelect value={model} onValueChange={setModel} disabled={true}>
              <AIInputModelSelectTrigger>
                <AIInputModelSelectValue />
              </AIInputModelSelectTrigger>
              <AIInputModelSelectContent>
                {mockModels.map((model) => (
                  <AIInputModelSelectItem key={model.id} value={model.id}>
                    {model.name}
                  </AIInputModelSelectItem>
                ))}
              </AIInputModelSelectContent>
            </AIInputModelSelect>
          </AIInputTools>
          <AIInputSubmit disabled={true}>
            <SendIcon size={16} />
          </AIInputSubmit>
        </AIInputToolbar>
      </AIInput>
    </div>
  );
}

export default function ChatPage() {
  const router = useRouter();
  const { isConnected } = useSuiWallet();
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLocation("/login");
    }
  }, [setLocation]);

  return (
    <div className="flex flex-col min-h-screen lg:flex-row ">
      <main className="flex-1">
        <TopBar />

        <div className="pt-16 pb-16 lg:pb-0 bg-gradient-to-br from-orange-200 via-amber-300 to-blue-200 opacity-90">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
              <div className="lg:col-span-2">
                <div className="flex flex-col lg:flex-row">
                  <div className="w-80 min-w-[18rem] max-w-xs">
                    <ChatSidebar 
                      onRoomSelect={(roomId) => {
                        setSelectedRoomId(roomId);
                      }} 
                      onNewRoom={() => {}} 
                    />
                  </div>

                  <div className="flex-1 xl:pl-6 lg:pl-4 md:pl-2 sm:pl-1">
                    {selectedRoomId ? (
                      <Chat roomId={selectedRoomId} />
                    ) : (
                      <EmptyChatState />
                    )}
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
}