"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, MessageCircle } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your Summa Logistics Copilot. Ask me about shipment status, ESG data, or compliance checks. Try asking: 'Where is shipment #459?' or 'What were my total carbon emissions for April?'",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "Sorry, I couldn't process that request.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-40 border-4 border-white"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-8 right-8 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border-2 border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b-2 border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl">
            <div>
              <h3 className="font-bold text-lg">Supply Chain Copilot</h3>
              <p className="text-xs text-blue-100 mt-0.5">Powered by Claude AI</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 p-1 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t-2 border-gray-200 p-4 flex gap-2 bg-gray-50">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about shipments..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-sm font-medium"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-xl hover:shadow-lg disabled:bg-gray-300 transition-all duration-200"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
