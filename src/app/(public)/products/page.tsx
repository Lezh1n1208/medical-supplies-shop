"use client";

import { useState, useMemo } from "react";
import { products, type Product } from "@/data";
import {
  Phone,
  ShoppingCart,
  Heart,
  ChevronDown,
  SlidersHorizontal,
  X,
  PackageX,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

// ── Categories ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { slug: "all", label: "Tất cả", count: 0 },
  { slug: "tieu-hao", label: "Vật tư tiêu hao", count: 0 },
  { slug: "chinh-hinh", label: "Vật tư chỉnh hình", count: 0 },
  { slug: "giay-in", label: "Giấy in y tế", count: 0 },
];

// ── Sort options ─────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { value: "default", label: "Mặc định" },
  { value: "price-asc", label: "Giá: Thấp → Cao" },
  { value: "price-desc", label: "Giá: Cao → Thấp" },
  { value: "name-asc", label: "Tên: A → Z" },
  { value: "newest", label: "Mới nhất" },
];

const PAGE_SIZE = 16;

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}

// ── Sub-components ───────────────────────────────────────────────────────────

function ProductCard({ product }: { readonly product: Product }) {
  const [wished, setWished] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "170px" }}>
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badge */}
        {product.isNew && (
          <span
            className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-white font-bold"
            style={{ backgroundColor: "#1565C0", fontSize: "10px" }}
          >
            Mới
          </span>
        )}
        {product.price === null && (
          <span
            className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-white font-bold"
            style={{ backgroundColor: "#7B1FA2", fontSize: "10px" }}
          >
            Liên hệ
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setWished((w) => !w)}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
          aria-label="Yêu thích"
        >
          <Heart
            size={13}
            style={{
              color: wished ? "#DC2626" : "#9CA3AF",
              fill: wished ? "#DC2626" : "none",
            }}
          />
        </button>

        {/* Brand tag */}
        <div
          className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-white font-medium"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", fontSize: "9px" }}
        >
          {product.brand}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <p
          className="text-gray-800 leading-snug mb-1 line-clamp-2 flex-1"
          style={{ fontSize: "12.5px", fontWeight: 600 }}
        >
          {product.name}
        </p>
        <p className="text-gray-400 mb-2" style={{ fontSize: "11px" }}>
          {product.origin}
        </p>

        {/* Price */}
        <div className="mb-3">
          {product.price !== null ? (
            <span
              className="font-bold"
              style={{ fontSize: "14px", color: "#DC2626" }}
            >
              {formatPrice(product.price)}
              <span
                className="text-gray-400 font-normal ml-1"
                style={{ fontSize: "11px" }}
              >
                / {product.unit}
              </span>
            </span>
          ) : (
            <span
              className="font-bold"
              style={{ fontSize: "12px", color: "#7B1FA2" }}
            >
              Liên hệ báo giá
            </span>
          )}
        </div>

        {/* CTA */}
        {product.price !== null ? (
          <button
            className="w-full py-2 rounded-lg text-white font-semibold flex items-center justify-center gap-1.5 transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "#00897B", fontSize: "12px" }}
          >
            <ShoppingCart size={12} />
            Thêm vào giỏ
          </button>
        ) : (
          <a
            href="tel:0983498177"
            className="w-full py-2 rounded-lg text-white font-semibold flex items-center justify-center gap-1.5 transition-all hover:opacity-90"
            style={{ backgroundColor: "#1565C0", fontSize: "12px" }}
          >
            <Phone size={12} />
            Liên hệ báo giá
          </a>
        )}
      </div>
    </div>
  );
}

function Pagination({
  current,
  total,
  onChange,
}: {
  readonly current: number;
  readonly total: number;
  readonly onChange: (p: number) => void;
}) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      {/* Prev */}
      <button
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        className="px-3 py-2 rounded-lg border text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
        style={{ fontSize: "13px", borderColor: "#E5E7EB", color: "#374151" }}
      >
        ← Trước
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className="w-9 h-9 rounded-lg border font-semibold transition-all"
          style={{
            fontSize: "13px",
            backgroundColor: p === current ? "#1565C0" : "#fff",
            color: p === current ? "#fff" : "#374151",
            borderColor: p === current ? "#1565C0" : "#E5E7EB",
          }}
        >
          {p}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        className="px-3 py-2 rounded-lg border text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
        style={{ fontSize: "13px", borderColor: "#E5E7EB", color: "#374151" }}
      >
        Tiếp →
      </button>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [searchQ, setSearchQ] = useState("");
  const [page, setPage] = useState(1);
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  // ── Counts per category ────────────────────────────────────────────────
  const categoriesWithCounts = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        ...c,
        count:
          c.slug === "all"
            ? products.length
            : products.filter((p) => p.category === c.slug).length,
      })),
    [],
  );

  // ── Filter + sort ──────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = products;

    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (searchQ.trim()) {
      const q = searchQ.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q),
      );
    }

    switch (sortBy) {
      case "price-asc":
        list = [...list].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "price-desc":
        list = [...list].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case "name-asc":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name, "vi"));
        break;
      case "newest":
        list = [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return list;
  }, [activeCategory, sortBy, searchQ]);

  // ── Pagination ──────────────────────────────────────────────────────────
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeLabel =
    SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Mặc định";

  function handleCategory(slug: string) {
    setActiveCategory(slug);
    setPage(1);
    setMobileSidebar(false);
  }

  function handleSort(value: string) {
    setSortBy(value);
    setPage(1);
    setSortOpen(false);
  }

  // ── Sidebar content (shared between desktop + mobile) ──────────────────
  const SidebarContent = (
    <div className="space-y-1">
      <p
        className="font-bold text-gray-700 uppercase tracking-wider mb-3 pb-2 border-b border-gray-100"
        style={{ fontSize: "11px" }}
      >
        Danh mục sản phẩm
      </p>
      {categoriesWithCounts.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => handleCategory(cat.slug)}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all"
          style={{
            backgroundColor:
              activeCategory === cat.slug ? "#EFF6FF" : "transparent",
            color: activeCategory === cat.slug ? "#1565C0" : "#374151",
            fontWeight: activeCategory === cat.slug ? 700 : 500,
            fontSize: "13px",
          }}
        >
          {cat.label}

          <span
            className="px-2 py-0.5 rounded-full text-xs font-semibold"
            style={{
              backgroundColor:
                activeCategory === cat.slug ? "#1565C0" : "#F3F4F6",
              color: activeCategory === cat.slug ? "#fff" : "#6B7280",
              fontSize: "11px",
            }}
          >
            {cat.count}
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <div style={{ backgroundColor: "#F8FAFD", minHeight: "100vh" }}>
      {/* ── Page header ────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1
            className="text-gray-900 mb-1"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800 }}
          >
            Tất Cả Sản Phẩm
          </h1>
          <p className="text-gray-500" style={{ fontSize: "14px" }}>
            {products.length} sản phẩm vật tư y tế chính hãng
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Mobile: flex (toolbar + products), Desktop: grid 2 hàng */}
        <div className="flex flex-col lg:grid lg:grid-cols-[220px_1fr] lg:grid-rows-[auto_1fr] gap-6">
          {/* ── Toolbar (hàng 1 trên desktop) ─────────────────────────── */}
          <div className="lg:col-span-2 lg:row-start-1">
            <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
              {/* Search + mobile sidebar toggle */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {/* Mobile: filter button */}
                <button
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white font-medium text-gray-700 flex-shrink-0"
                  style={{ fontSize: "13px" }}
                  onClick={() => setMobileSidebar(true)}
                >
                  <SlidersHorizontal size={14} />
                  Lọc
                </button>
              </div>

              {/* Sort dropdown */}
              <div className="relative flex-shrink-0">
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
                  <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl border border-gray-200 shadow-xl z-30 overflow-hidden py-1">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSort(opt.value)}
                        className="w-full text-left px-4 py-2.5 transition-colors hover:bg-blue-50"
                        style={{
                          fontSize: "13px",
                          color: sortBy === opt.value ? "#1565C0" : "#374151",
                          fontWeight: sortBy === opt.value ? 700 : 400,
                          backgroundColor:
                            sortBy === opt.value ? "#EFF6FF" : "transparent",
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Sidebar (desktop: hàng 2 cột 1, mobile: ẩn) ─────────── */}
          <aside className="hidden lg:block lg:row-start-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sticky top-[var(--top-header-height)]">
              {SidebarContent}
            </div>
          </aside>

          {/* ── Product grid (hàng 2 cột 2 trên desktop) ──────────────────── */}
          <div className="lg:col-start-2 lg:row-start-2 min-w-0">
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <PackageX size={48} className="text-gray-300 mb-4" />
                <p
                  className="font-semibold text-gray-500"
                  style={{ fontSize: "16px" }}
                >
                  Không có sản phẩm nào
                </p>
                <p className="text-gray-400 mt-1" style={{ fontSize: "13px" }}>
                  Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
                </p>
                <button
                  onClick={() => {
                    setSearchQ("");
                    setActiveCategory("all");
                    setPage(1);
                  }}
                  className="mt-4 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90"
                  style={{ backgroundColor: "#1565C0", fontSize: "13px" }}
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {paginated.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination
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

      {/* ── Mobile sidebar overlay ─────────────────────────────────── */}
      {mobileSidebar && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileSidebar(false)}
          />
          {/* Drawer */}
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
            {SidebarContent}
          </div>
        </div>
      )}

      {/* Close sort dropdown on outside click */}
      {sortOpen && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setSortOpen(false)}
        />
      )}
    </div>
  );
}
