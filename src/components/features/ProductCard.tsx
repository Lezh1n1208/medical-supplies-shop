"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Eye, Star, Phone } from "lucide-react";

export interface ProductCardData {
  id: number;
  name: string;
  brand: string;
  price: string | null; // null = hiển thị "Liên hệ báo giá"
  oldPrice?: string | null;
  img: string;
  badge?: string | null;
  badgeColor?: string;
  rating?: number;
  reviews?: number;
  unit?: string;
  origin?: string;
  tag?: string;
  category?: string;
  isNew?: boolean;
}

interface ProductCardProps {
  product: ProductCardData;
  /** Hiện rating stars — default: true */
  showRating?: boolean;
}

export function ProductCard({
  product,
  showRating = true,
}: Readonly<ProductCardProps>) {
  const [wished, setWished] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isContact = product.price === null;

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image ───────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: "180px" }}>
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badge */}
        {(product.badge || product.isNew) && (
          <div
            className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-white font-bold"
            style={{
              backgroundColor: product.badgeColor ?? "#1565C0",
              fontSize: "10px",
            }}
          >
            {product.badge ?? "Mới"}
          </div>
        )}

        {/* Action buttons — slide in từ phải khi hover */}
        <div
          className="absolute top-2 right-2 flex flex-col gap-1.5 transition-all duration-200"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(8px)",
          }}
        >
          <button
            onClick={() => setWished((w) => !w)}
            className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all hover:scale-110"
            aria-label="Yêu thích"
          >
            <Heart
              size={14}
              style={{
                color: wished ? "#DC2626" : "#9CA3AF",
                fill: wished ? "#DC2626" : "none",
              }}
            />
          </button>
          <button
            className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all hover:scale-110"
            aria-label="Xem nhanh"
          >
            <Eye size={14} className="text-gray-500" />
          </button>
        </div>

        {/* Brand + origin tag */}
        <div
          className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-white font-medium"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", fontSize: "10px" }}
        >
          {product.brand}
          {product.origin && (
            <span className="opacity-75"> · {product.origin}</span>
          )}
        </div>
      </div>

      {/* ── Info ────────────────────────────────────────────────── */}
      <div className="p-3 flex flex-col flex-1">
        {/* Name */}
        <p
          className="text-gray-800 leading-snug mb-2 line-clamp-2 flex-1"
          style={{ fontSize: "13px", fontWeight: 600 }}
        >
          {product.name}
        </p>

        {/* Rating */}
        {showRating && product.rating !== undefined && (
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                style={{
                  color:
                    i < Math.floor(product.rating!) ? "#F59E0B" : "#E5E7EB",
                  fill: i < Math.floor(product.rating!) ? "#F59E0B" : "#E5E7EB",
                }}
              />
            ))}
            {product.reviews !== undefined && (
              <span className="text-gray-400 ml-1" style={{ fontSize: "11px" }}>
                ({product.reviews})
              </span>
            )}
          </div>
        )}

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
          {isContact ? (
            <span
              className="font-bold"
              style={{ fontSize: "12px", color: "#7B1FA2" }}
            >
              Liên hệ báo giá
            </span>
          ) : (
            <span
              className="font-bold"
              style={{ fontSize: "14px", color: "#DC2626" }}
            >
              {product.price}đ
              {product.unit && (
                <span
                  className="text-gray-400 font-normal ml-1"
                  style={{ fontSize: "11px" }}
                >
                  / {product.unit}
                </span>
              )}
            </span>
          )}
        </div>

        {/* CTA */}
        {isContact ? (
          <a
            href="tel:0983498177"
            className="w-full py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-1.5"
            style={{ backgroundColor: "#1565C0", fontSize: "12px" }}
          >
            <Phone size={12} />
            Liên hệ báo giá
          </a>
        ) : (
          <button
            className="w-full py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-1.5"
            style={{ backgroundColor: "#00897B", fontSize: "12px" }}
          >
            <ShoppingCart size={12} />
            Thêm vào giỏ hàng
          </button>
        )}
      </div>
    </div>
  );
}
