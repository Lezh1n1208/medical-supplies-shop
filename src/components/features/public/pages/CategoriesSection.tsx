"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePublicCategories } from "@/hooks/use-public-categories";
import { CategoryCard } from "./CategoryCard";

const VISIBLE_DESKTOP = 6;

// Generate consistent colors based on category index
const COLORS = [
  {
    color: "#D97706",
    bg: "linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)",
    borderColor: "#FCD34D",
  },
  {
    color: "#1565C0",
    bg: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
    borderColor: "#90CAF9",
  },
  {
    color: "#00897B",
    bg: "linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 100%)",
    borderColor: "#80CBC4",
  },
  {
    color: "#7C3AED",
    bg: "linear-gradient(135deg, #F3E8FF 0%, #DDD6FE 100%)",
    borderColor: "#C4B5FD",
  },
  {
    color: "#DC2626",
    bg: "linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)",
    borderColor: "#FCA5A5",
  },
  {
    color: "#059669",
    bg: "linear-gradient(135deg, #ECFDF5 0%, #A7F3D0 100%)",
    borderColor: "#6EE7B7",
  },
];

function getCategoryStyle(index: number) {
  return COLORS[index % COLORS.length];
}

export function CategoriesSection() {
  const { data: categories = [], isLoading } = usePublicCategories();
  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sort by display_order
  const sortedCategories = [...categories].sort(
    (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0),
  );

  const total = sortedCategories.length;
  const canSlide = total > VISIBLE_DESKTOP;

  const next = useCallback(() => {
    setOffset((o) => (o + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setOffset((o) => (o - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!canSlide || paused) return;

    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [canSlide, paused, next]);

  const visibleDesktop = Array.from(
    { length: VISIBLE_DESKTOP },
    (_, i) => sortedCategories[(offset + i) % total],
  );

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const delta = touchStart - e.touches[0].clientX;
    setTouchDelta(delta);
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDelta) > 50) {
      if (touchDelta > 0) {
        next(); // Swipe left - next
      } else {
        prev(); // Swipe right - prev
      }
    }
    setTouchStart(null);
    setTouchDelta(0);
  };

  if (isLoading) {
    return (
      <section
        id="products"
        className="py-14"
        style={{ backgroundColor: "#F8FAFD" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-4 w-24 bg-gray-300 rounded mb-4" />
            <div className="h-8 w-48 bg-gray-300 rounded mb-8" />
            <div className="grid grid-cols-6 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i} className="h-40 bg-gray-300 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (total === 0) return null;

  // Add duplicate items for infinite scroll on mobile
  const mobileCategories = [
    ...sortedCategories,
    ...sortedCategories,
    ...sortedCategories,
  ];

  return (
    <section
      id="products"
      className="py-14"
      style={{ backgroundColor: "#F8FAFD" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-8 h-1 rounded-full"
              style={{ backgroundColor: "#00897B" }}
            />
            <span
              className="text-teal-700 font-semibold"
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Khám phá
            </span>
          </div>

          <h2
            className="text-gray-900"
            style={{
              fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
              fontWeight: 800,
            }}
          >
            Danh Mục Sản Phẩm
          </h2>
        </div>

        {/* CAROUSEL */}
        <section
          ref={containerRef}
          className="relative group/carousel"
          aria-label="Danh mục sản phẩm"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* LEFT ARROW */}
          {canSlide && (
            <button
              onClick={prev}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20
              w-9 h-9 rounded-full bg-white border border-gray-200 shadow-lg
              items-center justify-center text-gray-500
              hover:border-blue-400 hover:text-blue-600 hover:shadow-xl
              opacity-0 group-hover/carousel:opacity-100
              transition-all duration-200"
              aria-label="Trước"
            >
              <ChevronLeft size={16} />
            </button>
          )}

          {/* RIGHT ARROW */}
          {canSlide && (
            <button
              onClick={next}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20
              w-9 h-9 rounded-full bg-white border border-gray-200 shadow-lg
              items-center justify-center text-gray-500
              hover:border-blue-400 hover:text-blue-600 hover:shadow-xl
              opacity-0 group-hover/carousel:opacity-100
              transition-all duration-200"
              aria-label="Tiếp"
            >
              <ChevronRight size={16} />
            </button>
          )}

          {/* DESKTOP GRID */}
          <div
            className="hidden md:grid gap-3"
            style={{
              gridTemplateColumns: `repeat(${VISIBLE_DESKTOP}, minmax(0, 1fr))`,
            }}
          >
            {visibleDesktop.map((cat, i) => (
              <CategoryCard
                key={`${cat.id}-${offset}-${i}`}
                cat={cat}
                style={getCategoryStyle(offset + i)}
              />
            ))}
          </div>

          {/* MOBILE INFINITE SWIPE */}
          <div
            className="md:hidden overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex gap-3 transition-transform duration-300"
              style={{
                transform: `translateX(${touchDelta}px)`,
                width: "fit-content",
              }}
            >
              {mobileCategories.map((cat, i) => (
                <div
                  key={`${cat.id}-${i}`}
                  className="w-[calc(33.333%-8px)] flex-shrink-0"
                >
                  <CategoryCard cat={cat} style={getCategoryStyle(i % total)} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
