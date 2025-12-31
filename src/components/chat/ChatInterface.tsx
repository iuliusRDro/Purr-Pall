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
    }, 1500 + Math.random() * 1000); // Random delay for realism
  };

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-[75vh] w-full max-w-sm glass-panel rounded-3xl overflow-hidden border border-white/60 relative"
    >
      {/* Header */}
      <div className="bg-white/40 backdrop-blur-md p-4 flex items-center gap-4 border-b border-white/30 relative z-10 shadow-sm">
        <button
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-white/50 transition-colors text-latte-espresso group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-x-1 transition-transform"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <div className="relative">
          <div
            className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-white shadow-md"
            style={{ backgroundImage: `url(${match.photoUrl})` }}
          />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <div>
          <h3 className="font-extrabold text-latte-espresso text-lg leading-tight">
            {match.name}
          </h3>
          <p className="text-xs text-latte-brown font-medium opacity-80">
            Online now
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-linear-to-b from-white/20 to-transparent">
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 p-8">
            <div className="text-6xl mb-4 grayscale opacity-80">👋</div>
            <p className="text-lg font-bold text-latte-espresso">
              Start chatting!
            </p>
            <p className="text-sm text-latte-brown">
              Say hello to {match.name} to break the ice.
            </p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.9,
                x: msg.sender === "user" ? 20 : -20,
              }}
              animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`max-w-[85%] px-5 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm relative ${
                msg.sender === "user"
                  ? "bg-latte-espresso text-white self-end rounded-tr-sm"
                  : "bg-white/80 backdrop-blur-sm text-latte-espresso self-start rounded-tl-sm border border-white/50"
              }`}
            >
              {msg.text}
              <span
                className={`text-[10px] absolute bottom-1 ${
                  msg.sender === "user"
                    ? "right-2 text-white/50"
                    : "left-2 text-latte-brown/50"
                }`}
              >
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            className="bg-white/60 backdrop-blur-sm border border-white/40 text-latte-espresso self-start px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm w-16"
          >
            <div className="flex gap-1 justify-center">
              <span className="w-1.5 h-1.5 bg-latte-brown rounded-full animate-[bounce_1s_infinite_-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-latte-brown rounded-full animate-[bounce_1s_infinite_-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-latte-brown rounded-full animate-bounce"></span>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="p-3 bg-white/60 backdrop-blur-md border-t border-white/40 flex items-center gap-2"
      >
        <div className="flex-1 relative group">
          <input
            type="text"
            value={inputText}
            maxLength={500}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-white/50 border border-white/20 rounded-full pl-5 pr-16 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-latte-espresso/20 focus:bg-white/80 transition-all text-latte-espresso placeholder:text-latte-brown/50 shadow-inner"
          />
          <span
            className={`absolute right-4 top-1/2 -translate-y-1/2 text-[10px] transition-colors pointer-events-none font-bold ${
              inputText.length > 450 ? "text-rose-500" : "text-latte-brown/30"
            }`}
          >
            {inputText.length}/500
          </span>
        </div>
        <motion.button
          type="submit"
          disabled={!inputText.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-full bg-latte-espresso text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-latte-espresso/20 transition-all shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={inputText.trim() ? "translate-x-0.5" : ""}
          >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </motion.button>
      </form>
    </motion.div>
  );
}
