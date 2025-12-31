"use client";

import React from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Cat } from "@/types/cat";
import Image from "next/image";

interface SwipeableCardProps {
  data: Cat;
  onSwipe: (direction: "left" | "right", cat: Cat) => void;
  style?: React.CSSProperties;
  priority?: boolean;
}

const SwipeableCard = React.memo(function SwipeableCard({
  data,
  onSwipe,
  style,
  priority = false,
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
      onSwipe("right", data);
    } else if (info.offset.x < -threshold) {
      onSwipe("left", data);
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
      className="absolute w-full max-w-sm aspect-3/4 glass-panel rounded-3xl overflow-hidden cursor-grab touch-none origin-bottom border border-white/60 select-none"
    >
      <div className="relative w-full h-3/4 bg-gray-200 pointer-events-none">
        <Image
          src={data.photoUrl}
          alt={data.name}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 768px) 100vw, 384px"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-60" />
      </div>

      <div className="h-1/4 p-5 flex flex-col justify-center pointer-events-none bg-white/80 backdrop-blur-md">
        <div className="flex items-baseline justify-between">
          <h2 className="text-3xl font-extrabold text-latte-espresso">
            {data.name}
            <span className="text-xl font-normal opacity-60 ml-2">
              {data.age}
            </span>
          </h2>
        </div>

        <p className="text-sm text-latte-brown line-clamp-2 mt-1 leading-relaxed font-medium">
          {data.bio}
        </p>
        <div className="flex gap-2 mt-3 overflow-hidden">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-latte-espresso/10 text-latte-espresso text-xs font-bold rounded-full uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* LIKE STAMP */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute top-8 left-8 border-4 border-emerald-400 bg-emerald-400/20 backdrop-blur-sm rounded-lg px-4 py-1 -rotate-15 pointer-events-none z-10 shadow-lg"
      >
        <span className="text-emerald-500 font-extrabold text-4xl uppercase tracking-widest drop-shadow-sm">
          Like
        </span>
      </motion.div>

      {/* NOPE STAMP */}
      <motion.div
        style={{ opacity: nopeOpacity }}
        className="absolute top-8 right-8 border-4 border-rose-400 bg-rose-400/20 backdrop-blur-sm rounded-lg px-4 py-1 rotate-15 pointer-events-none z-10 shadow-lg"
      >
        <span className="text-rose-500 font-extrabold text-4xl uppercase tracking-widest drop-shadow-sm">
          Nope
        </span>
      </motion.div>
    </motion.div>
  );
});

export default SwipeableCard;
