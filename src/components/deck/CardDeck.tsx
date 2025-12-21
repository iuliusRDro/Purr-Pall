"use client";

import React, { useState, useEffect } from "react";
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

  const handleSwipe = async (direction: "left" | "right") => {
    console.log(`Swiped ${direction} on ${activeCat.name}`);
    setCurrentIndex((prev) => prev + 1);
  };

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
        />
      </AnimatePresence>
    </div>
  );
}
