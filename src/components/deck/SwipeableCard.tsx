"use client";

import React from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Cat } from "@/types/cat";

interface SwipeableCardProps {
  data: Cat;
  onSwipe: (direction: "left" | "right") => void;
  style?: React.CSSProperties;
}

export default function SwipeableCard({
  data,
  onSwipe,
  style,
}: SwipeableCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);

  const likeOpacity = useTransform(x, [20, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -150], [0, 1]);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onSwipe("right");
    } else if (info.offset.x < -threshold) {
      onSwipe("left");
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity, ...style }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 1.05, cursor: "grabbing" }}
      className="absolute w-full max-w-sm aspect-[3/4] bg-white rounded-3xl shadow-xl overflow-hidden cursor-grab touch-none origin-bottom border border-[var(--color-latte-cream)] select-none"
    >
      <div
        className="w-full h-3/4 bg-gray-200 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${data.photoUrl})` }}
      />

      <div className="h-1/4 p-5 flex flex-col justify-center pointer-events-none bg-linear-to-b from-white to-[var(--color-latte-white)]">
        <h2 className="text-2xl font-bold text-[var(--color-latte-espresso)]">
          {data.name}, {data.age}
        </h2>
        <p className="text-sm text-[var(--color-latte-brown)] line-clamp-2 mt-1 leading-relaxed">
          {data.bio}
        </p>
        <div className="flex gap-2 mt-3 overflow-hidden">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-[var(--color-latte-cream)] text-[var(--color-latte-espresso)] text-xs font-bold rounded-full uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-8 left-8 border-4 border-green-500 rounded-lg px-4 py-1 -rotate-15 pointer-events-none z-10"
      >
        <span className="text-green-500 font-extrabold text-3xl uppercase tracking-widest">
          Like
        </span>
      </motion.div>

      <motion.div
        style={{ opacity: nopeOpacity }}
        className="absolute top-8 right-8 border-4 border-red-500 rounded-lg px-4 py-1 rotate-15 pointer-events-none z-10"
      >
        <span className="text-red-500 font-extrabold text-3xl uppercase tracking-widest">
          Nope
        </span>
      </motion.div>
    </motion.div>
  );
}
