"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/schemas/category.schema";

interface CategoryCardProps {
  cat: Category;
  style?: {
    color: string;
    bg: string;
    borderColor: string;
  };
}

export function CategoryCard({
  cat,
  style = { color: "#1565C0", bg: "#F8FAFD", borderColor: "#E2E8F0" },
}: Readonly<CategoryCardProps>) {
  return (
    <Link
      href={`/products?category=${cat.slug}`}
      className="group relative rounded-xl overflow-hidden border-2 flex flex-col
                 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ borderColor: style.borderColor, background: style.bg }}
    >
      <div className="relative overflow-hidden h-[110px]">
        {cat.thumbnail_url ? (
          <Image
            src={cat.thumbnail_url}
            alt={cat.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: style.color + "20" }}
          >
            <span
              className="font-bold text-2xl"
              style={{ color: style.color }}
            >
              {cat.name.charAt(0)}
            </span>
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${style.color}88 0%, transparent 60%)`,
          }}
        />
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <p className="font-semibold text-gray-800 leading-tight text-[12px] line-clamp-2 min-h-[30px]">
          {cat.name}
        </p>

        <div className="flex items-center justify-end mt-2">
          <ArrowRight
            size={11}
            style={{ color: style.color }}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </div>
      </div>
    </Link>
  );
}
