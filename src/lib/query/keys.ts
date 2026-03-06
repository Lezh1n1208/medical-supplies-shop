import type { ProductFilters } from "@/services/product.public.service";

export const queryKeys = {
  // Public
  categories: {
    all: ["categories"] as const,
    detail: (slug: string) => ["categories", slug] as const,
  },
  products: {
    all: ["products"] as const,
    list: (filters: ProductFilters) => ["products", "list", filters] as const,
    detail: (slug: string) => ["products", slug] as const,
  },

  // Admin — tách riêng để tránh cache collision
  admin: {
    categories: {
      all: ["admin", "categories"] as const,
      detail: (id: string) => ["admin", "categories", id] as const,
    },
    products: {
      all: ["admin", "products"] as const,
      detail: (id: string) => ["admin", "products", id] as const,
    },
  },
} as const;
