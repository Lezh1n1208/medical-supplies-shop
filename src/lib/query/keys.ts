export const queryKeys = {
  categories: {
    all: ["categories"] as const,
    detail: (id: string) => ["categories", id] as const,
  },
  products: {
    all: ["products"] as const,
    list: (filters: Record<string, unknown>) =>
      ["products", "list", filters] as const,
    detail: (id: string) => ["products", id] as const,
  },
} as const;
