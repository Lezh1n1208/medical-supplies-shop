import { ProductImage } from "@/schemas/product-image.schema";
import type {
  Product,
  CreateProduct,
  UpdateProduct,
} from "@/schemas/product.schema";
import type {
  AdminProductFilters,
  AdminProductListResult,
} from "@/services/product.admin.service";
import { appendFormData } from "./append";

const BASE = "/api/admin/products";

export const productApi = {
  list: async (
    filters: AdminProductFilters = {},
  ): Promise<AdminProductListResult> => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.categoryId) params.set("categoryId", filters.categoryId);
    if (filters.priceType) params.set("priceType", filters.priceType);
    if (filters.sortBy) params.set("sortBy", filters.sortBy);
    if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);
    if (filters.page != null) params.set("page", String(filters.page));
    if (filters.limit != null) params.set("limit", String(filters.limit));
    const res = await fetch(`${BASE}?${params.toString()}`);
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  getAll: async (): Promise<Product[]> => {
    const res = await fetch(BASE);
    if (!res.ok) throw new Error((await res.json()).error);
    return (await res.json()).products;
  },

  getById: async (id: string): Promise<Product> => {
    const res = await fetch(`${BASE}/${id}`);
    if (!res.ok) throw new Error((await res.json()).error);
    return (await res.json()).product;
  },

  create: async (data: CreateProduct, files?: File[]): Promise<Product> => {
    const formData = new FormData();
    appendFormData(formData, data);
    files?.forEach((f) => formData.append("files", f));
    const res = await fetch(BASE, { method: "POST", body: formData });
    if (!res.ok) throw new Error((await res.json()).error);
    return (await res.json()).product;
  },

  update: async (
    id: string,
    data: UpdateProduct,
    files?: File[],
  ): Promise<Product> => {
    const formData = new FormData();
    appendFormData(formData, data);
    files?.forEach((f) => formData.append("files", f));
    const res = await fetch(`${BASE}/${id}`, {
      method: "PATCH",
      body: formData,
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return (await res.json()).product;
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error((await res.json()).error);
  },
  getImages: async (productId: string): Promise<ProductImage[]> => {
    const res = await fetch(`${BASE}/${productId}/images`);
    if (!res.ok) throw new Error((await res.json()).error);
    return (await res.json()).images;
  },

  deleteImage: async (productId: string, imageId: string): Promise<void> => {
    const res = await fetch(`${BASE}/${productId}/images/${imageId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error((await res.json()).error);
  },

  setThumbnail: async (
    productId: string,
    imageId: string,
  ): Promise<ProductImage> => {
    const res = await fetch(`${BASE}/${productId}/images/${imageId}`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return (await res.json()).image;
  },
};
