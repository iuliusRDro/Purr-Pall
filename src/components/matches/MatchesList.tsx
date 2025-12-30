"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cat, MOCK_CATS, Match, DatabaseMatch } from "@/types/cat";
import Image from "next/image";
import { supabase } from "@/utils/supabase";

interface MatchesListProps {
  onSelectMatch: (cat: Cat) => void;
}

export default function MatchesList({ onSelectMatch }: MatchesListProps) {
  const [matches, setMatches] = useState<Match[]>([]);
  // We don't necessarily need a loading spinner if we just show empty or skeleton,
  // but let's keep it simple for now or use the fallback.
  // Actually the original design didn't have loading state visible, so we can just update state when ready.

  useEffect(() => {
    async function fetchMatches() {
      // Mock fallback generator
      const getMockMatches = () => {
        return MOCK_CATS.slice(0, 3).map((cat, index) => ({
          id: `mock-match-${cat.id}`,
          catId: cat.id,
          userId: "current-user",
          matchedAt: new Date(),
          cat: cat,
          lastMessage: index === 0 ? "Purr..." : "Meow! How are you?",
        }));
      };

      if (!supabase) {
        console.warn("Supabase not initialized. Using mock matches.");
        setMatches(getMockMatches());
        return;
      }

      try {
        const { data, error } = await supabase
          .from("matches")
          .select("*, cat:cats(*)")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching matches:", error);
          setMatches(getMockMatches());
          return;
        }

        if (data) {
          const mappedMatches: Match[] = (data as unknown as DatabaseMatch[]).map((m) => ({
            id: m.id,
            catId: m.cat_id,
            userId: m.user_id,
            matchedAt: new Date(m.created_at),
            lastMessage: m.last_message,
            cat: {
              id: m.cat.id,
              name: m.cat.name,
              age: m.cat.age,
              bio: m.cat.bio,
              photoUrl: m.cat.photo_url,
              tags: m.cat.tags || [],
              distance: m.cat.distance || 0,
            },
          }));
          setMatches(mappedMatches);
        }
      } catch (err) {
        console.error("Unexpected error fetching matches:", err);
        setMatches(getMockMatches());
      }
    }

    fetchMatches();
  }, []);

  return (
    <div className="flex flex-col h-[70vh] w-full max-w-sm">
      <h2 className="text-2xl font-bold text-latte-espresso mb-4 px-2">
        New Matches
      </h2>

      {/* Horizontal Scroll for New Matches */}
      <div className="flex gap-4 overflow-x-auto pb-4 px-2 scrollbar-hide snap-x">
        {matches.map((match, index) => (
          <motion.button
            key={match.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectMatch(match.cat)}
            className="flex flex-col items-center gap-2 min-w-20 snap-start"
          >
            <div className="relative">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image
                  src={match.cat.photoUrl}
                  alt={match.cat.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full z-10"></div>
            </div>
            <span className="text-sm font-bold text-latte-espresso">
              {match.cat.name}
            </span>
          </motion.button>
        ))}
      </div>

      <h2 className="text-xl font-bold text-latte-espresso mt-4 mb-2 px-2">
        Messages
      </h2>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto px-2 space-y-2">
        {matches.map((match, index) => (
          <motion.button
            key={match.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            onClick={() => onSelectMatch(match.cat)}
            className="w-full bg-white p-3 rounded-2xl border border-latte-cream flex items-center gap-3 shadow-sm hover:translate-x-1 transition-transform"
          >
            <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
              <Image
                src={match.cat.photoUrl}
                alt={match.cat.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="flex-1 text-left overflow-hidden">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-latte-espresso">
                  {match.cat.name}
                </span>
                <span className="text-xs text-latte-brown text-opacity-60">
                  Now
                </span>
              </div>
              <p className="text-sm text-latte-brown truncate">
                {match.lastMessage || "Purr..."}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
