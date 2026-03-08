"use client";

import { useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import type { ProductFilters } from "@/services/product.public.service";

export const SORT_OPTIONS = [
  {
    value: "newest",
    label: "Mới nhất",
    sortBy: "created_at",
    sortOrder: "desc",
  },
  {
    value: "price-asc",
    label: "Giá: Thấp → Cao",
    sortBy: "price",
    sortOrder: "asc",
  },
  {
    value: "price-desc",
    label: "Giá: Cao → Thấp",
    sortBy: "price",
    sortOrder: "desc",
  },
  {
    value: "rating",
    label: "Đánh giá cao nhất",
    sortBy: "rating",
    sortOrder: "desc",
  },
] as const satisfies Array<{
  value: string;
  label: string;
  sortBy: ProductFilters["sortBy"];
  sortOrder: ProductFilters["sortOrder"];
}>;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

interface ProductToolbarProps {
  searchQ: string;
  onSearch: (q: string) => void;
  sortValue: SortValue;
  onSort: (value: SortValue) => void;
  onMobileFilter: () => void;
}

export function ProductToolbar({
  searchQ,
  onSearch,
  sortValue,
  onSort,
  onMobileFilter,
}: Readonly<ProductToolbarProps>) {
  const [sortOpen, setSortOpen] = useState(false);
  const activeLabel =
    SORT_OPTIONS.find((o) => o.value === sortValue)?.label ?? "Mới nhất";

  return (
    <div className="flex items-center gap-3 mb-5 flex-wrap">
      {/* Mobile filter button */}
      <button
        className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white font-medium text-gray-700 flex-shrink-0"
        style={{ fontSize: "13px" }}
        onClick={onMobileFilter}
      >
        <SlidersHorizontal size={14} />
        Lọc
      </button>

      {/* Sort dropdown */}
      <div className="relative flex-shrink-0 ml-auto">
        <button
          onClick={() => setSortOpen((v) => !v)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white font-medium text-gray-700 hover:border-blue-300 transition-all"
          style={{ fontSize: "13px" }}
        >
          <SlidersHorizontal size={13} className="text-gray-400" />
          {activeLabel}
          <ChevronDown
            size={13}
            className="text-gray-400 transition-transform"
            style={{ transform: sortOpen ? "rotate(180deg)" : "none" }}
          />
        </button>

        {sortOpen && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-20"
              onClick={() => setSortOpen(false)}
              aria-label="Close sort menu"
            />
            <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl border border-gray-200 shadow-xl z-30 overflow-hidden py-1">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onSort(opt.value);
                    setSortOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 transition-colors hover:bg-blue-50"
                  style={{
                    fontSize: "13px",
                    color: sortValue === opt.value ? "#1565C0" : "#374151",
                    fontWeight: sortValue === opt.value ? 700 : 400,
                    backgroundColor:
                      sortValue === opt.value ? "#EFF6FF" : "transparent",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
