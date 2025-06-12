"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AIMessage, AIMessageAvatar, AIMessageContent } from "./ai/message";
import { AIResponse } from "./ai/response";
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
} from "./ai/input";
import {
  GlobeIcon,
  MicIcon,
  PlusIcon,
  SendIcon,
  StopCircleIcon,
} from "lucide-react";
import type { FormEventHandler } from "react";
import axios, { AxiosError } from "axios";
import { useSuiWallet } from "@/hooks/useSuiWallet";

// Types
export type Message = {
  id: string;
  from: "user" | "assistant";
  content: string;
  avatar: string;
  name: string;
  timestamp: string;
  codeBlocks?: CodeBlock[];
  isTyping?: boolean;
  tokens?: string[];
};

export type CodeBlock = {
  language: string;
  filename: string;
  code: string;
};

export type Model = {
  id: string;
  name: string;
  description?: string;
};

export type ApiError = {
  message: string;
  code?: string;
  status?: number;
};

// Backend response types
type BackendMessage = {
  _id: string;
  roomId: string;
  role: "user" | "assistant";
  content: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type BackendRoomResponse = {
  data: {
    _id: string;
    userId: string;
    title: string;
    isActive: boolean;
    messages: BackendMessage[];
    context: {
      summary: string;
      keywords: string[];
      conversationStyle: string;
      lastUpdated: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  msg: string;
  code: number;
};

interface ChatProps {
  roomId: string;
}

// Constants
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/v1';
const DEFAULT_AVATAR = "https://github.com/openai.png";
const USER_AVATAR = "https://github.com/haydenbleasel.png";

// Mock models
const mockModels: Model[] = [
  { id: "gpt-4", name: "GPT-4", description: "Most capable model" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fast and efficient" },
  { id: "claude-2", name: "Claude 2", description: "Anthropic's latest model" },
  { id: "claude-instant", name: "Claude Instant", description: "Fast Claude model" },
  { id: "palm-2", name: "PaLM 2", description: "Google's latest model" },
  { id: "llama-2-70b", name: "Llama 2 70B", description: "Meta's largest model" },
  { id: "llama-2-13b", name: "Llama 2 13B", description: "Meta's efficient model" },
  { id: "cohere-command", name: "Command", description: "Cohere's latest model" },
  { id: "mistral-7b", name: "Mistral 7B", description: "Efficient open model" },
];

// Custom hooks
const useAuthToken = () => {
  // Better: Use secure httpOnly cookies or server-side session
  return typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
};

const useScrollToBottom = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, []);

  return { ref, scrollToBottom };
};

// Transform backend message to frontend message
const transformBackendMessage = (backendMsg: BackendMessage): Message => {
  return {
    id: backendMsg._id,
    from: backendMsg.role === "user" ? "user" : "assistant",
    content: backendMsg.content,
    avatar: backendMsg.role === "user" ? USER_AVATAR : DEFAULT_AVATAR,
    name: backendMsg.role === "user" ? "User" : "AI Assistant",
    timestamp: backendMsg.createdAt,
    codeBlocks: []
  };
};

// API functions
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

const loadMessages = async (roomId: string, authToken: string | null): Promise<Message[]> => {
  if (!authToken) throw new Error('No auth token available');
  
  const response = await apiClient.get<BackendRoomResponse>(`/room/${roomId}`, {
    headers: { authorization: `Bearer ${authToken}` }
  });
  
  // Transform backend messages to frontend format
  const backendMessages = response.data.data.messages || [];
  return backendMessages.map(transformBackendMessage);
};

const sendMessage = async (
  roomId: string, 
  messageContent: string, 
  authToken: string | null
): Promise<Message> => {
  if (!authToken) throw new Error('No auth token available');
  
  const response = await apiClient.post(
    `/room/${roomId}/messages`,
    { messageContent },
    { headers: { authorization: `Bearer ${authToken}` } }
  );
  
  return response.data.data;
};

export function Chat({ roomId }: ChatProps) {
  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [model, setModel] = useState<string>(mockModels[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs
  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Custom hooks
  const authToken = useAuthToken();
  const { walletAddress } = useSuiWallet();
  const { ref: chatContainerRef, scrollToBottom } = useScrollToBottom();

  // Memoized values
  const currentUser = useMemo(() => ({
    name: "User", 
    avatar: USER_AVATAR,
  }), []);

  // Load messages effect
  useEffect(() => {
    let isMounted = true;
    
    const loadMessagesAsync = async () => {
      if (!roomId || !authToken) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const data = await loadMessages(roomId, authToken);
        
        if (isMounted) {
          // Sort messages by timestamp to ensure correct order
          const sortedMessages = data.sort((a, b) => 
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
          setMessages(sortedMessages);
        }
      } catch (err) {
        console.error('Error loading messages:', err);
        if (isMounted) {
          setError('Failed to load messages');
          setMessages([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadMessagesAsync();
    
    return () => {
      isMounted = false;
    };
  }, [roomId, authToken]);

  // Auto-scroll effect
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Error handler
  const handleError = useCallback((error: unknown, fallbackMessage: string) => {
    console.error('Chat error:', error);
    
    let errorMessage = fallbackMessage;
    
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message || fallbackMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    setError(errorMessage);
    
    // Add error message to chat
    const errorMsg: Message = {
      id: `error-${Date.now()}`,
      from: "assistant",
      content: `Sorry, there was an error: ${errorMessage}`,
      avatar: DEFAULT_AVATAR,
      name: "System",
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, errorMsg]);
  }, []);

  // Submit handler
  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(async (event) => {
    event.preventDefault();
    
    const form = event.currentTarget;
    const formData = new FormData(form);
    const message = formData.get("message") as string;

    if (!message?.trim() || isTyping || !authToken) return;

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setError(null);

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      from: "user",
      content: message.trim(),
      avatar: currentUser.avatar,
      name: currentUser.name,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    form.reset();

    try {
      const aiResponse = await sendMessage(roomId, message.trim(), authToken);
      
      const aiMessage: Message = {
        id: aiResponse.id || `ai-${Date.now()}`,
        from: aiResponse.from || "assistant",
        content: aiResponse.content,
        avatar: aiResponse.avatar || DEFAULT_AVATAR,
        name: aiResponse.name || "AI Assistant",
        timestamp: aiResponse.timestamp || new Date().toISOString(),
        codeBlocks: aiResponse.codeBlocks || []
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      if (!abortControllerRef.current?.signal.aborted) {
        handleError(error, "Failed to send message");
      }
    } finally {
      setIsTyping(false);
      abortControllerRef.current = null;
    }
  }, [roomId, authToken, isTyping, currentUser, handleError]);

  // Stop handler
  const handleStop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsTyping(false);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-12rem)] w-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] w-full space-y-4">
      {/* Error display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 w-full">
          <p className="text-red-700 text-sm">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="text-red-600 hover:text-red-800 underline text-xs mt-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Chat messages */}
      <div className="flex-1 p-4 bg-white rounded-lg shadow-md overflow-hidden">
        <div ref={chatContainerRef} className="size-full overflow-y-auto space-y-4">
          {messages.length === 0 && !isLoading && (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>No messages yet. Start a conversation!</p>
            </div>
          )}
          
          {messages.map((message) => (
            <AIMessage key={message.id} from={message.from}>
              <AIMessageContent>
                <AIResponse>{message.content}</AIResponse>
              </AIMessageContent>
              <AIMessageAvatar src={message.avatar} name={message.name} />
            </AIMessage>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <AIMessage from="assistant">
              <AIMessageContent>
                <div className="flex space-x-2" aria-label="AI is typing">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </AIMessageContent>
              <AIMessageAvatar src={DEFAULT_AVATAR} name="AI Assistant" />
            </AIMessage>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input form */}
      <AIInput onSubmit={handleSubmit}>
        <AIInputTextarea 
          disabled={isTyping || !authToken}
          placeholder={!authToken ? "Please connect your wallet to chat" : "Type your message..."}
        />
        <AIInputToolbar>
          <AIInputTools>
            <AIInputButton disabled={isTyping}>
              <PlusIcon size={16} />
            </AIInputButton>
            <AIInputButton disabled={isTyping}>
              <MicIcon size={16} />
            </AIInputButton>
            <AIInputButton disabled={isTyping}>
              <GlobeIcon size={16} />
              <span>Search</span>
            </AIInputButton>
            <AIInputModelSelect value={model} onValueChange={setModel} disabled={isTyping}>
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
          <AIInputSubmit 
            onClick={isTyping ? handleStop : undefined}
            disabled={!authToken}
            type={isTyping ? "button" : "submit"}
          >
            {isTyping ? (
              <StopCircleIcon size={16} />
            ) : (
              <SendIcon size={16} />
            )}
          </AIInputSubmit>
        </AIInputToolbar>
      </AIInput>
    </div>
  );
}