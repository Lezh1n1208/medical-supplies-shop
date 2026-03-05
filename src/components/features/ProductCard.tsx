"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Eye, Star, Phone } from "lucide-react";

export interface ProductCardData {
  id: number;
  name: string;
  brand: string;
  price: string | null;
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
  showRating?: boolean;
}

export function ProductCard({
  product,
  showRating = true,
}: Readonly<ProductCardProps>) {
  const [wished, setWished] = useState(false);

  const isContact = product.price === null;
  const rating = Math.floor(product.rating ?? 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col">
      {/* IMAGE */}
      <div className="relative overflow-hidden h-[180px]">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* BADGE */}
        {(product.badge || product.isNew) && (
          <div
            className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-white font-bold text-[10px]"
            style={{
              backgroundColor: product.badgeColor ?? "#1565C0",
            }}
          >
            {product.badge ?? "Mới"}
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
          <button
            onClick={() => setWished((w) => !w)}
            className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-transform hover:scale-110"
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
            className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-transform hover:scale-110"
            aria-label="Xem nhanh"
          >
            <Eye size={14} className="text-gray-500" />
          </button>
        </div>

        {/* BRAND */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-white font-medium text-[10px] bg-black/60">
          {product.brand}
          {product.origin && (
            <span className="opacity-75"> · {product.origin}</span>
          )}
        </div>
      </div>

      {/* INFO */}
      <div className="p-3 flex flex-col flex-1">
        {/* NAME */}
        <p className="text-gray-800 text-[13px] font-semibold leading-snug mb-2 line-clamp-2 flex-1">
          {product.name}
        </p>

        {/* RATING */}
        {showRating && product.rating !== undefined && (
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                size={11}
                style={{
                  color: i < rating ? "#F59E0B" : "#E5E7EB",
                  fill: i < rating ? "#F59E0B" : "#E5E7EB",
                }}
              />
            ))}

            {product.reviews !== undefined && (
              <span className="text-gray-400 ml-1 text-[11px]">
                ({product.reviews})
              </span>
            )}
          </div>
        )}

        {/* PRICE */}
        <div className="mb-3">
          {product.oldPrice && (
            <span className="text-gray-400 line-through mr-2 text-[11px]">
              {product.oldPrice}đ
            </span>
          )}

          {isContact ? (
            <span className="font-bold text-[12px] text-purple-700">
              Liên hệ báo giá
            </span>
          ) : (
            <span className="font-bold text-[14px] text-red-600">
              {product.price}đ
              {product.unit && (
                <span className="text-gray-400 font-normal ml-1 text-[11px]">
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
            className="w-full py-2 rounded-lg text-white font-semibold text-[12px] bg-blue-700 hover:opacity-90 flex items-center justify-center gap-1.5"
          >
            <Phone size={12} />
            Liên hệ báo giá
          </a>
        ) : (
          <button className="w-full py-2 rounded-lg text-white font-semibold text-[12px] bg-teal-600 hover:opacity-90 active:scale-95 flex items-center justify-center gap-1.5">
            <ShoppingCart size={12} />
            Đặt mua
          </button>
        )}
      </div>
    </div>
  );
}
