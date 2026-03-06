import type {
  Category,
  CreateCategory,
  UpdateCategory,
} from "@/schemas/category.schema";

const BASE = "/api/admin/categories";

/**
 * Handle fetch response
 */
const handleResponse = async <T>(res: Response, key?: string): Promise<T> => {
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || "Request failed");
  }

  return key ? json[key] : json;
};

export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const res = await fetch(BASE);
    return handleResponse<Category[]>(res, "categories");
  },

  getById: async (id: string): Promise<Category> => {
    const res = await fetch(`${BASE}/${id}`);
    return handleResponse<Category>(res, "category");
  },

  create: async (data: CreateCategory, thumbnail?: File): Promise<Category> => {
    const formData = new FormData();
    appendFormData(formData, data);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    const res = await fetch(BASE, {
      method: "POST",
      body: formData,
    });

    return handleResponse<Category>(res, "category");
  },

  update: async (
    id: string,
    data: UpdateCategory,
    thumbnail?: File,
  ): Promise<Category> => {
    const formData = new FormData();
    appendFormData(formData, data);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    const res = await fetch(`${BASE}/${id}`, {
      method: "PATCH",
      body: formData,
    });

    return handleResponse<Category>(res, "category");
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${BASE}/${id}`, {
      method: "DELETE",
    });

    await handleResponse(res);
  },
};
