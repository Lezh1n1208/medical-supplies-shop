"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductCard, ProductCardData } from "./ProductCard";

const TABS = [
  "Tất cả",
  "Mới nhất",
  "Bán chạy",
  "Khuyến mãi",
];

const products: ProductCardData[] = [
  {
    id: 1,
    name: "Máy theo dõi bệnh nhân đa thông số BM3",
    brand: "Biocare",
    price: "28.500.000",
    oldPrice: "32.000.000",
    img: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=400&h=280&fit=crop",
    badge: "Bán chạy",
    badgeColor: "#DC2626",
    rating: 4.8,
    reviews: 24,
    tag: "Bán chạy",
    category: "Thiết bị chẩn đoán",
  },
  {
    id: 2,
    name: "Bộ dụng cụ phẫu thuật cơ bản 25 món",
    brand: "Aesculap",
    price: "4.200.000",
    img: "https://images.unsplash.com/photo-1758653500015-e97176428d46?w=400&h=280&fit=crop",
    badge: "Mới",
    badgeColor: "#1565C0",
    rating: 5,
    reviews: 8,
    tag: "Mới nhất",
    category: "Dụng cụ phẫu thuật",
  },
  {
    id: 3,
    name: "Kim luồn tĩnh mạch BD Angiocath 18G (hộp 50)",
    brand: "BD Medical",
    price: "320.000",
    oldPrice: "380.000",
    img: "https://images.unsplash.com/photo-1747987766141-9d1f2707dd6c?w=400&h=280&fit=crop",
    badge: "-16%",
    badgeColor: "#D97706",
    rating: 4.9,
    reviews: 156,
    tag: "Khuyến mãi",
    category: "Vật tư tiêu hao",
  },
  {
    id: 4,
    name: "Máy xét nghiệm huyết học 5 phần BC-5150",
    brand: "Mindray",
    price: null,
    img: "https://images.unsplash.com/photo-1768498950637-88d073faa491?w=400&h=280&fit=crop",
    badge: "Hot",
    badgeColor: "#7B1FA2",
    rating: 4.7,
    reviews: 12,
    tag: "Bán chạy",
    category: "Thiết bị xét nghiệm",
  },
  {
    id: 5,
    name: "Máy thở oxy dòng cao Optiflow AIRVO 2",
    brand: "Fisher & Paykel",
    price: null,
    img: "https://images.unsplash.com/photo-1580281657702-257584239a55?w=400&h=280&fit=crop",
    badge: "Mới",
    badgeColor: "#1565C0",
    rating: 5,
    reviews: 6,
    tag: "Mới nhất",
    category: "Thiết bị ICU",
  },
  {
    id: 6,
    name: "Khẩu trang phẫu thuật 3 lớp (hộp 50 cái)",
    brand: "Medicom",
    price: "85.000",
    oldPrice: "95.000",
    img: "https://images.unsplash.com/photo-1766325693728-348c38374d33?w=400&h=280&fit=crop",
    badge: "-11%",
    badgeColor: "#D97706",
    rating: 4.6,
    reviews: 342,
    tag: "Khuyến mãi",
    category: "Vật tư tiêu hao",
  },
  {
    id: 7,
    name: "Máy siêu âm xách tay SonoSite iViz",
    brand: "SonoSite",
    price: null,
    img: "https://images.unsplash.com/photo-1758691462848-ba1e929da259?w=400&h=280&fit=crop",
    badge: "Bán chạy",
    badgeColor: "#DC2626",
    rating: 4.9,
    reviews: 18,
    tag: "Bán chạy",
    category: "Thiết bị chẩn đoán",
  },
  {
    id: 8,
    name: "Giường bệnh đa năng điện 3 khúc",
    brand: "Stryker",
    price: "18.900.000",
    oldPrice: "22.000.000",
    img: "https://images.unsplash.com/photo-1755189118414-14c8dacdb082?w=400&h=280&fit=crop",
    badge: "-14%",
    badgeColor: "#D97706",
    rating: 4.7,
    reviews: 31,
    tag: "Khuyến mãi",
    category: "Thiết bị ICU",
  },
];

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("Tất cả");

  const filtered =
    activeTab === "Tất cả"
      ? products
      : products.filter((p) => p.tag === activeTab || p.category === activeTab);

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

        {/* Grid — dùng shared ProductCard */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} showRating />
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-8">
          <Link
            href="/products"
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
