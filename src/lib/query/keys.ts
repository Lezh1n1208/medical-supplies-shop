import type { ProductFilters } from "@/services/product.public.service";
import type { AdminProductFilters } from "@/services/product.admin.service";
import { QuoteRequestAdminFilters } from "@/services/quote-request.admin.service";

export const queryKeys = {
  categories: {
    all: ["categories"] as const,
    detail: (slug: string) => ["categories", slug] as const,
  },
  products: {
    all: ["products"] as const,
    list: (filters: ProductFilters) => ["products", "list", filters] as const,
    detail: (slug: string) => ["products", slug] as const,
    suggest: (q: string) => ["products", "suggest", q] as const,
  },

  admin: {
    categories: {
      all: ["admin", "categories"] as const,
      detail: (id: string) => ["admin", "categories", id] as const,
    },
    products: {
      all: ["admin", "products"] as const,
      list: (filters: AdminProductFilters) =>
        ["admin", "products", "list", filters] as const,
      detail: (id: string) => ["admin", "products", id] as const,
      images: (id: string) => ["admin", "products", id, "images"] as const,
    },
    quoteRequests: {
      all: ["admin", "quote-requests"] as const,
      list: (filters: QuoteRequestAdminFilters) =>
        ["admin", "quote-requests", "list", filters] as const,
    },
  },
} as const;
