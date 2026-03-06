"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "PGS.TS. Nguyễn Văn Thành",
    role: "Trưởng Khoa ICU",
    hospital: "Bệnh viện Bạch Mai, Hà Nội",
    avatar: "NT",
    avatarColor: "#1565C0",
    text: "MedPro Việt Nam đã cung cấp cho chúng tôi các thiết bị ICU chất lượng cao, đúng tiến độ và đầy đủ hồ sơ pháp lý. Đội ngũ kỹ thuật hỗ trợ lắp đặt và vận hành rất chuyên nghiệp. Chúng tôi đã duy trì hợp tác hơn 8 năm và hoàn toàn hài lòng.",
    rating: 5,
    tag: "Thiết bị ICU",
  },
  {
    id: 2,
    name: "TS.BS. Trần Thị Hương",
    role: "Giám đốc Trung tâm Phẫu thuật",
    hospital: "Bệnh viện Chợ Rẫy, TP.HCM",
    avatar: "TH",
    avatarColor: "#00897B",
    text: "Chúng tôi đã nhập hàng trăm bộ dụng cụ phẫu thuật từ MedPro. Sản phẩm đảm bảo tiêu chuẩn CE, giá cạnh tranh hơn 15-20% so với các nhà cung cấp khác. Điều tôi đánh giá cao nhất là dịch vụ tư vấn chuyên sâu và hỗ trợ hồ sơ đấu thầu.",
    rating: 5,
    tag: "Dụng cụ phẫu thuật",
  },
  {
    id: 3,
    name: "ThS. Lê Minh Quang",
    role: "Quản lý Thiết bị Y tế",
    hospital: "Bệnh viện Đại học Y Dược TP.HCM",
    avatar: "MQ",
    avatarColor: "#7B1FA2",
    text: "Nguồn hàng của MedPro rất đa dạng và ổn định. Điều quan trọng với chúng tôi là đầy đủ CO/CQ cho mọi sản phẩm. Đội ngũ bán hàng tư vấn tận tình, giao hàng đúng hạn. Đặc biệt là chính sách bảo hành sau bán hàng rất tốt.",
    rating: 5,
    tag: "Vật tư tiêu hao",
  },
  {
    id: 4,
    name: "BS. Phạm Thị Lan",
    role: "Chủ phòng khám",
    hospital: "Phòng khám Đa khoa Sài Gòn Quốc tế",
    avatar: "PL",
    avatarColor: "#D97706",
    text: "Là phòng khám tư nhân, tôi cần nguồn vật tư ổn định với giá hợp lý. MedPro đáp ứng được cả hai yêu cầu này, cộng thêm việc giao hàng nhanh trong 24h tại TP.HCM. Hotline hỗ trợ 24/7 thực sự rất hữu ích trong những tình huống khẩn cấp.",
    rating: 5,
    tag: "Vật tư tiêu hao",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const visible = [
    testimonials[current % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
  ];

  return (
    <section
      className="py-16"
      style={{
        background:
          "linear-gradient(135deg, #0D2B6E 0%, #1565C0 60%, #0288D1 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-1 rounded-full bg-teal-400" />
            <span
              className="font-semibold text-teal-300"
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Khách hàng nói gì
            </span>
            <div className="w-8 h-1 rounded-full bg-teal-400" />
          </div>
          <h2
            className="text-white"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)", fontWeight: 800 }}
          >
            Đánh Giá Từ Khách Hàng
          </h2>
          <p className="text-blue-200 mt-2" style={{ fontSize: "14px" }}>
            Niềm tin của hơn 500 bệnh viện và phòng khám trên toàn quốc
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {visible.map((item, i) => (
            <div
              key={item.id + "-" + i}
              className="bg-white rounded-2xl p-6 relative transition-all"
              style={{ opacity: i === 0 ? 1 : 0.85 }}
            >
              {/* Quote icon */}
              <div
                className="absolute top-4 right-5 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#EFF6FF" }}
              >
                <Quote size={18} className="text-blue-400" />
              </div>

              {/* Rating */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(item.rating)].map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    style={{ color: "#F59E0B", fill: "#F59E0B" }}
                  />
                ))}
              </div>

              {/* Tag */}
              <span
                className="inline-block px-2.5 py-0.5 rounded-full text-white mb-3"
                style={{
                  backgroundColor: "#1565C0",
                  fontSize: "11px",
                  fontWeight: 600,
                }}
              >
                {item.tag}
              </span>

              {/* Text */}
              <p
                className="text-gray-700 mb-5 italic"
                style={{ fontSize: "14px", lineHeight: 1.75 }}
              >
                "{item.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white flex-shrink-0"
                  style={{
                    backgroundColor: item.avatarColor,
                    fontSize: "13px",
                    fontWeight: 700,
                  }}
                >
                  {item.avatar}
                </div>
                <div>
                  <p
                    className="font-bold text-gray-900"
                    style={{ fontSize: "14px" }}
                  >
                    {item.name}
                  </p>
                  <p className="text-gray-500" style={{ fontSize: "12px" }}>
                    {item.role}
                  </p>
                  <p
                    className="text-blue-600"
                    style={{ fontSize: "12px", fontWeight: 600 }}
                  >
                    {item.hospital}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white/20 transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="rounded-full transition-all"
                style={{
                  width: i === current ? "24px" : "8px",
                  height: "8px",
                  backgroundColor:
                    i === current ? "#fff" : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white/20 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
