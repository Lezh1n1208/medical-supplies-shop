"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/constants/navigation";
import { CategoryDropdown } from "./CategoryDropdown";

interface NavbarProps {
  isScrolled: boolean;
}

export function Navbar({ isScrolled }: Readonly<NavbarProps>) {
  const pathname = usePathname();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

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
              className="flex items-center gap-2 px-4 py-3 mr-2 font-semibold text-white text-[13px]"
              style={{ backgroundColor: "#00897B" }}
            >
              <Menu size={14} />
              Danh mục sản phẩm
              <ChevronDown
                size={12}
                className={`transition-transform ${
                  categoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <CategoryDropdown
              isOpen={categoryOpen}
              onClose={() => setCategoryOpen(false)}
            />
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
