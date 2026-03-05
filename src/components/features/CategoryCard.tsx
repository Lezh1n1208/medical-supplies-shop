import { categories } from "@/data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CategoryCard({
  cat,
}: Readonly<{ cat: (typeof categories)[0] }>) {
  return (
    <Link
      href={`/san-pham?category=${cat.slug}`}
      className="group relative rounded-xl overflow-hidden border-2 flex flex-col
                 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ borderColor: cat.borderColor, background: cat.bg }}
    >
      <div className="relative overflow-hidden h-[110px]">
        <img
          src={cat.img}
          alt={cat.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${cat.color}88 0%, transparent 60%)`,
          }}
        />
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <p className="font-semibold text-gray-800 leading-tight text-[12px] line-clamp-2 min-h-[30px]">
          {cat.name}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span
            style={{
              fontSize: "11px",
              color: cat.color,
              fontWeight: 600,
            }}
          >
            {cat.count} sản phẩm
          </span>

          <ArrowRight
            size={11}
            style={{ color: cat.color }}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </div>
      </div>
    </Link>
  );
}
