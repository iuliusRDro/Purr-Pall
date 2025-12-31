"use client";

import React, { useState } from "react";
import CardDeck from "@/components/deck/CardDeck";
import MatchesList from "@/components/matches/MatchesList";
import ChatInterface from "@/components/chat/ChatInterface";
import { Cat } from "@/types/cat";
import { motion, AnimatePresence } from "framer-motion";

type View = "deck" | "matches" | "chat";

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("deck");
  const [selectedMatch, setSelectedMatch] = useState<Cat | null>(null);

  const handleMatchSelect = (cat: Cat) => {
    setSelectedMatch(cat);
    setCurrentView("chat");
  };

  const handleBackToMatches = () => {
    setSelectedMatch(null);
    setCurrentView("matches");
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-12 pb-28 px-4 w-full max-w-md mx-auto relative overflow-hidden">
      {/* Dynamic Header */}
      <AnimatePresence mode="wait">
        {currentView !== "chat" && (
          <motion.header
            key="header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 text-center relative z-10"
          >
            <h1 className="text-5xl font-extrabold text-latte-espresso tracking-tight drop-shadow-sm mb-2">
              Purr Pals
            </h1>
            <p className="text-latte-brown text-base font-semibold opacity-75 tracking-wide uppercase text-[11px]">
              Find your fur-ever friend
            </p>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Content Area */}
      <main className="w-full flex justify-center items-center flex-1 relative z-10">
        <AnimatePresence mode="wait">
          {currentView === "deck" && (
            <motion.div
              key="deck"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full flex justify-center"
            >
              <CardDeck />
            </motion.div>
          )}
          {currentView === "matches" && (
            <motion.div
              key="matches"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
              <MatchesList onSelectMatch={handleMatchSelect} />
            </motion.div>
          )}
          {currentView === "chat" && selectedMatch && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full flex justify-center"
            >
              <ChatInterface
                match={selectedMatch}
                onBack={handleBackToMatches}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation Tabs (Hidden in Chat) */}
      <AnimatePresence>
        {currentView !== "chat" && (
          <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 bg-white/70 backdrop-blur-xl rounded-full shadow-2xl border border-white/50 p-1.5 flex gap-1 z-50 max-w-[90vw]"
          >
            <button
              onClick={() => setCurrentView("deck")}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 relative overflow-hidden ${
                currentView === "deck"
                  ? "text-white shadow-md"
                  : "text-latte-brown hover:bg-white/40"
              }`}
            >
              {currentView === "deck" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-latte-espresso"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">Explore</span>
            </button>
            <button
              onClick={() => setCurrentView("matches")}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 relative overflow-hidden ${
                currentView === "matches"
                  ? "text-white shadow-md"
                  : "text-latte-brown hover:bg-white/40"
              }`}
            >
              {currentView === "matches" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-latte-espresso"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">Matches</span>
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
