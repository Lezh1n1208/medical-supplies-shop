"use client";

import { Suspense, useEffect, useState } from "react";
import { X } from "lucide-react";
import { usePublicProducts } from "@/hooks/use-public-products";
import { usePublicCategories } from "@/hooks/use-public-categories";
import {
  ProductToolbar,
  SORT_OPTIONS,
  SortValue,
} from "@/components/features/public/pages/ProductToolbar";
import { ProductSidebar } from "@/components/features/public/pages/ProductSidebar";
import { ProductGrid } from "@/components/features/public/pages/ProductGrid";
import { ProductPagination } from "@/components/features/public/pages/ProductPagination";
import { useRouter, useSearchParams } from "next/navigation";

const PAGE_SIZE = 16;

function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") ?? "";
  const urlCategory = searchParams.get("category") ?? "all";

  const [activeCategory, setActiveCategory] = useState(urlCategory);
  const [searchQ, setSearchQ] = useState(urlSearch);
  const [sortValue, setSortValue] = useState<SortValue>("newest");
  const [page, setPage] = useState(1);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  useEffect(() => {
    setSearchQ(urlSearch);
    setActiveCategory(urlCategory);
    setPage(1);
  }, [urlSearch, urlCategory]);

  const activeSort = SORT_OPTIONS.find((o) => o.value === sortValue)!;

  const { data: categoriesData } = usePublicCategories();

  const { data, isLoading, isError } = usePublicProducts({
    categorySlug: activeCategory === "all" ? undefined : activeCategory,
    search: searchQ.trim() || undefined,
    sortBy: activeSort.sortBy,
    sortOrder: activeSort.sortOrder,
    page,
    limit: PAGE_SIZE,
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 0;

  function handleCategory(slug: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (slug === "all") params.delete("category");
    else params.set("category", slug);

    const query = params.toString();
    const url = query ? "/san-pham?" + query : "san-pham";

    router.push(url);
    setMobileSidebar(false);
  }

  function handleSearch(q: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (q.trim()) params.set("search", q.trim());
    else params.delete("search");

    params.delete("page");

    const query = params.toString();
    const url = query ? "/san-pham?" + query : "/san-pham";

    router.push(url);
  }

  function handleSort(value: SortValue) {
    setSortValue(value);
    setPage(1);
  }

  function handleClearFilters() {
    setSearchQ("");
    setSortValue("newest");
    setPage(1);
    router.push("/san-pham");
  }

  const sidebar = (
    <ProductSidebar
      categories={categoriesData ?? []}
      activeCategory={activeCategory}
      onSelect={handleCategory}
      total={total}
    />
  );

  return (
    <div style={{ backgroundColor: "#F8FAFD", minHeight: "100vh" }}>
      {/* Page header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1
            className="text-gray-900 mb-1"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800 }}
          >
            Tất Cả Sản Phẩm
          </h1>
          <p className="text-gray-500" style={{ fontSize: "14px" }}>
            {total} sản phẩm vật tư y tế chính hãng
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:grid lg:grid-cols-[220px_1fr] lg:grid-rows-[auto_1fr] gap-x-6">
          <div className="lg:col-span-2 lg:row-start-1">
            <ProductToolbar
              searchQ={searchQ}
              onSearch={handleSearch}
              sortValue={sortValue}
              onSort={handleSort}
              onMobileFilter={() => setMobileSidebar(true)}
            />
          </div>

          <aside className="hidden lg:block lg:row-start-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sticky top-[var(--top-header-height)]">
              {sidebar}
            </div>
          </aside>

          <div className="lg:col-start-2 lg:row-start-2 min-w-0">
            <ProductGrid
              items={items}
              isLoading={isLoading}
              isError={isError}
              onClearFilters={handleClearFilters}
            />

            <ProductPagination
              current={page}
              total={totalPages}
              onChange={(p) => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </div>
      </div>

      {mobileSidebar && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileSidebar(false)}
            aria-label="Close filters"
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white p-5 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <span
                className="font-bold text-gray-800"
                style={{ fontSize: "15px" }}
              >
                Bộ lọc
              </span>
              <button
                onClick={() => setMobileSidebar(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-all"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>
            {sidebar}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsPageContent />
    </Suspense>
  );
}
