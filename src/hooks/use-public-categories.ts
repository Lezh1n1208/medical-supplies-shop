"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { categoryPublicApi } from "@/lib/api/category.public.api";

export function usePublicCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: categoryPublicApi.getAll,
  });
}

export function usePublicCategory(slug: string) {
  return useQuery({
    queryKey: queryKeys.categories.detail(slug),
    queryFn: () => categoryPublicApi.getBySlug(slug),
    enabled: !!slug,
  });
}
