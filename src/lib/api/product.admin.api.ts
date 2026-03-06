import type {
  Product,
  CreateProduct,
  UpdateProduct,
} from "@/schemas/product.schema";

const BASE = "/api/admin/products";

export const productApi = {
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
};
