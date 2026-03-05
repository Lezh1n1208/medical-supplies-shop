import { z } from "zod";

/* =========================
   BASE (internal, not exported)
========================= */
const CategoryBaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1),
  display_order: z.number().int().nonnegative().default(0),
  thumbnail_url: z.string().nullable().optional(),
  thumbnail_public_id: z.string().nullable().optional(),
});

/* =========================
   DB ROW
========================= */
export const CategorySchema = CategoryBaseSchema.extend({
  id: z.uuid(),
  created_at: z.string(),
  updated_at: z.string(),
});

/* =========================
   CREATE / UPDATE
========================= */
export const CreateCategorySchema = CategoryBaseSchema;

export const UpdateCategorySchema = CategoryBaseSchema.partial();

/* =========================
   TYPES
========================= */
export type Category = z.infer<typeof CategorySchema>;
export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;
