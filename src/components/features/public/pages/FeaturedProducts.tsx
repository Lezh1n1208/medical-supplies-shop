"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { usePublicProducts } from "@/hooks/use-public-products";

const TABS = ["Tất cả", "Mới nhất", "Bán chạy", "Khuyến mãi"] as const;
type Tab = (typeof TABS)[number];

// Map tab → filters
const TAB_FILTERS: Record<Tab, Parameters<typeof usePublicProducts>[0]> = {
  "Tất cả": {},
  "Mới nhất": {}, // mặc định đã sort created_at desc
  "Bán chạy": { isBestSeller: true },
  "Khuyến mãi": { onSale: true },
};

// Skeleton card
function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col animate-pulse">
      <div className="h-[180px] bg-gray-100" />
      <div className="p-3 flex flex-col gap-2">
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-2/3" />
        <div className="h-4 bg-gray-100 rounded w-1/2 mt-1" />
        <div className="h-8 bg-gray-100 rounded mt-1" />
      </div>
    </div>
  );
}

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<Tab>("Tất cả");

  const { data, isLoading, isError } = usePublicProducts({
    ...TAB_FILTERS[activeTab],
    limit: 8,
  });

  const renderProducts = () => {
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <ProductCardSkeleton key={i} />
      ));
    }

    if (isError) {
      return (
        <div className="col-span-full text-center py-12 text-gray-400 text-[14px]">
          Không thể tải sản phẩm. Vui lòng thử lại sau.
        </div>
      );
    }

    if (!data?.items?.length) {
      return (
        <div className="col-span-full text-center py-12 text-gray-400 text-[14px]">
          Không có sản phẩm nào.
        </div>
      );
    }

    return data.items.map((product) => (
      <ProductCard key={product.id} product={product} showRating />
    ));
  };

  return (
    <section className="py-14" style={{ backgroundColor: "#F8FAFD" }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-1 rounded-full"
                style={{ backgroundColor: "#DC2626" }}
              />
              <span
                className="font-semibold"
                style={{
                  fontSize: "12px",
                  color: "#DC2626",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Nổi bật
              </span>
            </div>

            <h2
              className="text-gray-900"
              style={{
                fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                fontWeight: 800,
              }}
            >
              Sản Phẩm Nổi Bật
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-3 py-1.5 rounded-full border font-medium transition-all"
                style={{
                  backgroundColor: activeTab === tab ? "#1565C0" : "#fff",
                  color: activeTab === tab ? "#fff" : "#374151",
                  borderColor: activeTab === tab ? "#1565C0" : "#E5E7EB",
                  fontSize: "12px",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {renderProducts()}
        </div>

        {/* View all */}
        <div className="text-center mt-8">
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border-2 font-semibold transition-all hover:bg-blue-50 hover:border-blue-400"
            style={{
              borderColor: "#1565C0",
              color: "#1565C0",
              fontSize: "14px",
            }}
          >
            Xem tất cả sản phẩm
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
