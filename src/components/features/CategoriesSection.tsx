import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Thiết bị chẩn đoán",
    slug: "chan-doan",
    count: 248,
    icon: "🩺",
    color: "#1565C0",
    bg: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
    borderColor: "#90CAF9",
    img: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=200&h=140&fit=crop",
  },
  {
    id: 2,
    name: "Dụng cụ phẫu thuật",
    slug: "phau-thuat",
    count: 186,
    icon: "🔬",
    color: "#00897B",
    bg: "linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 100%)",
    borderColor: "#80CBC4",
    img: "https://images.unsplash.com/photo-1758653500015-e97176428d46?w=200&h=140&fit=crop",
  },
  {
    id: 3,
    name: "Thiết bị ICU & Hồi sức",
    slug: "icu",
    count: 94,
    icon: "💊",
    color: "#7B1FA2",
    bg: "linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)",
    borderColor: "#CE93D8",
    img: "https://images.unsplash.com/photo-1580281657702-257584239a55?w=200&h=140&fit=crop",
  },
  {
    id: 4,
    name: "Vật tư tiêu hao",
    slug: "vat-tu-tieu-hao",
    count: 520,
    icon: "🩹",
    color: "#D97706",
    bg: "linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)",
    borderColor: "#FCD34D",
    img: "https://images.unsplash.com/photo-1747987766141-9d1f2707dd6c?w=200&h=140&fit=crop",
  },
  {
    id: 5,
    name: "Thiết bị xét nghiệm",
    slug: "xet-nghiem",
    count: 132,
    icon: "🧪",
    color: "#0288D1",
    bg: "linear-gradient(135deg, #E1F5FE 0%, #B3E5FC 100%)",
    borderColor: "#81D4FA",
    img: "https://images.unsplash.com/photo-1768498950637-88d073faa491?w=200&h=140&fit=crop",
  },
  {
    id: 6,
    name: "Phục hồi chức năng",
    slug: "phuc-hoi",
    count: 78,
    icon: "🏥",
    color: "#388E3C",
    bg: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)",
    borderColor: "#A5D6A7",
    img: "https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?w=200&h=140&fit=crop",
  },
];

export function CategoriesSection() {
  return (
    <section
      id="products"
      className="py-14"
      style={{ backgroundColor: "#F8FAFD" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-1 rounded-full"
                style={{ backgroundColor: "#00897B" }}
              />
              <span
                className="text-teal-700 font-semibold"
                style={{
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Khám phá
              </span>
            </div>
            <h2
              className="text-gray-900"
              style={{
                fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                fontWeight: 800,
              }}
            >
              Danh Mục Sản Phẩm
            </h2>
            <p className="text-gray-500 mt-1" style={{ fontSize: "14px" }}>
              Hơn 1.200 sản phẩm từ các thương hiệu y tế hàng đầu thế giới
            </p>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-1.5 text-blue-600 hover:text-blue-800 transition-colors font-semibold"
            style={{ fontSize: "13px" }}
          >
            Xem tất cả <ArrowRight size={14} />
          </a>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href="#"
              className="group relative rounded-xl overflow-hidden border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ borderColor: cat.borderColor, background: cat.bg }}
            >
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{ height: "100px" }}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${cat.color}66 0%, transparent 60%)`,
                  }}
                />
                <div
                  className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-base"
                  style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
                >
                  {cat.icon}
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <p
                  className="font-semibold text-gray-800 leading-tight"
                  style={{ fontSize: "12px" }}
                >
                  {cat.name}
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <span
                    style={{
                      fontSize: "11px",
                      color: cat.color,
                      fontWeight: 600,
                    }}
                  >
                    {cat.count} sản phẩm
                  </span>
                  <ArrowRight
                    size={11}
                    style={{ color: cat.color }}
                    className="group-hover:translate-x-0.5 transition-transform"
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
