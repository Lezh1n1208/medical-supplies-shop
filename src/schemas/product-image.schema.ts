import { z } from "zod";

export const ProductImageSchema = z.object({
  id: z.uuid(),
  product_id: z.uuid(),
  image_url: z.url(),
  public_id: z.string(),
  width: z.number().nullable(),
  height: z.number().nullable(),
  format: z.string().nullable(),
  bytes: z.number().nullable(),
  is_thumbnail: z.boolean(),
  sort_order: z.number(),
  created_at: z.string(),
});

export type ProductImage = z.infer<typeof ProductImageSchema>;
