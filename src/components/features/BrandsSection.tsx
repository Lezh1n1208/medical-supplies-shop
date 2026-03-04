"use client";
import { useEffect, useRef } from "react";

const brands = [
  { name: "B. Braun", abbr: "B.BRAUN", sub: "Việt Nam", color: "#005BAA" },
  { name: "Medtronic", abbr: "MEDTRONIC", sub: "Mỹ", color: "#C41230" },
  { name: "Omron", abbr: "OMRON", sub: "Nhật Bản", color: "#CC0000" },
  { name: "Johnson & Johnson", abbr: "J&J", sub: "Ireland", color: "#CC0000" },
  { name: "Gima", abbr: "GIMA", sub: "Ý", color: "#003087" },
  { name: "Eurofarm", abbr: "EUROFARM", sub: "Italia", color: "#007A33" },
  { name: "Greetmed", abbr: "GREETMED", sub: "Trung Quốc", color: "#0066CC" },
  { name: "Microlife", abbr: "MICROLIFE", sub: "Thụy Sĩ", color: "#E30613" },
  { name: "Altochem", abbr: "ALTOCHEM", sub: "Hàn Quốc", color: "#1A5276" },
  { name: "Bastos", abbr: "BASTOS", sub: "Hàn Quốc", color: "#2E86C1" },
  { name: "Noamed", abbr: "NOAMED", sub: "Thổ Nhĩ Kỳ", color: "#1E8449" },
  { name: "Acare", abbr: "ACARE", sub: "Đài Loan", color: "#0097A7" },
  { name: "Innoplast", abbr: "INNOPLAST", sub: "Thái Lan", color: "#E65100" },
  { name: "Anios", abbr: "ANIOS", sub: "Pháp", color: "#6A1B9A" },
  { name: "Sonomed", abbr: "SONOMED", sub: "Malaysia", color: "#00695C" },
  { name: "Sony", abbr: "SONY", sub: "Nhật Bản", color: "#000000" },
  { name: "Tecfen Medical", abbr: "TECFEN", sub: "Đức", color: "#1565C0" },
  { name: "ALPK2", abbr: "ALPK2", sub: "Nhật Bản", color: "#C62828" },
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
              Thương hiệu phân phối
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
            Sản Phẩm Chính Hãng Từ Các Thương Hiệu Uy Tín
          </h2>

          <p className="text-gray-500 mt-1 text-sm">
            Hàng nhập khẩu trực tiếp từ nhà sản xuất, đầy đủ CO/CQ và hóa đơn
            GTGT
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
          {allBrands.map((brand, index) => {
            let fontSize = "14px";

            if (brand.abbr.length > 7) {
              fontSize = "9px";
            } else if (brand.abbr.length > 5) {
              fontSize = "11px";
            }

            return (
              <button
                key={`${brand.name}-${brand.abbr}-${index}`}
                type="button"
                aria-label={`Thương hiệu ${brand.name} - ${brand.sub}`}
                className="flex-shrink-0 flex items-center justify-center rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  width: "148px",
                  height: "72px",
                  padding: "12px 16px",
                }}
              >
                <div className="text-center">
                  <div
                    className="font-black transition-all duration-200 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                    style={{
                      fontSize,
                      color: "#9CA3AF",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {brand.abbr}
                  </div>

                  <div className="text-gray-400 leading-tight mt-0.5 text-[9px]">
                    {brand.name} · {brand.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
