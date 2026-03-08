"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ProductListItem } from "@/services/product.public.service";

interface ProductCardProps {
  product: ProductListItem;
  showRating?: boolean;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price);
}

export function ProductCard({
  product,
  showRating = true,
}: Readonly<ProductCardProps>) {
  const [wished, setWished] = useState(false);

  const isContact = product.price_type === "CONTACT";
  const rating = Math.floor(product.rating ?? 0);
  const thumbnail =
    product.product_images.find((img) => img.is_thumbnail) ??
    product.product_images[0];
  const hasSale = product.sale_price != null && product.price != null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col">
      {/* IMAGE */}
      <Link
        href={`/san-pham/${product.slug}`}
        className="relative overflow-hidden h-[180px] block"
      >
        {thumbnail ? (
          <Image
            src={thumbnail.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          // Placeholder khi không có ảnh
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-300 text-[12px]">Chưa có ảnh</span>
          </div>
        )}

        {/* BADGE */}
        {hasSale && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-white font-bold text-[10px] bg-red-500">
            Khuyến mãi
          </div>
        )}
        {product.is_best_seller && !hasSale && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-white font-bold text-[10px] bg-blue-600">
            Bán chạy
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
          <button
            onClick={(e) => {
              e.preventDefault();
              setWished((w) => !w);
            }}
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
            onClick={(e) => e.preventDefault()}
            className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-transform hover:scale-110"
            aria-label="Xem nhanh"
          >
            <Eye size={14} className="text-gray-500" />
          </button>
        </div>

        {/* CATEGORY */}
        {product.categories && (
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-white font-medium text-[10px] bg-black/60">
            {product.categories.name}
          </div>
        )}
      </Link>

      {/* INFO */}
      <div className="p-3 flex flex-col flex-1">
        {/* NAME */}
        <Link href={`/san-pham/${product.slug}`}>
          <p className="text-gray-800 text-[13px] font-semibold leading-snug mb-2 line-clamp-2 flex-1 hover:text-blue-700 transition-colors">
            {product.name}
          </p>
        </Link>

        {/* RATING */}
        {showRating && (
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
          </div>
        )}

        {/* PRICE */}
        <div className="mb-3">
          {isContact ? (
            <span className="font-bold text-[12px] text-purple-700">
              Liên hệ báo giá
            </span>
          ) : (
            <>
              {hasSale && (
                <span className="text-gray-400 line-through mr-2 text-[11px]">
                  {formatPrice(product.price!)}đ
                </span>
              )}
              <span className="font-bold text-[14px] text-red-600">
                {formatPrice(hasSale ? product.sale_price! : product.price!)}đ
              </span>
            </>
          )}
        </div>

        {/* CTA — luôn là "Đặt mua" */}
        <button className="w-full py-2 rounded-lg text-white font-semibold text-[12px] bg-teal-600 hover:opacity-90 active:scale-95 flex items-center justify-center gap-1.5">
          <ShoppingCart size={12} />
          Đặt mua
        </button>
      </div>
    </div>
  );
}
