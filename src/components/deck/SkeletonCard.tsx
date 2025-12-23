import React from "react";

export default function SkeletonCard() {
  return (
    <div className="relative w-full max-w-sm aspect-3/4 bg-latte-white rounded-3xl shadow-xl overflow-hidden border border-latte-cream animate-pulse">
      {/* Image Placeholder */}
      <div className="relative w-full h-3/4 bg-latte-cream opacity-50"></div>

      {/* Content Placeholder */}
      <div className="h-1/4 p-5 flex flex-col justify-center bg-linear-to-b from-white to-latte-white space-y-3">
        {/* Title Line */}
        <div className="h-8 bg-latte-cream rounded-full w-3/4 opacity-70"></div>

        {/* Bio Lines */}
        <div className="space-y-2">
          <div className="h-4 bg-latte-cream rounded-full w-full opacity-60"></div>
          <div className="h-4 bg-latte-cream rounded-full w-2/3 opacity-60"></div>
        </div>

        {/* Tags Placeholder */}
        <div className="flex gap-2 mt-1">
          <div className="h-6 w-16 bg-latte-cream rounded-full opacity-50"></div>
          <div className="h-6 w-20 bg-latte-cream rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  );
}
