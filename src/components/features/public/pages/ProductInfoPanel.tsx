import {
  Star,
  Phone,
  ShoppingCart,
  CheckCircle,
  BadgeCheck,
} from "lucide-react";

const ZALO_URL = "https://zalo.me/0983498177";

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price);
}

interface ProductInfoPanelProps {
  name: string;
  priceType: "FIXED" | "CONTACT";
  price?: number | null;
  salePrice?: number | null;
  rating?: number;
  isBestSeller: boolean;
  categoryName?: string | null;
}

export function ProductInfoPanel({
  name,
  priceType,
  price,
  salePrice,
  rating = 0,
  isBestSeller,
  categoryName,
}: Readonly<ProductInfoPanelProps>) {
  const isContact = priceType === "CONTACT";
  const hasSale = salePrice != null && price != null;
  const displayPrice = hasSale ? salePrice : price;
  const ratingFloor = Math.floor(rating);

  return (
    <div className="flex flex-col gap-5">
      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        {categoryName && (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            {categoryName}
          </span>
        )}
        {isBestSeller && (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-600 text-white">
            <BadgeCheck size={11} />
            Bán chạy
          </span>
        )}
        {hasSale && (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-500 text-white">
            Khuyến mãi
          </span>
        )}
      </div>

      {/* Name */}
      <h1
        className="text-gray-900 font-bold leading-snug"
        style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}
      >
        {name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              size={14}
              style={{
                color: i < ratingFloor ? "#F59E0B" : "#E5E7EB",
                fill: i < ratingFloor ? "#F59E0B" : "#E5E7EB",
              }}
            />
          ))}
        </div>
        <span className="text-[13px] text-gray-400">{rating.toFixed(1)}</span>
      </div>

      <div className="border-t border-gray-100" />

      {/* Price */}
      <div>
        <p className="text-[12px] text-gray-400 uppercase tracking-wide mb-1.5">
          Giá bán
        </p>
        {isContact ? (
          <span
            className="font-bold text-purple-700"
            style={{ fontSize: "26px" }}
          >
            Liên hệ báo giá
          </span>
        ) : (
          <div className="flex items-baseline gap-2.5 flex-wrap">
            {hasSale && !!price && (
              <span className="text-gray-400 line-through text-[15px]">
                {formatPrice(price)}đ
              </span>
            )}
            {!!displayPrice && (
              <span
                className="font-bold text-red-600"
                style={{ fontSize: "30px" }}
              >
                {formatPrice(displayPrice)}đ
              </span>
            )}
          </div>
        )}
      </div>

      {/* Trust indicators */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-2.5 border border-gray-100">
        {[
          "Hàng chính hãng, nguồn gốc xuất xứ rõ ràng",
          "Giao hàng toàn quốc",
          "Hỗ trợ tư vấn & báo giá miễn phí",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2.5">
            <CheckCircle size={14} className="text-teal-600 flex-shrink-0" />
            <span className="text-[13px] text-gray-600">{item}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      {isContact ? (
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 py-4 rounded-xl text-white font-bold transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ backgroundColor: "#1565C0", fontSize: "15px" }}
        >
          <Phone size={18} />
          Liên hệ báo giá qua Zalo
        </a>
      ) : (
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 py-4 rounded-xl text-white font-bold transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ backgroundColor: "#00897B", fontSize: "15px" }}
        >
          <ShoppingCart size={18} />
          Đặt mua qua Zalo
        </a>
      )}
    </div>
  );
}
