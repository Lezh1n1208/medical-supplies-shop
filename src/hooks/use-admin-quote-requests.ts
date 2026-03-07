"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { quoteRequestAdminApi } from "@/lib/api/quote-request.admin.api";

export function useAdminQuoteRequests() {
  return useQuery({
    queryKey: queryKeys.admin.quoteRequests.all,
    queryFn: quoteRequestAdminApi.getAll,
  });
}
