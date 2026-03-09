import {
  Shield,
  Truck,
  Headphones,
  Award,
  FileCheck,
  Users,
} from "lucide-react";

const features = [
  {
    icon: <Shield size={24} />,
    title: "Hàng chính hãng 100%",
    desc: "Toàn bộ sản phẩm đều có đầy đủ CO/CQ, giấy chứng nhận xuất xứ và phiếu bảo hành từ nhà sản xuất.",
    color: "#1565C0",
    bg: "#EFF6FF",
  },
  {
    icon: <FileCheck size={24} />,
    title: "Đầy đủ CO/CQ & CE",
    desc: "Cung cấp đầy đủ hồ sơ pháp lý, chứng chỉ chất lượng ISO, CE Mark đáp ứng yêu cầu đấu thầu.",
    color: "#00897B",
    bg: "#ECFDF5",
  },
  {
    icon: <Truck size={24} />,
    title: "Giao hàng toàn quốc",
    desc: "Mạng lưới giao hàng 63 tỉnh thành. Giao nhanh trong 24–48h tại Hà Nội, TP.HCM và các tỉnh lân cận.",
    color: "#D97706",
    bg: "#FFFBEB",
  },
  {
    icon: <Headphones size={24} />,
    title: "Hỗ trợ kỹ thuật 24/7",
    desc: "Đội ngũ kỹ thuật viên được đào tạo bởi nhà sản xuất, sẵn sàng hỗ trợ lắp đặt, vận hành và bảo trì.",
    color: "#7B1FA2",
    bg: "#F5F3FF",
  },
  {
    icon: <Award size={24} />,
    title: "Thương hiệu uy tín 15 năm",
    desc: "Hơn 15 năm kinh nghiệm, được hàng trăm bệnh viện lớn tin tưởng lựa chọn là đối tác cung ứng chính thức.",
    color: "#DC2626",
    bg: "#FEF2F2",
  },
  {
    icon: <Users size={24} />,
    title: "Tư vấn chuyên sâu miễn phí",
    desc: "Chuyên gia tư vấn dày dạn kinh nghiệm, hỗ trợ lên danh sách thiết bị, tư vấn đấu thầu không tính phí.",
    color: "#0891B2",
    bg: "#ECFEFF",
  },
];

export function WhyUsSection() {
  return (
    <section className="py-16" style={{ backgroundColor: "#fff" }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-1 rounded-full"
                style={{ backgroundColor: "#1565C0" }}
              />
              <span
                className="font-semibold"
                style={{
                  fontSize: "12px",
                  color: "#1565C0",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Tại sao chọn chúng tôi
              </span>
            </div>
            <h2
              className="text-gray-900 mb-4"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              Đối Tác Tin Cậy Cho
              <br />
              <span style={{ color: "#1565C0" }}>Ngành Y Tế Việt Nam</span>
            </h2>
            <p
              className="text-gray-600 mb-8 max-w-lg"
              style={{ fontSize: "15px", lineHeight: 1.8 }}
            >
              Với kinh nghiệm hơn 15 năm trong ngành thiết bị y tế, MedPro Việt
              Nam tự hào là đơn vị cung ứng được Bộ Y tế chứng nhận, đối tác
              chính thức của hơn 50 thương hiệu y tế hàng đầu thế giới.
            </p>

            <a
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-white font-semibold transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: "#1565C0", fontSize: "14px" }}
            >
              Tìm hiểu thêm về chúng tôi
            </a>
          </div>

          {/* Right: Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feat, i) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                className="rounded-xl p-4 border-2 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-default"
                style={{
                  backgroundColor: feat.bg,
                  borderColor: feat.color + "25",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    backgroundColor: feat.color + "20",
                    color: feat.color,
                  }}
                >
                  {feat.icon}
                </div>
                <p
                  className="font-semibold text-gray-800 mb-1.5"
                  style={{ fontSize: "13px" }}
                >
                  {feat.title}
                </p>
                <p
                  className="text-gray-500"
                  style={{ fontSize: "12px", lineHeight: 1.6 }}
                >
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
