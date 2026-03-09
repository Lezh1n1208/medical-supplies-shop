"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "BS.CKII. Trần Văn Nam",
    role: "Trưởng Khoa Chấn thương Chỉnh hình",
    hospital: "Bệnh viện Đa khoa Khu vực",
    avatar: "VN",
    avatarColor: "#1565C0",
    text: "Nguồn cung cấp các loại băng bó bột sợi thủy tinh và vật tư chỉnh hình của công ty luôn đảm bảo chất lượng, độ cứng và tính thoáng khí cao. Hàng hóa đa dạng chủng loại, đáp ứng rất tốt nhu cầu phẫu thuật và phục hồi chức năng của khoa chúng tôi.",
    rating: 5,
    tag: "Vật tư & Chỉnh hình",
  },
  {
    id: 2,
    name: "ThS. Lê Thị Mai",
    role: "Trưởng Phòng Vật tư Y tế",
    hospital: "Bệnh viện Đa khoa Quốc tế",
    avatar: "LM",
    avatarColor: "#00897B",
    text: "Điều tôi đánh giá cao nhất là danh mục vật tư tiêu hao cực kỳ phong phú, từ ống nội khí quản, xốp cầm máu đến các dung dịch khử khuẩn chuyên dụng. Đầy đủ giấy tờ chứng nhận pháp lý, quy trình báo giá chuyên nghiệp và giao hàng rất đúng hẹn.",
    rating: 5,
    tag: "Vật tư tiêu hao",
  },
  {
    id: 3,
    name: "BS. Phạm Quang Huy",
    role: "Giám đốc Phòng khám",
    hospital: "Phòng khám Đa khoa Trí Tâm",
    avatar: "QH",
    avatarColor: "#7B1FA2",
    text: "Là phòng khám tư nhân, chúng tôi thường xuyên nhập các loại giấy in điện tim, giấy in siêu âm và trang thiết bị y tế cơ bản. Chất lượng giấy in hiển thị sóng rất rõ nét, giá cả cạnh tranh. Đội ngũ tư vấn nhiệt tình và hỗ trợ xử lý đơn hàng nhanh chóng.",
    rating: 5,
    tag: "Giấy in & Thiết bị",
  },
  {
    id: 4,
    name: "Dược sĩ Nguyễn Hoàng Long",
    role: "Giám đốc Mua hàng",
    hospital: "Hệ thống Y tế Tư nhân",
    avatar: "HL",
    avatarColor: "#D97706",
    text: "Đây là đối tác cung ứng chiến lược của chúng tôi trong nhiều năm qua. Nguồn hàng luôn ổn định, kể cả trong những giai đoạn thị trường khan hiếm. Các chính sách hỗ trợ giá và công nợ linh hoạt giúp chúng tôi tối ưu chi phí vận hành rất hiệu quả.",
    rating: 5,
    tag: "Đối tác Chiến lược",
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
              key={`${item.id}-${i}`}
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
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star
                    // eslint-disable-next-line react/no-array-index-key
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
                // eslint-disable-next-line react/no-array-index-key
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
