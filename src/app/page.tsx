"use client";

import React, { useState } from "react";
import CardDeck from "@/components/deck/CardDeck";
import MatchesList from "@/components/matches/MatchesList";
import ChatInterface from "@/components/chat/ChatInterface";
import { Cat } from "@/types/cat";

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
    <div className="flex flex-col items-center justify-center min-h-screen pt-10 pb-24 px-4 w-full max-w-md mx-auto relative">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-latte-espresso mb-1">
          Purr Pals
        </h1>
        <p className="text-latte-brown text-sm font-medium opacity-80">
          Find your fur-ever friend
        </p>
      </header>

      {/* Content Area */}
      <main className="w-full flex justify-center items-center flex-1">
        {currentView === "deck" && <CardDeck />}
        {currentView === "matches" && (
          <MatchesList onSelectMatch={handleMatchSelect} />
        )}
        {currentView === "chat" && selectedMatch && (
          <ChatInterface match={selectedMatch} onBack={handleBackToMatches} />
        )}
      </main>

      {/* Navigation Tabs (Hidden in Chat) */}
      {currentView !== "chat" && (
        <nav className="fixed bottom-6 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-latte-cream p-1 flex gap-1 z-50">
          <button
            onClick={() => setCurrentView("deck")}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              currentView === "deck"
                ? "bg-(--color-latte-espresso) text-white shadow-md"
                : "text-latte-brown hover:bg-latte-cream"
            }`}
          >
            Explore
          </button>
          <button
            onClick={() => setCurrentView("matches")}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              currentView === "matches"
                ? "bg-(--color-latte-espresso) text-white shadow-md"
                : "text-latte-brown hover:bg-latte-cream"
            }`}
          >
            Matches
          </button>
        </nav>
      )}
    </div>
  );
}
