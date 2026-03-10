import type {
  QuoteRequestWithCategory,
  QuoteRequestAdminFilters,
  QuoteRequestListResult,
} from "@/services/quote-request.admin.service";

export const quoteRequestAdminApi = {
  list: async (
    filters: QuoteRequestAdminFilters = {},
  ): Promise<QuoteRequestListResult> => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.page != null) params.set("page", String(filters.page));
    if (filters.limit != null) params.set("limit", String(filters.limit));
    const res = await fetch(`/api/admin/quote-requests?${params.toString()}`);
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  // Giữ lại cho dashboard
  getAll: async (): Promise<QuoteRequestWithCategory[]> => {
    const res = await fetch("/api/admin/quote-requests");
    if (!res.ok) throw new Error((await res.json()).error);
    return (await res.json()).items;
  },
};
