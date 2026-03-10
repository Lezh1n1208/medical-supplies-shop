"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { quoteRequestAdminApi } from "@/lib/api/quote-request.admin.api";
import type { QuoteRequestAdminFilters } from "@/services/quote-request.admin.service";

export function useAdminQuoteRequests(filters: QuoteRequestAdminFilters = {}) {
  return useQuery({
    queryKey: queryKeys.admin.quoteRequests.list(filters),
    queryFn: () => quoteRequestAdminApi.list(filters),
  });
}
