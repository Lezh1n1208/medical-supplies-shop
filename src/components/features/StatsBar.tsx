"use client"
import { useEffect, useRef, useState } from "react";
import { Building2, PackageCheck, Clock, Headphones, Star } from "lucide-react";

const stats = [
  {
    icon: <Building2 size={22} />,
    value: 500,
    suffix: "+",
    label: "Bệnh viện & Phòng khám",
    color: "#1565C0",
  },
  {
    icon: <PackageCheck size={22} />,
    value: 50,
    suffix: "+",
    label: "Thương hiệu chính hãng",
    color: "#00897B",
  },
  {
    icon: <Clock size={22} />,
    value: 15,
    suffix: "+",
    label: "Năm kinh nghiệm",
    color: "#7B1FA2",
  },
  {
    icon: <Headphones size={22} />,
    value: 24,
    suffix: "/7",
    label: "Hỗ trợ kỹ thuật",
    color: "#D97706",
  },
  {
    icon: <Star size={22} />,
    value: 98,
    suffix: "%",
    label: "Khách hàng hài lòng",
    color: "#DC2626",
  },
];

function CountUp({
  target,
  suffix,
  active,
}: Readonly<{
  target: number;
  suffix: string;
  active: boolean;
}>) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(start);
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
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-0">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-gray-100">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-6 px-4 gap-2 hover:bg-gray-50 transition-colors"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-1"
                style={{
                  backgroundColor: stat.color + "15",
                  color: stat.color,
                }}
              >
                {stat.icon}
              </div>
              <div
                className="font-black leading-none"
                style={{ fontSize: "1.8rem", color: stat.color }}
              >
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  active={visible}
                />
              </div>
              <p
                className="text-gray-500 text-center"
                style={{ fontSize: "12px", lineHeight: 1.3 }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
