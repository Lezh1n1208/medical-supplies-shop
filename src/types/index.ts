// ─── Product ───────────────────────────────────────────────────────────────
export interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  oldPrice: string | null;
  img: string;
  badge: string;
  badgeColor: string;
  rating: number;
  reviews: number;
  tag: string;
  category: string;
}

// ─── Category ──────────────────────────────────────────────────────────────
export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  icon: string;
  color: string;
  bg: string;
  borderColor: string;
  img: string;
}

// ─── Brand ─────────────────────────────────────────────────────────────────
export interface Brand {
  name: string;
  abbr: string;
  color: string;
}

// ─── News ──────────────────────────────────────────────────────────────────
export interface NewsItem {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  img: string;
}

// ─── Testimonial ───────────────────────────────────────────────────────────
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  hospital: string;
  avatar: string;
  avatarColor: string;
  text: string;
  rating: number;
  tag: string;
}

// ─── Stat ──────────────────────────────────────────────────────────────────
export interface Stat {
  value: number;
  suffix: string;
  label: string;
  color: string;
}

// ─── Hero Slide ────────────────────────────────────────────────────────────
export interface HeroSlide {
  id: number;
  badge: string;
  headline: string;
  highlight: string;
  sub: string;
  cta1: string;
  cta2: string;
  img: string;
  accent: string;
}
