"use client";

import { usePublicCategories } from "@/hooks/use-public-categories";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CategoryLinks() {
  const { data: categories, isLoading } = usePublicCategories();

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className="h-4 bg-blue-800/50 rounded animate-pulse w-28"
          />
        ))}
      </div>
    );
  }

  if (!categories?.length) return null;

  return (
    <ul className="space-y-2">
      {categories.map((cat) => (
        <li key={cat.id}>
          <Link
            href={`/san-pham?categorySlug=${cat.slug}`}
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors group text-sm"
          >
            <ArrowRight
              size={12}
              className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
            />
            {cat.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
