"use client"
import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Eye,
  Star,
  ArrowRight,
  Phone,
} from "lucide-react";

const tabs = [
  "Tất cả",
  "Mới nhất",
  "Bán chạy",
  "Khuyến mãi",
  "Thiết bị chẩn đoán",
  "Vật tư tiêu hao",
];

const products = [
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
    oldPrice: null,
    img: "https://images.unsplash.com/photo-1758653500015-e97176428d46?w=400&h=280&fit=crop",
    badge: "Mới",
    badgeColor: "#1565C0",
    rating: 5.0,
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
    price: "Liên hệ báo giá",
    oldPrice: null,
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
    price: "Liên hệ báo giá",
    oldPrice: null,
    img: "https://images.unsplash.com/photo-1580281657702-257584239a55?w=400&h=280&fit=crop",
    badge: "Mới",
    badgeColor: "#1565C0",
    rating: 5.0,
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
    price: "Liên hệ báo giá",
    oldPrice: null,
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
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered =
    activeTab === "Tất cả"
      ? products
      : products.filter((p) => p.tag === activeTab || p.category === activeTab);

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
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
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-3 py-1.5 rounded-full border text-sm font-medium transition-all"
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

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{ height: "180px" }}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Badge */}
                <div
                  className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-white font-bold"
                  style={{
                    backgroundColor: product.badgeColor,
                    fontSize: "10px",
                  }}
                >
                  {product.badge}
                </div>

                {/* Action overlay */}
                <div
                  className="absolute top-2 right-2 flex flex-col gap-1.5 transition-all duration-200"
                  style={{
                    opacity: hoveredId === product.id ? 1 : 0,
                    transform:
                      hoveredId === product.id
                        ? "translateX(0)"
                        : "translateX(8px)",
                  }}
                >
                  <button
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all hover:scale-110"
                  >
                    <Heart
                      size={14}
                      style={{
                        color: wishlist.includes(product.id)
                          ? "#DC2626"
                          : "#9CA3AF",
                        fill: wishlist.includes(product.id)
                          ? "#DC2626"
                          : "none",
                      }}
                    />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all hover:scale-110">
                    <Eye size={14} className="text-gray-500" />
                  </button>
                </div>

                {/* Brand */}
                <div
                  className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-white font-medium"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.6)",
                    fontSize: "10px",
                  }}
                >
                  {product.brand}
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <p
                  className="text-gray-800 leading-snug mb-2 line-clamp-2"
                  style={{ fontSize: "13px", fontWeight: 600 }}
                >
                  {product.name}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={11}
                      style={{
                        color:
                          i < Math.floor(product.rating)
                            ? "#F59E0B"
                            : "#E5E7EB",
                        fill:
                          i < Math.floor(product.rating)
                            ? "#F59E0B"
                            : "#E5E7EB",
                      }}
                    />
                  ))}
                  <span
                    className="text-gray-400 ml-1"
                    style={{ fontSize: "11px" }}
                  >
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="mb-3">
                  {product.oldPrice && (
                    <span
                      className="text-gray-400 line-through mr-2"
                      style={{ fontSize: "11px" }}
                    >
                      {product.oldPrice}đ
                    </span>
                  )}
                  <span
                    className="font-bold"
                    style={{
                      fontSize:
                        product.price === "Liên hệ báo giá" ? "12px" : "14px",
                      color:
                        product.price === "Liên hệ báo giá"
                          ? "#7B1FA2"
                          : "#DC2626",
                    }}
                  >
                    {product.price === "Liên hệ báo giá"
                      ? product.price
                      : `${product.price}đ`}
                  </span>
                </div>

                {/* CTA */}
                <button
                  className="w-full py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-1.5"
                  style={{
                    backgroundColor:
                      product.price === "Liên hệ báo giá"
                        ? "#1565C0"
                        : "#00897B",
                    fontSize: "12px",
                  }}
                >
                  {product.price === "Liên hệ báo giá" ? (
                    <>
                      <Phone size={12} /> Liên hệ báo giá
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={12} /> Thêm vào giỏ hàng
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-8">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border-2 font-semibold transition-all hover:bg-blue-50 hover:border-blue-400"
            style={{
              borderColor: "#1565C0",
              color: "#1565C0",
              fontSize: "14px",
            }}
          >
            Xem tất cả sản phẩm
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
