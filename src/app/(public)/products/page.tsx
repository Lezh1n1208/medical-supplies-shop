"use client";

import { useState, useMemo } from "react";
import {
  Phone,
  ShoppingCart,
  Heart,
  ChevronDown,
  ChevronRight,
  SlidersHorizontal,
  X,
  Search,
  PackageX,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
interface Product {
  id: number;
  name: string;
  brand: string;
  origin: string;
  price: number | null; // null = "Liên hệ báo giá"
  unit: string;
  category: string;
  img: string;
  isNew?: boolean;
}

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

// ── Mock data (real products from Ánh Dương Phát catalog) ────────────────────
const ALL_PRODUCTS: Product[] = [
  // ── Vật tư tiêu hao ──────────────────────────────────────────────────────
  {
    id: 1,
    name: "Ống nội khí quản có bóng các size 5–7.5",
    brand: "Greetmed",
    origin: "Trung Quốc",
    price: 14500,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Gạc tẩm cồn hộp 100 miếng",
    brand: "Greetmed",
    origin: "Trung Quốc",
    price: 17000,
    unit: "Hộp",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Băng dính cố định kim luồn trong suốt 6×7cm",
    brand: "Eurofarm",
    origin: "Italia",
    price: 7875,
    unit: "Miếng",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Băng keo cá nhân Innoplast vải đỏ hộp 100 miếng",
    brand: "Innoplast",
    origin: "Thái Lan",
    price: 38000,
    unit: "Hộp",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Xốp cầm máu tự tiêu Spongostan 7×5×1cm hộp 20",
    brand: "Ethicon",
    origin: "Đan Mạch",
    price: 3661000,
    unit: "Hộp",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Xốp cầm máu mũi UMAXO có dây",
    brand: "UMX",
    origin: "Việt Nam",
    price: 72500,
    unit: "Miếng",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    name: "Bình tạo ẩm oxy Acare",
    brand: "Acare",
    origin: "Đài Loan",
    price: 415000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    name: "Lọc khuẩn 3 chức năng HME",
    brand: "Canack",
    origin: "Canada",
    price: 35000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
  },
  {
    id: 9,
    name: "Dây hút nhớt có khóa các size",
    brand: "Greetmed",
    origin: "Trung Quốc",
    price: 2200,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
  },
  {
    id: 10,
    name: "Dây Foley 2 nhánh các size",
    brand: "Greetmed",
    origin: "Trung Quốc",
    price: 12500,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
  },
  {
    id: 11,
    name: "Dây truyền máu B.Braun 180cm",
    brand: "B.Braun",
    origin: "Việt Nam",
    price: 27800,
    unit: "Sợi",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
  },
  {
    id: 12,
    name: "Dây nối bơm tiêm điện 140cm Bbraun",
    brand: "B.Braun",
    origin: "Việt Nam",
    price: 15625,
    unit: "Sợi",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
  },
  {
    id: 13,
    name: "Vớ tĩnh mạch gối các size S/M/L/XL",
    brand: "Noamed",
    origin: "Thổ Nhĩ Kỳ",
    price: 350000,
    unit: "Đôi",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
  },
  {
    id: 14,
    name: "Vớ tĩnh mạch dài các size S/M/L/XL",
    brand: "Noamed",
    origin: "Thổ Nhĩ Kỳ",
    price: 485000,
    unit: "Đôi",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
  },
  {
    id: 15,
    name: "Máy đo huyết áp điện tử Omron HEM-8712",
    brand: "Omron",
    origin: "Việt Nam",
    price: 850000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    isNew: true,
  },
  {
    id: 16,
    name: "Bộ đo huyết áp cơ Yamasu",
    brand: "Yamasu",
    origin: "Nhật Bản",
    price: 580000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
  },
  {
    id: 17,
    name: "Nhiệt kế đo trán hồng ngoại Microlife FR1MF1",
    brand: "Microlife",
    origin: "Thụy Sĩ",
    price: 890000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    isNew: true,
  },
  {
    id: 18,
    name: "Bộ đo huyết áp cơ ALPK2",
    brand: "ALPK2",
    origin: "Nhật Bản",
    price: 600000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
  },
  {
    id: 19,
    name: "Bút đánh dấu phẫu thuật Tecfen Medical",
    brand: "Tecfen Medical",
    origin: "Đức",
    price: 95000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
  },
  {
    id: 20,
    name: "Băng keo chỉ thị nhiệt lò hấp Gima 19mm",
    brand: "Gima",
    origin: "Ý",
    price: 95000,
    unit: "Cuộn",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
  },
  {
    id: 21,
    name: "Dung dịch khử khuẩn STERANIOS 2% 5 lít",
    brand: "Anios",
    origin: "Pháp",
    price: 485000,
    unit: "Can",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
  },
  {
    id: 22,
    name: "Dung dịch khử khuẩn mức cao CIDEX OPA 3.78L",
    brand: "Johnson & Johnson",
    origin: "Ireland",
    price: 1057472,
    unit: "Can",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
  },
  {
    id: 23,
    name: "Viên nén sát khuẩn PRESEPT 2.5Gr hộp 100 viên",
    brand: "Johnson & Johnson",
    origin: "Ireland",
    price: 550000,
    unit: "Hộp",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
  },
  {
    id: 24,
    name: "Dây hút dịch silicon cuộn 30m (hấp nhiều lần)",
    brand: "Gima",
    origin: "Ý",
    price: 5800000,
    unit: "Cuộn",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
  },
  {
    id: 25,
    name: "Xốp cầm máu Merocel hộp 10 miếng",
    brand: "Medtronic",
    origin: "Mỹ",
    price: 140000,
    unit: "Miếng",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
  },
  {
    id: 26,
    name: "Mặt nạ gây mê số 1–4 Greetmed",
    brand: "Greetmed",
    origin: "Trung Quốc",
    price: 38000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
  },
  {
    id: 27,
    name: "Bình hút áp lực âm 200ml",
    brand: "Yudu",
    origin: "Trung Quốc",
    price: 95000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
  },
  {
    id: 28,
    name: "Bình hút áp lực âm 400ml",
    brand: "Yudu",
    origin: "Trung Quốc",
    price: 105000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
  },

  // ── Vật tư chỉnh hình ────────────────────────────────────────────────────
  {
    id: 29,
    name: 'Băng bó bột Altocast 2" thủy tinh',
    brand: "Altochem",
    origin: "Hàn Quốc",
    price: 73868,
    unit: "Cuộn",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
  },
  {
    id: 30,
    name: 'Băng bó bột Altocast 3" thủy tinh',
    brand: "Altochem",
    origin: "Hàn Quốc",
    price: 94815,
    unit: "Cuộn",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
  },
  {
    id: 31,
    name: 'Băng bó bột Altocast 4" thủy tinh',
    brand: "Altochem",
    origin: "Hàn Quốc",
    price: 105840,
    unit: "Cuộn",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
  },
  {
    id: 32,
    name: 'Băng bó bột Altocast 5" thủy tinh',
    brand: "Altochem",
    origin: "Hàn Quốc",
    price: 132000,
    unit: "Cuộn",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
  },
  {
    id: 33,
    name: "Bông gòn bó bột Natural 5cm×2.7m",
    brand: "Bastos",
    origin: "Hàn Quốc",
    price: 21193,
    unit: "Cuộn",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
  },
  {
    id: 34,
    name: "Bông gòn bó bột Natural 7.5cm×2.7m",
    brand: "Bastos",
    origin: "Hàn Quốc",
    price: 26775,
    unit: "Cuộn",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
  },
  {
    id: 35,
    name: "Bông gòn bó bột Natural 10cm×2.7m",
    brand: "Bastos",
    origin: "Hàn Quốc",
    price: 34125,
    unit: "Cuộn",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
  },
  {
    id: 36,
    name: "Thun vớ Stockinette 5cm×25m dùng bó bột",
    brand: "Bastos",
    origin: "Bồ Đào Nha",
    price: 464100,
    unit: "Cuộn",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
  },
  {
    id: 37,
    name: "Thun vớ Stockinette 10cm×25m dùng bó bột",
    brand: "Bastos",
    origin: "Bồ Đào Nha",
    price: 666750,
    unit: "Cuộn",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
  },
  {
    id: 38,
    name: "Xe lăn CT-Care KY863LAJ-20 công nghệ Nhật",
    brand: "CT-Care",
    origin: "Việt Nam",
    price: 2750000,
    unit: "Cái",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    isNew: true,
  },
  {
    id: 39,
    name: "Nạng nhôm cho người khuyết tật C39A",
    brand: "Alumin",
    origin: "Trung Quốc",
    price: 200000,
    unit: "Cặp",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
  },
  {
    id: 40,
    name: "Bó mắt cá chân Goodfit full size",
    brand: "Goodfit",
    origin: "Trung Quốc",
    price: 79000,
    unit: "Cái",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
  },

  // ── Giấy in y tế ─────────────────────────────────────────────────────────
  {
    id: 41,
    name: "Giấy điện tim Sonomed 50mm×30m",
    brand: "Sonomed",
    origin: "Malaysia",
    price: 21000,
    unit: "Cuộn",
    category: "giay-in",
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
  },
  {
    id: 42,
    name: "Giấy điện tim Sonomed 60mm×30m",
    brand: "Sonomed",
    origin: "Malaysia",
    price: 23000,
    unit: "Cuộn",
    category: "giay-in",
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
  },
  {
    id: 43,
    name: "Giấy điện tim Sonomed 145mm×30m",
    brand: "Sonomed",
    origin: "Malaysia",
    price: 60000,
    unit: "Cuộn",
    category: "giay-in",
    img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
  },
  {
    id: 44,
    name: "Giấy in bill nhiệt 80×80mm",
    brand: "Quen Quen",
    origin: "Việt Nam",
    price: 25000,
    unit: "Cuộn",
    category: "giay-in",
    img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
  },
  {
    id: 45,
    name: "Giấy in kết quả siêu âm Sony 110S",
    brand: "Sony",
    origin: "Nhật Bản",
    price: 155000,
    unit: "Cuộn",
    category: "giay-in",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
  },
  {
    id: 46,
    name: "Ly giấy dùng một lần 185ml",
    brand: "Hàn Quốc",
    origin: "Hàn Quốc",
    price: 350,
    unit: "Cái",
    category: "giay-in",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
  },
];

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
            ? ALL_PRODUCTS.length
            : ALL_PRODUCTS.filter((p) => p.category === c.slug).length,
      })),
    [],
  );

  // ── Filter + sort ──────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = ALL_PRODUCTS;

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
          <span className="flex items-center gap-2">
            <ChevronRight
              size={12}
              style={{ opacity: activeCategory === cat.slug ? 1 : 0.3 }}
            />
            {cat.label}
          </span>
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
            {ALL_PRODUCTS.length} sản phẩm vật tư y tế chính hãng
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* ── Sidebar (desktop) ──────────────────────────────────── */}
          <aside
            className="hidden lg:block flex-shrink-0 bg-white rounded-2xl border border-gray-200 p-4 h-fit sticky top-24"
            style={{ width: "220px" }}
          >
            {SidebarContent}
          </aside>

          {/* ── Main content ───────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
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

                {/* Search */}
                <div className="relative flex-1 max-w-xs">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={searchQ}
                    onChange={(e) => {
                      setSearchQ(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Tìm sản phẩm..."
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-400 transition-all"
                    style={{ fontSize: "13px" }}
                  />
                </div>

                <span
                  className="text-gray-500 flex-shrink-0"
                  style={{ fontSize: "13px" }}
                >
                  {filtered.length} kết quả
                </span>
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

            {/* Product grid */}
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
