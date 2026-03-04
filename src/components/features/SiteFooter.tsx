import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

// ── Data ────────────────────────────────────────────────────────────────────

const productLinks = [
  { label: "Vật tư tiêu hao", href: "/san-pham?category=vat-tu-tieu-hao" },
  { label: "Vật tư chỉnh hình", href: "/san-pham?category=chinh-hinh" },
  { label: "Giấy in y tế", href: "/san-pham?category=giay-in" },
];

const serviceLinks = [
  { label: "Tư vấn & Báo giá", href: "/dich-vu" },
  { label: "Cung cấp vật tư y tế", href: "/dich-vu" },
  { label: "Hỗ trợ đấu thầu", href: "/dich-vu" },
  { label: "Giao hàng toàn quốc", href: "/dich-vu" },
];

// ── Zalo SVG ────────────────────────────────────────────
function ZaloIcon({ size = 16 }: { readonly size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.254 2 11.5c0 2.7 1.17 5.132 3.05 6.87L4 22l3.75-1.268C9.097 21.538 10.517 22 12 22c5.523 0 10-4.254 10-9.5S17.523 2 12 2zm-1.07 5.5h1.46v4.17l3.01-4.17h1.68l-3.2 4.33 3.38 4.67h-1.77l-3.1-4.35v4.35h-1.46V7.5zm-3.68.93c.39 0 .71.32.71.71v5.72a.71.71 0 01-1.42 0V9.14c0-.39.32-.71.71-.71z" />
    </svg>
  );
}

// ── Component ───────────────────────────────────────────

export function SiteFooter() {
  return (
    <footer>
      {/* ── Main Footer ─────────────────────────── */}
      <div style={{ backgroundColor: "#0D2B6E" }}>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
            {/* ── Brand ─────────────────────────── */}
            <div className="lg:col-span-4">
              <Link
                href="/"
                className="flex items-center gap-2.5 mb-4 w-fit group"
              >
                <Image
                  src="/logo.png"
                  alt="Ánh Dương Phát"
                  width={40}
                  height={40}
                  className="object-contain rounded-lg transition-transform duration-200 group-hover:scale-105"
                />
                <div className="flex flex-col leading-none">
                  <span
                    className="text-white font-black leading-tight"
                    style={{ fontSize: "15px", letterSpacing: "-0.01em" }}
                  >
                    Ánh Dương Phát
                  </span>
                  <span
                    className="font-semibold mt-0.5"
                    style={{
                      fontSize: "8.5px",
                      color: "#5EEAD4",
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                    }}
                  >
                    Vật tư y tế
                  </span>
                </div>
              </Link>

              <p
                className="text-blue-200 mb-6"
                style={{ fontSize: "13px", lineHeight: 1.8 }}
              >
                Chuyên cung cấp và phân phối vật tư – trang thiết bị y tế đạt chuẩn, nguồn gốc rõ ràng, giá hợp lý. Cam kết uy tín, chất lượng và phát triển bền vững.
              </p>

              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-blue-300 hover:text-white hover:bg-blue-700 transition-all"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>

                <a
                  href="https://zalo.me/0983498177"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-blue-300 hover:text-white hover:bg-blue-700 transition-all"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <ZaloIcon size={16} />
                </a>

                <a
                  href="https://maps.google.com/?q=135/9+KP+Tan+Phu+2+Tan+Dong+Hiep+Ho+Chi+Minh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-blue-300 hover:text-white hover:bg-blue-700 transition-all"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <MapPin size={16} />
                </a>
              </div>
            </div>

            {/* ── Sản phẩm ───────────────────────── */}
            <div className="lg:col-span-2">
              <h4 className="text-white mb-4 text-sm font-bold uppercase tracking-wider">
                Sản phẩm
              </h4>
              <ul className="space-y-2">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors group text-sm"
                    >
                      <ArrowRight
                        size={12}
                        className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Dịch vụ ───────────────────────── */}
            <div className="lg:col-span-2">
              <h4 className="text-white mb-4 text-sm font-bold uppercase tracking-wider">
                Dịch vụ
              </h4>
              <ul className="space-y-2">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors group text-sm"
                    >
                      <ArrowRight
                        size={12}
                        className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Liên hệ ───────────────────────── */}
            <div className="lg:col-span-4">
              <h4 className="text-white mb-4 text-sm font-bold uppercase tracking-wider">
                Liên hệ
              </h4>

              <div className="space-y-4 mb-6 text-sm text-blue-200">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={16}
                    className="text-teal-400 mt-1 flex-shrink-0"
                  />
                  <span>
                    135/9 KP Tân Phú 2, P. Tân Đông Hiệp,
                    <br />
                    TP. Hồ Chí Minh
                  </span>
                </div>

                <a
                  href="tel:0983498177"
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Phone size={16} className="text-teal-400 flex-shrink-0" />
                  <span className="font-semibold text-white">0983.498.177</span>
                </a>

                <a
                  href="mailto:huucong2510@gmail.com"
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Mail size={16} className="text-teal-400 flex-shrink-0" />
                  <span>huucong2510@gmail.com</span>
                </a>
              </div>

              {/* Newsletter */}
              <p className="text-blue-300 text-xs font-semibold mb-2">
                Nhận bảng giá mới nhất:
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email của bạn..."
                  className="flex-1 px-3 py-2 rounded-l-lg bg-blue-900 border border-blue-700 text-white placeholder-blue-400 focus:outline-none focus:border-teal-500 text-xs"
                />
                <button
                  className="px-4 py-2 rounded-r-lg text-white font-semibold hover:opacity-90 transition-all text-xs"
                  style={{ backgroundColor: "#00897B" }}
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ───────────────────────── */}
      <div style={{ backgroundColor: "#071B4E" }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-400">
          <p>
            © {new Date().getFullYear()} Công ty TNHH TM & SX Ánh Dương Phát ·
            Mã số thuế: 3702929454
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Điều khoản sử dụng
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Chính sách đổi trả
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
