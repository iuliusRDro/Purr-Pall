"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Cat, MOCK_CATS, DatabaseCat } from "@/types/cat";
import SwipeableCard from "./SwipeableCard";
import { supabase } from "@/utils/supabase";

export default function CardDeck() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCats() {
      // If Supabase is not configured, fall back to mock data immediately
      if (!supabase) {
        console.warn(
          "Supabase client not initialized (missing vars). Using mock data."
        );
        setCats(MOCK_CATS);
        setLoading(false);
        return;
      }

      try {
        // Keeping select("*") to avoid breaking legacy schema which might use 'photo_url' or 'photourl' inconsistently.
        // Optimization: Refactored Card re-renders via memoization instead.
        const { data, error } = await supabase
          .from("cats")
          .select("*")
          .limit(10);

        if (error || !data || data.length === 0) {
          console.warn(
            "Supabase fetch failed or empty, falling back to mock data:",
            error
          );
          setCats(MOCK_CATS);
        } else {
          // Map DB snake_case to CamelCase
          const mappedCats: Cat[] = (data as DatabaseCat[]).map((d) => ({
            id: d.id,
            name: d.name,
            age: d.age,
            bio: d.bio,
            photoUrl: d.photo_url || d.photourl || "",
            tags: d.tags || [],
            distance: d.distance || 0,
          }));
          setCats(mappedCats);
        }
      } catch (e) {
        console.error("Error fetching cats:", e);
        setCats(MOCK_CATS);
      } finally {
        setLoading(false);
      }
    }

    fetchCats();
  }, []);

  const activeCat = cats[currentIndex];
  const nextCat = cats[currentIndex + 1];

  const handleSwipe = useCallback(
    async (direction: "left" | "right", cat?: Cat) => {
      // Removed activeCat dependency to prevent SwipeableCard re-renders
      console.log(`Swiped ${direction} on ${cat?.name || "Unknown"}`);
      setCurrentIndex((prev) => prev + 1);
    },
    []
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handleSwipe("left");
      } else if (e.key === "ArrowRight") {
        handleSwipe("right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSwipe]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="animate-bounce text-4xl mb-4">🐱</div>
        <p className="text-latte-brown animate-pulse">Summoning cats...</p>
      </div>
    );
  }

  if (!activeCat) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6">
        <h2 className="text-2xl font-bold text-latte-espresso mb-2">
          No more cats!
        </h2>
        <p className="text-latte-brown text-lg">
          You&apos;ve viewed all the furry friends nearby.
        </p>
        <button
          onClick={() => setCurrentIndex(0)}
          className="mt-6 px-6 py-3 bg-latte-espresso text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform active:scale-95"
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-sm aspect-3/4 flex items-center justify-center">
      <AnimatePresence>
        {/* Render Next Card (Background) */}
        {nextCat && (
          <div className="absolute top-0 left-0 w-full h-full scale-[0.95] translate-y-4 opacity-100 -z-10">
            <SwipeableCard key={nextCat.id} data={nextCat} onSwipe={() => {}} />
            <div className="absolute inset-0 bg-white/50 rounded-3xl z-10 pointer-events-none" />
          </div>
        )}

        {/* Render Active Card (Foreground) */}
        <SwipeableCard
          key={activeCat.id}
          data={activeCat}
          onSwipe={handleSwipe}
          priority={true}
        />
      </AnimatePresence>

      {/* Interaction Buttons */}
      <div className="absolute -bottom-24 flex gap-8 z-50">
        <button
          onClick={() => handleSwipe("left")}
          aria-label="Pass"
          className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 hover:scale-110 hover:bg-red-50 active:scale-95 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-red-200 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <button
          onClick={() => handleSwipe("right")}
          aria-label="Like"
          className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-green-500 hover:scale-110 hover:bg-green-50 active:scale-95 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-green-200 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
