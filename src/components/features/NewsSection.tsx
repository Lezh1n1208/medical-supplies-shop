import { ArrowRight, Clock, Tag } from "lucide-react";

const news = [
  {
    id: 1,
    category: "Công nghệ Y tế",
    categoryColor: "#1565C0",
    title:
      "Xu hướng thiết bị y tế thông minh AI năm 2025: Những thay đổi đột phá",
    excerpt:
      "Trí tuệ nhân tạo đang cách mạng hóa ngành thiết bị y tế với các hệ thống chẩn đoán tự động, theo dõi bệnh nhân thông minh và robot phẫu thuật thế hệ mới.",
    date: "20 Feb 2026",
    readTime: "5 phút đọc",
    img: "https://images.unsplash.com/photo-1758691462848-ba1e929da259?w=500&h=280&fit=crop",
  },
  {
    id: 2,
    category: "Hướng dẫn đấu thầu",
    categoryColor: "#00897B",
    title: "Hướng dẫn lập hồ sơ đấu thầu thiết bị y tế đạt chuẩn Bộ Y tế 2026",
    excerpt:
      "Tổng hợp đầy đủ quy trình, biểu mẫu và danh sách tài liệu cần thiết khi tham gia đấu thầu mua sắm thiết bị y tế theo Nghị định 24/2024.",
    date: "15 Feb 2026",
    readTime: "8 phút đọc",
    img: "https://images.unsplash.com/photo-1768498950637-88d073faa491?w=500&h=280&fit=crop",
  },
  {
    id: 3,
    category: "Tin tức ngành",
    categoryColor: "#DC2626",
    title:
      "MedPro Việt Nam mở rộng kho bãi tại TP.HCM — Nâng cấp năng lực giao hàng",
    excerpt:
      "Kho hàng mới 2.000m² tại Quận 12 chính thức đi vào hoạt động, giúp rút ngắn thời gian giao hàng còn 4–8 giờ cho khu vực TP.HCM.",
    date: "10 Feb 2026",
    readTime: "3 phút đọc",
    img: "https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?w=500&h=280&fit=crop",
  },
];

export function NewsSection() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-1 rounded-full"
                style={{ backgroundColor: "#D97706" }}
              />
              <span
                className="font-semibold"
                style={{
                  fontSize: "12px",
                  color: "#D97706",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Cập nhật
              </span>
            </div>
            <h2
              className="text-gray-900"
              style={{
                fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                fontWeight: 800,
              }}
            >
              Tin Tức & Kiến Thức Y Tế
            </h2>
            <p className="text-gray-500 mt-1" style={{ fontSize: "14px" }}>
              Cập nhật xu hướng, hướng dẫn và tin tức mới nhất từ ngành y tế
            </p>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-1.5 font-semibold hover:text-blue-800 transition-colors"
            style={{ fontSize: "13px", color: "#1565C0" }}
          >
            Xem tất cả <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {news.map((item, i) => (
            <a
              key={item.id}
              href="#"
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 block"
            >
              <div
                className="relative overflow-hidden"
                style={{ height: "180px" }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white font-semibold"
                  style={{
                    backgroundColor: item.categoryColor,
                    fontSize: "11px",
                  }}
                >
                  {item.category}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3 text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock size={11} />
                    <span style={{ fontSize: "11px" }}>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag size={11} />
                    <span style={{ fontSize: "11px" }}>{item.readTime}</span>
                  </div>
                </div>
                <h3
                  className="text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors"
                  style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1.5 }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-gray-500 line-clamp-3"
                  style={{ fontSize: "12px", lineHeight: 1.6 }}
                >
                  {item.excerpt}
                </p>
                <div
                  className="flex items-center gap-1 mt-3 font-semibold"
                  style={{ fontSize: "12px", color: "#1565C0" }}
                >
                  Đọc tiếp{" "}
                  <ArrowRight
                    size={12}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
