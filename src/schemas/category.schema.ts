import { z } from "zod";

export const CategorySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
  display_order: z.number(),
  thumbnail_url: z.string().nullable(),
  thumbnail_public_id: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;
