"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryApi } from "@/lib/api/category.admin.api";
import type { CreateCategory, UpdateCategory } from "@/schemas/category.schema";
import { queryKeys } from "@/lib/query/keys";
import { toast } from "sonner";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.admin.categories.all,
    queryFn: categoryApi.getAll,
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: queryKeys.admin.categories.detail(id),
    queryFn: () => categoryApi.getById(id),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      data,
      thumbnail,
    }: {
      data: CreateCategory;
      thumbnail?: File;
    }) => categoryApi.create(data, thumbnail),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.categories.all,
      });
      toast.success("Tạo danh mục thành công");
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Tạo danh mục thất bại");
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
      thumbnail,
    }: {
      id: string;
      data: UpdateCategory;
      thumbnail?: File;
    }) => categoryApi.update(id, data, thumbnail),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.categories.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.categories.detail(id),
      });
      toast.success("Cập nhật danh mục thành công");
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Cập nhật danh mục thất bại");
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoryApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.categories.all,
      });
      toast.success("Xóa danh mục thành công");
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Xóa danh mục thất bại");
    },
  });
}
