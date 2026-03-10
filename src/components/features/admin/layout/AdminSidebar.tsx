"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ADMIN_NAV_LINKS } from "@/constants/navigation";
import Image from "next/image";

function SidebarContent({
  collapsed,
  onNavigate,
}: Readonly<{
  collapsed: boolean;
  onNavigate?: () => void;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-white/10 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Ánh Dương Phát"
            width={44}
            height={44}
            className="object-contain rounded-lg"
            priority
          />
        </div>

        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-[13px] font-bold text-white leading-tight whitespace-nowrap">
              Ánh Dương Phát
            </p>
            <p className="text-[10px] text-white/40 whitespace-nowrap">
              Trang Admin
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {ADMIN_NAV_LINKS.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact
            ? pathname === href
            : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              title={collapsed ? label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150",
                isActive
                  ? "bg-teal-500/20 text-teal-400"
                  : "text-white/60 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon size={16} className="flex-shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-2 pb-4 border-t border-white/10 pt-3 flex-shrink-0">
        <button
          onClick={handleLogout}
          title={collapsed ? "Đăng xuất" : undefined}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-white/60 hover:bg-red-500/10 hover:text-red-400 transition-all w-full"
        >
          <LogOut size={16} className="flex-shrink-0" />
          {!collapsed && <span>Đăng xuất</span>}
        </button>
      </div>
    </>
  );
}

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        className={cn(
          "relative hidden lg:flex flex-col bg-[#0D1B2A] text-white transition-all duration-300 ease-in-out h-screen sticky top-0 flex-shrink-0",
          collapsed ? "w-16" : "w-56",
        )}
      >
        <SidebarContent collapsed={collapsed} />

        <button
          onClick={() => setCollapsed((v) => !v)}
          className="absolute -right-3 top-20 w-6 h-6 bg-[#0D1B2A] border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      {/* MOBILE TOPBAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[#0D1B2A] flex items-center px-4 gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="text-white/70 hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-teal-500 flex items-center justify-center">
            <Stethoscope size={12} className="text-white" />
          </div>

          <span className="text-[13px] font-bold text-white">
            Ánh Dương Phát
          </span>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <button
            aria-label="Close sidebar"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/50"
          />

          {/* Drawer */}
          <aside className="absolute left-0 top-0 h-full w-64 bg-[#0D1B2A] text-white flex flex-col">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            <SidebarContent
              collapsed={false}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}
    </>
  );
}
