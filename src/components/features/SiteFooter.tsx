import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Youtube,
  Linkedin,
  ArrowRight,
  Shield,
  Award,
  CheckCircle,
} from "lucide-react";

const productLinks = [
  "Thiết bị chẩn đoán",
  "Dụng cụ phẫu thuật",
  "Thiết bị ICU & Hồi sức",
  "Vật tư tiêu hao",
  "Thiết bị xét nghiệm",
  "Phục hồi chức năng",
];

const serviceLinks = [
  "Tư vấn & Lập dự toán",
  "Cung cấp thiết bị y tế",
  "Lắp đặt & Vận hành",
  "Bảo trì định kỳ",
  "Hỗ trợ đấu thầu",
  "Đào tạo người dùng",
];

const companyLinks = [
  "Giới thiệu công ty",
  "Chứng nhận & Giải thưởng",
  "Đối tác thương hiệu",
  "Tin tức & Blog",
  "Tuyển dụng",
  "Liên hệ",
];

export function SiteFooter() {
  return (
    <footer>
      {/* Main footer */}
      <div style={{ backgroundColor: "#0D2B6E" }}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #1565C0, #00897B)",
                  }}
                >
                  <span
                    className="text-white font-black"
                    style={{ fontSize: "16px" }}
                  >
                    M
                  </span>
                </div>
                <div>
                  <div
                    className="text-white leading-none"
                    style={{ fontSize: "16px", fontWeight: 800 }}
                  >
                    MedPro
                  </div>
                  <div
                    className="text-teal-400 leading-none mt-0.5"
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                    }}
                  >
                    VIỆT NAM
                  </div>
                </div>
              </div>
              <p
                className="text-blue-200 mb-5"
                style={{ fontSize: "13px", lineHeight: 1.8 }}
              >
                Đơn vị cung ứng thiết bị y tế chính hãng hàng đầu Việt Nam. Đối
                tác tin cậy của 500+ bệnh viện và phòng khám toàn quốc.
              </p>

              {/* Certifications */}
              <div className="flex gap-2 mb-5 flex-wrap">
                {[
                  { icon: <Shield size={12} />, text: "ISO 9001" },
                  { icon: <CheckCircle size={12} />, text: "CE Mark" },
                  { icon: <Award size={12} />, text: "Bộ Y tế" },
                ].map((cert, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 px-2 py-1 rounded-md border"
                    style={{
                      borderColor: "rgba(255,255,255,0.15)",
                      backgroundColor: "rgba(255,255,255,0.07)",
                      fontSize: "11px",
                      color: "#93C5FD",
                    }}
                  >
                    {cert.icon}
                    {cert.text}
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="flex gap-2">
                {[
                  { icon: <Facebook size={16} />, label: "Facebook" },
                  { icon: <Youtube size={16} />, label: "Youtube" },
                  { icon: <Linkedin size={16} />, label: "LinkedIn" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-300 hover:text-white hover:bg-blue-700 transition-all"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <h4
                className="text-white mb-4"
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Sản phẩm
              </h4>
              <ul className="space-y-2">
                {productLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors group"
                      style={{ fontSize: "13px" }}
                    >
                      <ArrowRight
                        size={11}
                        className="group-hover:translate-x-0.5 transition-transform opacity-50 group-hover:opacity-100"
                      />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4
                className="text-white mb-4"
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Dịch vụ
              </h4>
              <ul className="space-y-2">
                {serviceLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors group"
                      style={{ fontSize: "13px" }}
                    >
                      <ArrowRight
                        size={11}
                        className="group-hover:translate-x-0.5 transition-transform opacity-50 group-hover:opacity-100"
                      />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="text-white mb-4"
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Liên hệ
              </h4>
              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-2.5">
                  <MapPin
                    size={14}
                    className="text-teal-400 mt-0.5 flex-shrink-0"
                  />
                  <span
                    className="text-blue-200"
                    style={{ fontSize: "13px", lineHeight: 1.6 }}
                  >
                    Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội
                    <br />
                    28 Nguyễn Thị Minh Khai, Q.1, TP.HCM
                  </span>
                </div>
                <a
                  href="tel:18001234"
                  className="flex items-center gap-2.5 text-blue-200 hover:text-white transition-colors"
                >
                  <Phone size={14} className="text-teal-400 flex-shrink-0" />
                  <div>
                    <span
                      className="text-white font-bold"
                      style={{ fontSize: "15px" }}
                    >
                      1800 1234
                    </span>
                    <span
                      className="text-blue-300 ml-2"
                      style={{ fontSize: "11px" }}
                    >
                      (miễn phí 24/7)
                    </span>
                  </div>
                </a>
                <a
                  href="mailto:info@medprovn.com"
                  className="flex items-center gap-2.5 text-blue-200 hover:text-white transition-colors"
                >
                  <Mail size={14} className="text-teal-400 flex-shrink-0" />
                  <span style={{ fontSize: "13px" }}>info@medprovn.com</span>
                </a>
              </div>

              {/* Newsletter */}
              <div>
                <p
                  className="text-blue-300 mb-2"
                  style={{ fontSize: "12px", fontWeight: 600 }}
                >
                  Nhận tin tức mới nhất:
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Email của bạn..."
                    className="flex-1 px-3 py-2 rounded-l-lg bg-blue-900 border border-blue-700 text-white placeholder-blue-400 focus:outline-none focus:border-teal-500 text-xs"
                    style={{ fontSize: "12px" }}
                  />
                  <button
                    className="px-3 py-2 rounded-r-lg text-white text-xs font-semibold transition-all hover:opacity-90"
                    style={{ backgroundColor: "#00897B", fontSize: "12px" }}
                  >
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ backgroundColor: "#071B4E" }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-blue-400" style={{ fontSize: "12px" }}>
            © 2026 MedPro Việt Nam. Mọi quyền được bảo lưu.
          </p>
          <div className="flex gap-4">
            {[
              "Chính sách bảo mật",
              "Điều khoản sử dụng",
              "Chính sách đổi trả",
            ].map((link) => (
              <a
                key={link}
                href="#"
                className="text-blue-400 hover:text-white transition-colors"
                style={{ fontSize: "12px" }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
