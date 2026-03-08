"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { productApi } from "@/lib/api/product.admin.api";
import type { CreateProduct, UpdateProduct } from "@/schemas/product.schema";
import { toast } from "sonner";

export function useProducts() {
  return useQuery({
    queryKey: queryKeys.admin.products.all,
    queryFn: productApi.getAll,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.admin.products.detail(id),
    queryFn: () => productApi.getById(id),
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, files }: { data: CreateProduct; files?: File[] }) =>
      productApi.create(data, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.products.all });
      toast.success("Tạo sản phẩm thành công");
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Tạo sản phẩm thất bại");
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
      files,
    }: {
      id: string;
      data: UpdateProduct;
      files?: File[];
    }) => productApi.update(id, data, files),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.products.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.products.detail(id),
      });
      toast.success("Cập nhật sản phẩm thành công");
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Cập nhật sản phẩm thất bại");
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.products.all });
      toast.success("Xóa sản phẩm thành công");
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Xóa sản phẩm thất bại");
    },
  });
}
