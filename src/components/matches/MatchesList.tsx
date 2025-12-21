"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cat, MOCK_CATS } from "@/types/cat";

interface MatchesListProps {
  onSelectMatch: (cat: Cat) => void;
}

export default function MatchesList({ onSelectMatch }: MatchesListProps) {
  // Mocking some matches for now
  const matches = MOCK_CATS.slice(0, 3); // Assume we matched with the first 3

  return (
    <div className="flex flex-col h-[70vh] w-full max-w-sm">
      <h2 className="text-2xl font-bold text-(--color-latte-espresso) mb-4 px-2">
        New Matches
      </h2>

      {/* Horizontal Scroll for New Matches */}
      <div className="flex gap-4 overflow-x-auto pb-4 px-2 scrollbar-hide snap-x">
        {matches.map((cat, index) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectMatch(cat)}
            className="flex flex-col items-center gap-2 min-w-20 snap-start"
          >
            <div className="relative">
              <div
                className="w-20 h-20 rounded-full bg-cover bg-center border-4 border-white shadow-md"
                style={{ backgroundImage: `url(${cat.photoUrl})` }}
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <span className="text-sm font-bold text-(--color-latte-espresso)">
              {cat.name}
            </span>
          </motion.button>
        ))}
      </div>

      <h2 className="text-xl font-bold text-(--color-latte-espresso) mt-4 mb-2 px-2">
        Messages
      </h2>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto px-2 space-y-2">
        {matches.map((cat, index) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            onClick={() => onSelectMatch(cat)}
            className="w-full bg-white p-3 rounded-2xl border border-latte-cream flex items-center gap-3 shadow-sm hover:translate-x-1 transition-transform"
          >
            <div
              className="w-14 h-14 rounded-full bg-cover bg-center shrink-0"
              style={{ backgroundImage: `url(${cat.photoUrl})` }}
            />
            <div className="flex-1 text-left overflow-hidden">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-(--color-latte-espresso)">
                  {cat.name}
                </span>
                <span className="text-xs text-latte-brown text-opacity-60">
                  Now
                </span>
              </div>
              <p className="text-sm text-latte-brown truncate">
                {index === 0 ? "Purr..." : "Meow! How are you?"}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
