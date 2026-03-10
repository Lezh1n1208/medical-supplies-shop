"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "./TopBar";
import { MainHeader } from "./MainHeader";
import { Navbar } from "./Navbar";
import { MobileMenu } from "./MobileMenu";
import { useProductSuggest } from "@/hooks/use-public-products";
import { useDebounce } from "@/hooks/use-debounce";

export function SiteHeader() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // Debounce 300ms trước khi fetch
  const debouncedSearch = useDebounce(searchVal, 300);
  const { data: suggestions } = useProductSuggest(debouncedSearch);

  // Đóng dropdown khi click ngoài
  const searchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);
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
      document.documentElement.style.setProperty(
        "--top-header-height",
        `${topHeaderHeight + navbarHeight}px`,
      );
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

  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === lastScrollY) return;
      if (mobileOpen && currentScrollY - lastScrollY > 1) setMobileOpen(false);
      if (!ticking) {
        requestAnimationFrame(() => {
          const diff = currentScrollY - lastScrollY;
          if (diff > 0 && currentScrollY > 80) setIsScrolled(true);
          else if (diff < 0) setIsScrolled(false);
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const value = searchVal.trim();
    if (value) {
      setSearchFocused(false);
      router.push(`/san-pham?search=${encodeURIComponent(value)}`);
    }
  };

  const showSuggestions =
    searchFocused &&
    debouncedSearch.trim().length >= 2 &&
    !!suggestions?.length;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
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
          {/* searchRef wrap quanh MainHeader để detect click ngoài */}
          <div ref={searchRef}>
            <MainHeader
              searchVal={searchVal}
              onSearchChange={setSearchVal}
              onSearchSubmit={handleSearch}
              onSearchFocus={() => setSearchFocused(true)}
              mobileOpen={mobileOpen}
              onMobileToggle={() => setMobileOpen((v) => !v)}
              // Suggestions dropdown
              suggestions={showSuggestions ? suggestions : []}
              onSuggestionClick={(slug) => {
                setSearchVal("");
                setSearchFocused(false);
                router.push(`/san-pham/${slug}`);
              }}
            />
          </div>
        </div>

        <div ref={navbarRef}>
          <Navbar isScrolled={isScrolled} />
        </div>
      </div>

      <div
        className="hidden md:block"
        style={{ height: "var(--top-header-height)" }}
      />
      <div
        className="md:hidden"
        style={{ height: "var(--top-header-height)" }}
      />

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
