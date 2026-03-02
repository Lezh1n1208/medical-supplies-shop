"use client";
import { useState } from "react";
import {
  Search,
  Phone,
  Mail,
  ChevronDown,
  Menu,
  X,
  ShoppingCart,
  MapPin,
  Clock,
  Heart,
} from "lucide-react";

const navLinks = [
  { label: "Trang chủ", href: "#", active: true },
  {
    label: "Sản phẩm",
    href: "#products",
    submenu: [
      "Thiết bị chẩn đoán",
      "Dụng cụ phẫu thuật",
      "Thiết bị ICU",
      "Vật tư tiêu hao",
      "Thiết bị xét nghiệm",
      "Phục hồi chức năng",
    ],
  },
  { label: "Dịch vụ", href: "#" },
  { label: "Giới thiệu", href: "#" },
  { label: "Tuyển dụng", href: "#" },
  { label: "Tin tức", href: "#" },
  { label: "Liên hệ", href: "#contact" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Topbar */}
      <div style={{ backgroundColor: "#0D2B6E" }}>
        <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between">
          <div className="hidden md:flex items-center gap-5">
            <a
              href="#"
              className="flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors"
            >
              <MapPin size={12} />
              <span style={{ fontSize: "11px" }}>
                Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội
              </span>
            </a>
            <div className="w-px h-3 bg-blue-700" />
            <a
              href="#"
              className="flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors"
            >
              <Clock size={12} />
              <span style={{ fontSize: "11px" }}>T2–T7: 8:00 – 17:30</span>
            </a>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <a
              href="mailto:info@medprovn.com"
              className="flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors"
            >
              <Mail size={12} />
              <span style={{ fontSize: "11px" }}>info@medprovn.com</span>
            </a>
            <div className="w-px h-3 bg-blue-700" />
            <a
              href="#"
              className="text-blue-200 hover:text-white transition-colors"
              style={{ fontSize: "11px" }}
            >
              Đăng nhập
            </a>
            <span className="text-blue-700" style={{ fontSize: "11px" }}>
              |
            </span>
            <a
              href="#"
              className="text-blue-200 hover:text-white transition-colors"
              style={{ fontSize: "11px" }}
            >
              Đăng ký
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #1565C0, #00897B)",
              }}
            >
              <span
                className="text-white font-black"
                style={{ fontSize: "14px" }}
              >
                M
              </span>
            </div>
            <div className="hidden sm:block">
              <div
                className="text-blue-900 leading-none"
                style={{ fontSize: "15px", fontWeight: 800 }}
              >
                MedPro
              </div>
              <div
                className="text-teal-600 leading-none mt-0.5"
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                }}
              >
                VIỆT NAM
              </div>
            </div>
          </a>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-auto">
            <div className="relative flex">
              <div className="flex-1 relative">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm, thiết bị y tế..."
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-300 border-r-0 
                    rounded-l-lg bg-gray-50 text-sm 
                    focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 
                    transition-all"
                  style={{ fontSize: "13px" }}
                />
              </div>
              <button
                className="px-4 text-white rounded-r-lg text-sm font-semibold flex-shrink-0 transition-all hover:opacity-90"
                style={{ backgroundColor: "#00897B", fontSize: "13px" }}
              >
                Tìm kiếm
              </button>
            </div>
          </div>

          {/* Hotline + actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:18001234"
              className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-all"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#1565C0" }}
              >
                <Phone size={13} className="text-white" />
              </div>
              <div>
                <p
                  style={{
                    fontSize: "9px",
                    color: "#6B7280",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Hotline 24/7
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#0D2B6E",
                    fontWeight: 700,
                  }}
                >
                  1800 1234
                </p>
              </div>
            </a>
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-all text-gray-500 hover:text-gray-700">
              <Heart size={18} />
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white flex items-center justify-center"
                style={{
                  backgroundColor: "#DC2626",
                  fontSize: "9px",
                  fontWeight: 700,
                }}
              >
                3
              </span>
            </button>
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-all text-gray-500 hover:text-gray-700">
              <ShoppingCart size={18} />
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white flex items-center justify-center"
                style={{
                  backgroundColor: "#1565C0",
                  fontSize: "9px",
                  fontWeight: 700,
                }}
              >
                5
              </span>
            </button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X size={20} className="text-gray-600" />
              ) : (
                <Menu size={20} className="text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className="hidden md:block" style={{ backgroundColor: "#1565C0" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center">
            {/* Categories button */}
            <button
              className="flex items-center gap-2 px-4 py-3 mr-2 font-semibold text-white transition-all"
              style={{ backgroundColor: "#00897B", fontSize: "13px" }}
            >
              <Menu size={14} />
              Danh mục sản phẩm
            </button>

            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => link.submenu && setOpenSubmenu(link.label)}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                <a
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-3 font-medium transition-all hover:bg-blue-600"
                  style={{
                    fontSize: "13px",
                    color: link.active ? "#93C5FD" : "#fff",
                    borderBottom: link.active
                      ? "2px solid #93C5FD"
                      : "2px solid transparent",
                  }}
                >
                  {link.label}
                  {link.submenu && (
                    <ChevronDown size={12} className="opacity-70" />
                  )}
                </a>
                {link.submenu && openSubmenu === link.label && (
                  <div className="absolute top-full left-0 w-52 bg-white rounded-b-xl shadow-xl border border-gray-100 z-50 py-2">
                    {link.submenu.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        style={{ fontSize: "13px" }}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-4 py-2.5 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium"
                style={{ fontSize: "14px" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-gray-200">
              <a
                href="tel:18001234"
                className="flex items-center gap-2 px-4 py-2 text-blue-700 font-semibold"
              >
                <Phone size={16} />
                <span>Hotline: 1800 1234</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
