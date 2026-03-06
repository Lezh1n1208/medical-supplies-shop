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