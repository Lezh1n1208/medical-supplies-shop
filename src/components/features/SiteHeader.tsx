"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Phone, Mail, Menu, X, MapPin, Clock } from "lucide-react";
import { NAV_LINKS } from "@/constants/navigation";
import Image from "next/image";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // ===== ResizeObserver =====
  const topHeaderRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Cần đo cả top header và navbar để tính tổng chiều cao
    const updateHeight = () => {
      const topHeaderHeight = topHeaderRef.current
        ? Math.round(topHeaderRef.current.getBoundingClientRect().height) + 1
        : 104; // mặc định desktop

      const navbarHeight = navbarRef.current
        ? Math.round(navbarRef.current.getBoundingClientRect().height)
        : 48; // mặc định desktop

      // Spacer cần tính đủ cả top header + navbar
      const totalHeight = topHeaderHeight + navbarHeight;
      document.documentElement.style.setProperty(
        "--top-header-height",
        `${totalHeight}px`,
      );
    };

    // Đợi một chút để DOM ổn định
    const timer = setTimeout(updateHeight, 100);

    const observer = new ResizeObserver(updateHeight);
    if (topHeaderRef.current) observer.observe(topHeaderRef.current);
    if (navbarRef.current) observer.observe(navbarRef.current);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // ===== Scroll handler =====
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === lastScrollY) return;

      if (!ticking) {
        requestAnimationFrame(() => {
          const diff = currentScrollY - lastScrollY;

          if (diff > 0 && currentScrollY > 80) {
            setIsScrolled(true);
          } else if (diff < 0) {
            setIsScrolled(false);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ===== WRAPPER CHO CẢ HEADER + NAVBAR ===== */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* ===== TOP HEADER (ẨN KHI SCROLL) ===== */}
        <div
          ref={topHeaderRef}
          className="bg-white"
          style={{
            transform: isScrolled
              ? "translateY(calc(-1 * var(--top-header-height)))"
              : "translateY(0)",
            transition: "transform 400ms ease",
            willChange: "transform",
          }}
        >
          {/* ================= TOPBAR ================= */}
          <div style={{ backgroundColor: "#0D2B6E" }}>
            <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="hidden md:flex items-center gap-1.5 text-blue-200 text-[11px]">
                  <MapPin size={12} />
                  Số 135/9, khu phố Tân Phú 2, Phường Tân Đông Hiệp, TP.HCM
                </span>
                <div className="hidden md:block w-px h-3 bg-blue-700" />
                <span className="flex items-center gap-1.5 text-blue-200 text-[11px]">
                  <Clock size={12} />
                  T2–T7: 8:00 – 17:30
                </span>
              </div>
              <a
                href="mailto:huucong2510@gmail.com"
                className="flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors text-[11px]"
              >
                <Mail size={12} />
                huucong2510@gmail.com
              </a>
            </div>
          </div>

          {/* ================= MAIN HEADER ================= */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-2.5 flex-shrink-0 group"
              >
                <div className="relative flex-shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Ánh Dương Phát"
                    width={40}
                    height={40}
                    className="object-contain rounded-lg transition-transform duration-200 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="hidden sm:flex flex-col leading-none">
                  <span
                    className="text-blue-900 font-black leading-tight"
                    style={{ fontSize: "15px", letterSpacing: "-0.01em" }}
                  >
                    Ánh Dương Phát
                  </span>
                  <span
                    className="font-semibold tracking-widest mt-0.5"
                    style={{
                      fontSize: "8.5px",
                      color: "#00897B",
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                    }}
                  >
                    Vật tư y tế
                  </span>
                </div>
              </Link>

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
                      placeholder="Tìm kiếm sản phẩm"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-300 border-r-0 rounded-l-lg bg-gray-50 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                    />
                  </div>
                  <button
                    className="px-4 text-white rounded-r-lg font-semibold text-[13px] transition-all hover:opacity-90"
                    style={{ backgroundColor: "#00897B" }}
                  >
                    Tìm kiếm
                  </button>
                </div>
              </div>

              {/* Hotline */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <a
                  href="tel:0983498177"
                  className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg border border-blue-200 hover:bg-blue-50 transition-all"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#1565C0" }}
                  >
                    <Phone size={13} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider">
                      Hotline 24/7
                    </p>
                    <p className="text-[13px] text-[#0D2B6E] font-bold">
                      0983 498 177
                    </p>
                  </div>
                </a>
                <button
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all"
                  onClick={() => setMobileOpen((v) => !v)}
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
        </div>

        {/* ===== NAVBAR - FIX: Luôn ngay dưới header, không dùng top ===== */}
        <nav
          ref={navbarRef}
          className="hidden md:block shadow-md"
          style={{
            backgroundColor: "#1565C0",
            transition: "transform 400ms ease",
            // FIX: Transform cùng với header thay vì dùng top
            transform: isScrolled
              ? "translateY(calc(-1 * var(--top-header-height)))"
              : "translateY(0)",
            marginTop: "0px",
          }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center">
              <Link
                href="/danh-muc"
                className="flex items-center gap-2 px-4 py-3 mr-2 font-semibold text-white text-[13px] transition-all hover:opacity-90"
                style={{ backgroundColor: "#00897B" }}
              >
                <Menu size={14} />
                Danh mục sản phẩm
              </Link>

              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center px-4 py-3 font-medium transition-colors duration-200 hover:bg-blue-500/20 hover:text-blue-200 text-[13px]"
                    style={{
                      color: isActive ? "#93C5FD" : "#fff",
                      borderBottom: isActive
                        ? "2px solid #93C5FD"
                        : "2px solid transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>

      {/* ===== SPACER ===== */}
      <div
        className="hidden md:block"
        style={{
          height: "var(--top-header-height)",
          margin: 0,
          padding: 0,
        }}
      />

      {/* Mobile spacer */}
      <div
        className="md:hidden"
        style={{
          height: "var(--top-header-height)",
          margin: 0,
          padding: 0,
        }}
      />

      {/* ===== MOBILE MENU ===== */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-x-0 z-40 bg-white border-t border-gray-200 shadow-lg"
          style={{
            top: "var(--top-header-height)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2.5 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium text-[14px]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-200">
              <a
                href="tel:0983498177"
                className="flex items-center gap-2 px-4 py-2 text-blue-700 font-semibold"
              >
                <Phone size={16} />
                <span>Hotline: 0983 498 177</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
