"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { productPublicApi } from "@/lib/api/product.public.api";
import type { ProductFilters } from "@/services/product.public.service";

export function usePublicProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () => productPublicApi.list(filters),
  });
}

export function usePublicProduct(slug: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(slug),
    queryFn: () => productPublicApi.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useProductSuggest(q: string) {
  return useQuery({
    queryKey: queryKeys.products.suggest(q),
    queryFn: () => productPublicApi.suggest(q),
    enabled: q.trim().length >= 2, // chỉ fetch khi có ít nhất 2 ký tự
    staleTime: 1000 * 30,          // cache 30 giây — suggest không cần fresh liên tục
    placeholderData: [],           // không hiện loading, giữ data cũ
  });
}