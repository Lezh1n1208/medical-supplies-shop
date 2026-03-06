"use client";
import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Package,
  Truck,
  FileCheck,
  ShieldCheck,
} from "lucide-react";

const slides = [
  {
    id: 1,
    badge: "Cung cấp vật tư y tế tại TP. Hồ Chí Minh",
    headline: "Vật Tư Y Tế\nTiêu Hao",
    highlight: "Chính Hãng",
    sub: "Cung cấp đa dạng vật tư tiêu hao y tế cho bệnh viện, phòng khám và cơ sở y tế. Hàng chính hãng, đầy đủ hóa đơn GTGT.",
    cta1: "Liên hệ báo giá",
    cta2: "Xem danh mục",
    img: "https://images.unsplash.com/photo-1747987766141-9d1f2707dd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accent: "#00897B",
  },
  {
    id: 2,
    badge: "Phân phối vật tư chỉnh hình",
    headline: "Vật Tư\nChỉnh Hình",
    highlight: "& Phục Hồi",
    sub: "Băng bó bột, xe lăn, nạng, vớ tĩnh mạch và các vật tư chỉnh hình từ các thương hiệu uy tín Hàn Quốc, Bồ Đào Nha, Việt Nam.",
    cta1: "Liên hệ báo giá",
    cta2: "Xem sản phẩm",
    img: "https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accent: "#1565C0",
  },
  {
    id: 3,
    badge: "Giấy in y tế & vật tư văn phòng",
    headline: "Giấy In\nY Tế",
    highlight: "Các Loại",
    sub: "Giấy điện tim, giấy in siêu âm, giấy in bill và các vật tư văn phòng y tế. Giao hàng nhanh 2–3 ngày trong toàn quốc.",
    cta1: "Liên hệ báo giá",
    cta2: "Xem sản phẩm",
    img: "https://images.unsplash.com/photo-1768498950637-88d073faa491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    accent: "#7B1FA2",
  },
];

const trustBadges = [
  { icon: <ShieldCheck size={14} />, text: "Hàng chính hãng 100%" },
  { icon: <FileCheck size={14} />, text: "Có hóa đơn GTGT" },
  { icon: <Truck size={14} />, text: "Giao hàng 2–3 ngày" },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 500);
    },
    [animating],
  );

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(560px, 85vh, 640px)" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          backgroundImage: `url(${slide.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: animating ? 0.6 : 1,
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(13,43,110,0.92) 0%, rgba(13,43,110,0.75) 45%, rgba(13,43,110,0.20) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-white max-w-2xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-white"
            style={{
              backgroundColor: slide.accent + "CC",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {slide.badge}
          </div>

          {/* Headline */}
          <h1
            className="text-white mb-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(10px)" : "translateY(0)",
              transition: "all 0.4s ease",
            }}
          >
            {slide.headline.split("\n").map((line, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <span key={i}>
                {i === 0 ? (
                  line
                ) : (
                  <>
                    <br />
                    <span style={{ color: "#93C5FD" }}>{line} </span>
                    <span style={{ color: "#FCD34D" }}>{slide.highlight}</span>
                  </>
                )}
              </span>
            ))}
          </h1>

          {/* Sub */}
          <p
            className="text-blue-100 mb-7 max-w-lg"
            style={{
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              lineHeight: 1.7,
              opacity: animating ? 0 : 1,
              transition: "opacity 0.5s ease 0.1s",
            }}
          >
            {slide.sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href="tel:0983498177"
              className="flex items-center gap-2 px-6 py-3.5 rounded-lg text-white font-semibold transition-all hover:opacity-90 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: slide.accent,
                fontSize: "14px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              }}
            >
              <Phone size={15} />
              {slide.cta1}
            </a>
            <a
              href="#products"
              className="flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold transition-all hover:bg-white/20 border"
              style={{
                borderColor: "rgba(255,255,255,0.5)",
                color: "#fff",
                fontSize: "14px",
              }}
            >
              <Package size={15} />
              {slide.cta2}
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3">
            {trustBadges.map((b, i) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border"
                style={{
                  borderColor: "rgba(255,255,255,0.25)",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontSize: "12px",
                }}
              >
                {b.icon}
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick contact card */}
        <div
          className="hidden lg:block w-72 bg-white rounded-2xl p-5 shadow-2xl flex-shrink-0"
          style={{ opacity: animating ? 0.7 : 1, transition: "opacity 0.4s" }}
        >
          <p
            className="text-gray-800 mb-1"
            style={{ fontSize: "15px", fontWeight: 700 }}
          >
            📋 Yêu cầu báo giá nhanh
          </p>
          <p className="text-gray-400 mb-4" style={{ fontSize: "12px" }}>
            Phản hồi trong giờ hành chính
          </p>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Họ và tên"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-teal-500 transition-all"
              style={{ fontSize: "13px" }}
            />
            <input
              type="tel"
              placeholder="Số điện thoại / Zalo"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-teal-500 transition-all"
              style={{ fontSize: "13px" }}
            />
            <select
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 focus:outline-none focus:border-teal-500 transition-all"
              style={{ fontSize: "13px" }}
            >
              <option value="">-- Danh mục sản phẩm --</option>
              <option>Vật tư tiêu hao</option>
              <option>Vật tư chỉnh hình</option>
              <option>Giấy in y tế</option>
              <option>Khác</option>
            </select>
            <a
              href="tel:0983498177"
              className="w-full py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-2"
              style={{ backgroundColor: "#00897B", fontSize: "13px" }}
            >
              <Phone size={13} />
              Gọi ngay: 0983.498.177
            </a>
          </div>
          <p
            className="text-center text-gray-400 mt-3"
            style={{ fontSize: "11px" }}
          >
            🔒 Thông tin được bảo mật tuyệt đối
          </p>
        </div>
      </div>

      {/* Slider controls */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all"
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              backgroundColor: i === current ? "#fff" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-white/30"
        style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-white/30"
        style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}
      >
        <ChevronRight size={18} />
      </button>
    </section>
  );
}
