import type { Category } from "@/schemas/category.schema";

interface ProductSidebarProps {
  categories: Category[];
  activeCategory: string;
  onSelect: (slug: string) => void;
  total: number;
}

export function ProductSidebar({
  categories,
  activeCategory,
  onSelect,
  total,
}: Readonly<ProductSidebarProps>) {
  return (
    <div className="space-y-1">
      <p
        className="font-bold text-gray-700 uppercase tracking-wider mb-3 pb-2 border-b border-gray-100"
        style={{ fontSize: "11px" }}
      >
        Danh mục sản phẩm
      </p>

      <button
        onClick={() => onSelect("all")}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all"
        style={{
          backgroundColor: activeCategory === "all" ? "#EFF6FF" : "transparent",
          color: activeCategory === "all" ? "#1565C0" : "#374151",
          fontWeight: activeCategory === "all" ? 700 : 500,
          fontSize: "13px",
        }}
      >
        Tất cả
        {activeCategory === "all" && (
          <span
            className="px-2 py-0.5 rounded-full font-semibold"
            style={{
              backgroundColor: "#1565C0",
              color: "#fff",
              fontSize: "11px",
            }}
          >
            {total}
          </span>
        )}
      </button>

      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onSelect(cat.slug)}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all"
          style={{
            backgroundColor:
              activeCategory === cat.slug ? "#EFF6FF" : "transparent",
            color: activeCategory === cat.slug ? "#1565C0" : "#374151",
            fontWeight: activeCategory === cat.slug ? 700 : 500,
            fontSize: "13px",
          }}
        >
          {cat.name}
          {activeCategory === cat.slug && (
            <span
              className="px-2 py-0.5 rounded-full font-semibold"
              style={{
                backgroundColor: "#1565C0",
                color: "#fff",
                fontSize: "11px",
              }}
            >
              {total}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
