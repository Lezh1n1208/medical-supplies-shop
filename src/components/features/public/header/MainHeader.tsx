"use client";
import Link from "next/link";
import Image from "next/image";
import { Search, Phone, Menu, X } from "lucide-react";

type Suggestion = {
  id: string;
  name: string;
  slug: string;
  price_type: string;
  price: number | null;
  sale_price: number | null;
};

interface MainHeaderProps {
  searchVal: string;
  onSearchChange: (val: string) => void;
  onSearchSubmit: (e: React.SyntheticEvent) => void;
  onSearchFocus: () => void;
  mobileOpen: boolean;
  onMobileToggle: () => void;
  suggestions: Suggestion[];
  onSuggestionClick: (slug: string) => void;
}

export function MainHeader({
  searchVal,
  onSearchChange,
  onSearchSubmit,
  onSearchFocus,
  mobileOpen,
  onMobileToggle,
  suggestions,
  onSuggestionClick,
}: Readonly<MainHeaderProps>) {
  return (
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
        <form
          onSubmit={onSearchSubmit}
          className="flex-1 max-w-xl mx-auto relative"
        >
          <div className="relative flex">
            <div className="flex-1 relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={onSearchFocus}
                placeholder="Tìm kiếm sản phẩm"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 border-r-0 rounded-l-lg bg-gray-50 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-4 text-white rounded-r-lg font-semibold text-[13px] transition-all hover:opacity-90"
              style={{ backgroundColor: "#00897B" }}
            >
              Tìm kiếm
            </button>
          </div>

          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 border-t-0 rounded-b-lg shadow-xl z-50 overflow-hidden">
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  type="button" // tránh trigger form submit
                  onClick={() => onSuggestionClick(s.slug)}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="text-gray-800 text-[13px] line-clamp-1">
                    {s.name}
                  </span>
                  <span className="text-gray-400 text-[11px] ml-4 flex-shrink-0">
                    {s.price_type === "CONTACT"
                      ? "Liên hệ"
                      : `${new Intl.NumberFormat("vi-VN").format(
                          s.sale_price ?? s.price ?? 0,
                        )}đ`}
                  </span>
                </button>
              ))}
            </div>
          )}
        </form>

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
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={onMobileToggle}
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
  );
}
