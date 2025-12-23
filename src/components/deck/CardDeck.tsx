"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cat, MOCK_CATS, DatabaseCat } from "@/types/cat";
import SwipeableCard from "./SwipeableCard";
import SkeletonCard from "./SkeletonCard";
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
      <div className="flex flex-col items-center justify-center h-[60vh] w-full max-w-sm">
        <SkeletonCard />
        <p className="mt-6 text-latte-brown font-bold animate-pulse">
          Summoning cats...
        </p>
      </div>
    );
  }

  if (!activeCat) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6 w-full max-w-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mb-6 p-4 bg-latte-white rounded-full shadow-inner"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-latte-brown opacity-60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2v-2" />
            <path d="M8 20h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" />
          </svg>
        </motion.div>
        <h2 className="text-2xl font-bold text-latte-espresso mb-2">
          No more cats!
        </h2>
        <p className="text-latte-brown text-lg">
          You&apos;ve viewed all the furry friends nearby.
        </p>
        <motion.button
          onClick={() => setCurrentIndex(0)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-6 py-3 bg-latte-espresso text-latte-white rounded-full font-bold shadow-lg cursor-pointer hover:bg-opacity-90 transition-colors"
        >
          Start Over
        </motion.button>
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
        <motion.button
          onClick={() => handleSwipe("left")}
          aria-label="Pass"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="w-16 h-16 bg-latte-white rounded-full shadow-lg flex items-center justify-center text-rose-500 hover:bg-rose-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-latte-brown cursor-pointer"
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
        </motion.button>

        <motion.button
          onClick={() => handleSwipe("right")}
          aria-label="Like"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="w-16 h-16 bg-latte-white rounded-full shadow-lg flex items-center justify-center text-emerald-500 hover:bg-emerald-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-latte-brown cursor-pointer"
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
        </motion.button>
      </div>
    </div>
  );
}
