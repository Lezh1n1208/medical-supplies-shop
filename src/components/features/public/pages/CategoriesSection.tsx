"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePublicCategories } from "@/hooks/use-public-categories";
import { CategoryCard } from "./CategoryCard";

const VISIBLE_DESKTOP = 6;

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

  const containerRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const sortedCategories = [...categories].sort(
    (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0),
  );

  const total = sortedCategories.length;
  const canSlide = total > 0;

  /*
  -----------------------
  DESKTOP LOGIC (GIỮ NGUYÊN)
  -----------------------
  */

  const next = useCallback(() => {
    setOffset((o) => (o + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setOffset((o) => (o - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!canSlide || paused) return;

    // disable auto slide on mobile
    if (globalThis.window !== undefined && window.innerWidth < 768) return;

    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [canSlide, paused, next]);

  const visibleDesktop = Array.from(
    { length: VISIBLE_DESKTOP },
    (_, i) => sortedCategories[(offset + i) % total],
  );

  /*
  -----------------------
  MOBILE INFINITE
  -----------------------
  */

  const mobileCategories = [
    ...sortedCategories,
    ...sortedCategories,
    ...sortedCategories,
  ];

  useEffect(() => {
    const el = mobileScrollRef.current;

    if (!el || total === 0) return;

    const singleWidth = el.scrollWidth / 3;

    el.scrollLeft = singleWidth;
  }, [total]);

  const handleScroll = () => {
    const el = mobileScrollRef.current;
    if (!el) return;

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      const singleWidth = el.scrollWidth / 3;

      if (el.scrollLeft < singleWidth * 0.5) {
        el.scrollLeft += singleWidth;
      }

      if (el.scrollLeft > singleWidth * 1.5) {
        el.scrollLeft -= singleWidth;
      }
    }, 120);
  };

  /*
  -----------------------
  LOADING
  -----------------------
  */

  if (isLoading) {
    return (
      <section className="py-14" style={{ backgroundColor: "#F8FAFD" }}>
        <div className="max-w-7xl mx-auto px-4">Loading...</div>
      </section>
    );
  }

  if (total === 0) return null;

  return (
    <section
      id="products"
      className="py-14"
      style={{ backgroundColor: "#F8FAFD" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}

        <div className="mb-8">
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

        <div ref={containerRef} className="relative group/carousel">
          <section
            aria-label="Danh mục sản phẩm"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* LEFT */}

            {canSlide && (
              <button
                onClick={prev}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20
              w-9 h-9 rounded-full bg-white border border-gray-200 shadow-lg
              items-center justify-center"
              >
                <ChevronLeft size={16} />
              </button>
            )}

            {/* RIGHT */}

            {canSlide && (
              <button
                onClick={next}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20
              w-9 h-9 rounded-full bg-white border border-gray-200 shadow-lg
              items-center justify-center"
              >
                <ChevronRight size={16} />
              </button>
            )}

            {/* DESKTOP */}

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

            {/* MOBILE */}

            <div
              ref={mobileScrollRef}
              onScroll={handleScroll}
              className="md:hidden overflow-x-auto snap-x no-scrollbar"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="flex gap-3 px-4" style={{ width: "max-content" }}>
                {mobileCategories.map((cat, i) => (
                  <div
                    key={`mobile-${cat.id}-${i}`}
                    className="w-[calc((100vw-32px)/3)] flex-shrink-0 snap-center"
                  >
                    <CategoryCard
                      cat={cat}
                      style={getCategoryStyle(i % total)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
