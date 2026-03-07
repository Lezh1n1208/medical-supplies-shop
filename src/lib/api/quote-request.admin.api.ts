import type { QuoteRequestWithCategory } from "@/services/quote-request.admin.service";

export const quoteRequestAdminApi = {
  getAll: async (): Promise<QuoteRequestWithCategory[]> => {
    const res = await fetch("/api/admin/quote-requests");
    if (!res.ok) throw new Error((await res.json()).error);
    return (await res.json()).quoteRequests;
  },
};
