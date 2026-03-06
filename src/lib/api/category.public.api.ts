import type { Category } from "@/schemas/category.schema";

const BASE = "/api/categories";

export const categoryPublicApi = {
  getAll: async (): Promise<Category[]> => {
    const res = await fetch(BASE);
    if (!res.ok) throw new Error((await res.json()).error);
    return (await res.json()).categories;
  },

  getBySlug: async (slug: string): Promise<Category> => {
    const res = await fetch(`${BASE}/${slug}`);
    if (!res.ok) throw new Error((await res.json()).error);
    return (await res.json()).category;
  },
};
