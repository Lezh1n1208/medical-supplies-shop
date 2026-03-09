"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "./TopBar";
import { MainHeader } from "./MainHeader";
import { Navbar } from "./Navbar";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // ===== ResizeObserver for header height =====
  const topHeaderRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      const topHeaderHeight = topHeaderRef.current
        ? Math.ceil(topHeaderRef.current.getBoundingClientRect().height)
        : 104;

      const navbarHeight = navbarRef.current
        ? Math.ceil(navbarRef.current.getBoundingClientRect().height)
        : 48;

      const totalHeight = topHeaderHeight + navbarHeight;

      // Tổng chiều cao cho spacer
      document.documentElement.style.setProperty(
        "--top-header-height",
        `${totalHeight}px`,
      );

      // Chiều cao Top + Main Header để Navbar dịch lên đúng vị trí
      document.documentElement.style.setProperty(
        "--top-header-main-height",
        `${topHeaderHeight}px`,
      );
    };

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

      // Close mobile menu when scrolling
      if (mobileOpen && currentScrollY - lastScrollY > 1) {
        setMobileOpen(false);
      }

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
  }, [mobileOpen]);

  // ===== Search =====
  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const value = searchVal.trim();

    if (value) {
      router.push(`/products?search=${encodeURIComponent(value)}`);
    }
  };

  // ===== Render =====
  return (
    <>
      {/* Header Wrapper */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Top + Main Header - Ẩn khi scroll */}
        <div
          ref={topHeaderRef}
          className="bg-white"
          style={{
            transform: isScrolled
              ? `translateY(calc(-1 * var(--top-header-main-height, 104px)))`
              : "translateY(0)",
            transition: "transform 400ms ease",
            willChange: "transform",
          }}
        >
          <TopBar />
          <MainHeader
            searchVal={searchVal}
            onSearchChange={setSearchVal}
            onSearchSubmit={handleSearch}
            mobileOpen={mobileOpen}
            onMobileToggle={() => setMobileOpen((v) => !v)}
          />
        </div>

        {/* Navbar - Ẩn theo chiều cao của Top + Main */}
        <div ref={navbarRef}>
          <Navbar isScrolled={isScrolled} />
        </div>
      </div>

      {/* Spacer */}
      <div
        className="hidden md:block"
        style={{ height: "var(--top-header-height)" }}
      />
      <div
        className="md:hidden"
        style={{ height: "var(--top-header-height)" }}
      />

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
