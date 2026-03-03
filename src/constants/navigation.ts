export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "/products" },
  { label: "Dịch vụ", href: "/service" },
  { label: "Giới thiệu", href: "/about" },
  { label: "Tin tức", href: "/news" },
  { label: "Liên hệ", href: "/contact" },
];