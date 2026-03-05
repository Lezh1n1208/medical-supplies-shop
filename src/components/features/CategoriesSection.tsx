"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "@/data";
import { CategoryCard } from "./CategoryCard";

const VISIBLE_DESKTOP = 6;

export function CategoriesSection() {
  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = categories.length;
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
    (_, i) => categories[(offset + i) % total],
  );

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
              <CategoryCard key={`${cat.id}-${offset}-${i}`} cat={cat} />
            ))}
          </div>

          {/* MOBILE SWIPE */}
          <div className="md:hidden overflow-x-scroll no-scrollbar">
            <div className="flex gap-3">
              {categories.map((cat) => (
                <div key={cat.id} className="w-1/3 flex-shrink-0">
                  <CategoryCard cat={cat} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
