"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cat, Message } from "@/types/cat";

interface ChatInterfaceProps {
  match: Cat;
  onBack: () => void;
}

const CAT_PHRASES = [
  "Meow!",
  "Purr...",
  "Can I have a treat?",
  "Zzz...",
  "Feed me.",
  "*Knocks glass off table*",
  "Mrrp?",
  "Hiss! (Just kidding)",
];

export default function ChatInterface({ match, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputText.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate cat typing delay
    setTimeout(() => {
      const randomPhrase =
        CAT_PHRASES[Math.floor(Math.random() * CAT_PHRASES.length)];
      const catMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "cat",
        text: randomPhrase,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, catMsg]);
      setIsTyping(false);
    }, 1500);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-[70vh] w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden border border-latte-cream">
      {/* Header */}
      <div className="bg-latte-white p-4 flex items-center gap-3 border-b border-latte-cream relative z-10">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors text-latte-brown"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <div
          className="w-10 h-10 rounded-full bg-cover bg-center border border-latte-cream"
          style={{ backgroundImage: `url(${match.photoUrl})` }}
        />
        <div>
          <h3 className="font-bold text-latte-espresso leading-none">
            {match.name}
          </h3>
          <p className="text-xs text-latte-brown">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-latte-white/50">
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
            <div className="text-4xl mb-2">👋</div>
            <p className="text-sm">Say hello to {match.name}!</p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                msg.sender === "user"
                  ? "bg-latte-espresso text-white self-end rounded-tr-sm"
                  : "bg-white border border-latte-cream text-latte-espresso self-start rounded-tl-sm shadow-sm"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white border border-latte-cream text-latte-espresso self-start px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm"
          >
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-latte-brown rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-latte-brown rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-latte-brown rounded-full animate-bounce"></span>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="p-3 bg-white border-t border-latte-cream flex items-center gap-2"
      >
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputText}
            maxLength={500}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-latte-white border-none rounded-full pl-4 pr-16 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-latte-cream text-latte-espresso placeholder:text-latte-brown/50"
          />
          <span
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs transition-colors pointer-events-none ${
              inputText.length > 450
                ? "text-red-500 font-bold"
                : "text-latte-brown/50"
            }`}
          >
            {inputText.length}/500
          </span>
        </div>
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2 rounded-full bg-latte-espresso text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
      </form>
    </div>
  );
}
