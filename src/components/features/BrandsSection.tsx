"use client";
import { useEffect, useRef } from "react";

const brands = [
  { name: "Siemens Healthineers", abbr: "SIEMENS", color: "#009999" },
  { name: "Philips Healthcare", abbr: "PHILIPS", color: "#0B5ED7" },
  { name: "GE Healthcare", abbr: "GE", color: "#00338D" },
  { name: "Mindray", abbr: "MINDRAY", color: "#0066CC" },
  { name: "Medtronic", abbr: "MEDTRONIC", color: "#C41230" },
  { name: "BD Medical", abbr: "BD", color: "#00338D" },
  { name: "3M Healthcare", abbr: "3M", color: "#FF0000" },
  { name: "Abbott", abbr: "ABBOTT", color: "#004C97" },
  { name: "Stryker", abbr: "STRYKER", color: "#FFB400" },
  { name: "Biocare", abbr: "BIOCARE", color: "#00897B" },
  { name: "Fisher & Paykel", abbr: "F&P", color: "#005BAA" },
  { name: "Aesculap", abbr: "AESCULAP", color: "#003087" },
];

export function BrandsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let x = 0;
    const speed = 0.5;
    let raf: number;
    const totalWidth = track.scrollWidth / 2;

    const animate = () => {
      x += speed;
      if (x >= totalWidth) x = 0;
      track.style.transform = `translateX(-${x}px)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const stop = () => cancelAnimationFrame(raf);
    const resume = () => {
      raf = requestAnimationFrame(animate);
    };
    track.addEventListener("mouseenter", stop);
    track.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("mouseenter", stop);
      track.removeEventListener("mouseleave", resume);
    };
  }, []);

  const allBrands = [...brands, ...brands];

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 mb-7">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div
              className="w-8 h-1 rounded-full"
              style={{ backgroundColor: "#1565C0" }}
            />
            <span
              className="font-semibold text-blue-700"
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Đối tác chính hãng
            </span>
            <div
              className="w-8 h-1 rounded-full"
              style={{ backgroundColor: "#1565C0" }}
            />
          </div>
          <h2
            className="text-gray-900"
            style={{
              fontSize: "clamp(1.3rem, 2.5vw, 1.6rem)",
              fontWeight: 800,
            }}
          >
            Thương Hiệu Phân Phối Chính Thức
          </h2>
          <p className="text-gray-500 mt-1" style={{ fontSize: "14px" }}>
            Đối tác ủy quyền của hơn 50 thương hiệu y tế hàng đầu thế giới
          </p>
        </div>
      </div>

      {/* Slider */}
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          ref={trackRef}
          className="flex gap-4 w-max"
          style={{ willChange: "transform" }}
        >
          {allBrands.map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
              style={{ width: "140px", height: "72px", padding: "12px 16px" }}
            >
              <div className="text-center">
                <div
                  className="font-black transition-all group-hover:scale-105"
                  style={{
                    fontSize: brand.abbr.length > 6 ? "10px" : "14px",
                    color: "#9CA3AF",
                    letterSpacing: "0.05em",
                    filter: "grayscale(1) opacity(0.6)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = brand.color;
                    (e.currentTarget as HTMLElement).style.filter = "none";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#9CA3AF";
                    (e.currentTarget as HTMLElement).style.filter =
                      "grayscale(1) opacity(0.6)";
                  }}
                >
                  {brand.abbr}
                </div>
                <div
                  className="text-gray-400 leading-tight mt-0.5"
                  style={{ fontSize: "9px" }}
                >
                  {brand.name.replace(brand.abbr, "").trim()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
