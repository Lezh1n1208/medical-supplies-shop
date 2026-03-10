import { Folder, LayoutDashboard, MessageSquare, Package } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export const PUBLIC_NAV_LINKS: NavLink[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "/san-pham" },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];

export const ADMIN_NAV_LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/danh-muc", label: "Danh mục", icon: Folder },
  { href: "/admin/san-pham", label: "Sản phẩm", icon: Package },
  { href: "/admin/yeu-cau-bao-gia", label: "Báo giá", icon: MessageSquare },
];
