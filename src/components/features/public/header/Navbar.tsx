"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/constants/navigation";
import { usePublicCategories } from "@/hooks/use-public-categories";

interface NavbarProps {
  isScrolled: boolean;
}

export function Navbar({ isScrolled }: Readonly<NavbarProps>) {
  const pathname = usePathname();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const { data: categories = [] } = usePublicCategories();

  const sortedCategories = [...categories].sort(
    (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0),
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setCategoryOpen(false);
      }
    };

    if (categoryOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [categoryOpen]);

  return (
    <nav
      className="hidden md:block shadow-md"
      style={{
        backgroundColor: "#1565C0",
        marginTop: isScrolled
          ? `calc(-1 * var(--top-header-main-height, 104px))`
          : "0",
        transition: "margin-top 400ms ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          {/* Category Dropdown */}
          <div ref={categoryRef} className="relative">
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="flex items-center justify-between gap-2 px-4 py-3 mr-2 font-semibold text-white text-[13px] w-56 whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ backgroundColor: "#00897B" }}
            >
              <span className="flex items-center gap-2 min-w-0">
                <Menu size={14} />
                <span className="truncate">Danh mục sản phẩm</span>
              </span>
              <ChevronDown
                size={12}
                className={`transition-transform flex-shrink-0 ${
                  categoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown menu - liền mạch với button */}
            {categoryOpen && (
              <div
                className="absolute left-0 w-56 rounded-b-lg shadow-xl py-2 z-50"
                style={{ backgroundColor: "#00897B", top: "100%" }}
              >
                {sortedCategories.length === 0 ? (
                  <div className="px-4 py-2 text-white text-sm opacity-80 whitespace-nowrap">
                    Không có danh mục
                  </div>
                ) : (
                  sortedCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/san-pham?categorySlug=${cat.slug}`}
                      onClick={() => setCategoryOpen(false)}
                      className="flex items-center px-4 py-2.5 text-white text-[13px] hover:opacity-80 transition-opacity whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {cat.name}
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center px-4 py-3 font-medium text-[13px]"
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
  );
}
