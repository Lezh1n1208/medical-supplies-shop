"use client";
import { useEffect, useRef, useState } from "react";
import {
  PackageCheck,
  Handshake,
  CalendarCheck,
  Truck,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    icon: <PackageCheck size={22} />,
    value: 70,
    suffix: "+",
    label: "Sản phẩm kinh doanh",
    sublabel: "Vật tư tiêu hao & chỉnh hình",
    color: "#1565C0",
    bg: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
  },
  {
    icon: <Handshake size={22} />,
    value: 30,
    suffix: "+",
    label: "Đối tác B2B",
    sublabel: "Bệnh viện & phòng khám",
    color: "#00897B",
    bg: "linear-gradient(135deg, #F0FDF9, #CCFBF1)",
  },
  {
    icon: <CalendarCheck size={22} />,
    value: 4,
    suffix: " năm",
    label: "Kinh nghiệm",
    sublabel: "Hoạt động từ năm 2020",
    color: "#7B1FA2",
    bg: "linear-gradient(135deg, #FAF5FF, #EDE9FE)",
  },
  {
    icon: <Truck size={22} />,
    value: 2,
    suffix: "–3 ngày",
    label: "Giao hàng toàn quốc",
    sublabel: "Có hóa đơn GTGT",
    color: "#D97706",
    bg: "linear-gradient(135deg, #FFFBEB, #FEF3C7)",
  },
  {
    icon: <ShieldCheck size={22} />,
    value: 100,
    suffix: "%",
    label: "Hàng chính hãng",
    sublabel: "Nguồn gốc rõ ràng",
    color: "#DC2626",
    bg: "linear-gradient(135deg, #FFF5F5, #FEE2E2)",
  },
];

function CountUp({
  target,
  suffix,
  active,
}: Readonly<{ target: number; suffix: string; active: boolean }>) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    // Suffix có chữ (như "–3 ngày", " năm") → chỉ animate số
    let start = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white border-b border-gray-100">
      {/* Top accent line */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, #1565C0, #00897B, #7B1FA2, #D97706, #DC2626)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {stats.map((stat, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className={`relative flex flex-col items-center text-center rounded-2xl px-4 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md
                ${i === stats.length - 1 ? "col-span-2 md:col-span-1" : ""}
              `}
              style={{ background: stat.bg }}
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 shadow-sm"
                style={{
                  backgroundColor: stat.color + "20",
                  color: stat.color,
                }}
              >
                {stat.icon}
              </div>

              {/* Number */}
              <div
                className="font-black leading-none mb-1"
                style={{ fontSize: "1.7rem", color: stat.color }}
              >
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  active={visible}
                />
              </div>

              {/* Label */}
              <p
                className="font-semibold text-gray-800"
                style={{ fontSize: "12px" }}
              >
                {stat.label}
              </p>

              {/* Sublabel */}
              <p
                className="text-gray-400 mt-0.5 leading-tight"
                style={{ fontSize: "11px" }}
              >
                {stat.sublabel}
              </p>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                style={{
                  width: "32px",
                  height: "3px",
                  backgroundColor: stat.color + "60",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
