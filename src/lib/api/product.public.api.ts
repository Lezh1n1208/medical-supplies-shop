import type {
  ProductFilters,
  ProductListItem,
  ProductDetail,
} from "@/services/product.public.service";

const BASE = "/api/products";

export interface ProductListResponse {
  items: ProductListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const productPublicApi = {
  list: async (filters: ProductFilters = {}): Promise<ProductListResponse> => {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    if (filters.categorySlug) params.set("categorySlug", filters.categorySlug);
    if (filters.priceType) params.set("priceType", filters.priceType);
    if (filters.minPrice != null)
      params.set("minPrice", String(filters.minPrice));
    if (filters.maxPrice != null)
      params.set("maxPrice", String(filters.maxPrice));
    if (filters.page != null) params.set("page", String(filters.page));
    if (filters.limit != null) params.set("limit", String(filters.limit));

    const res = await fetch(`${BASE}?${params.toString()}`);
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  getBySlug: async (slug: string): Promise<ProductDetail> => {
    const res = await fetch(`${BASE}/${slug}`);
    if (!res.ok) throw new Error((await res.json()).error);
    return (await res.json()).product;
  },
};
