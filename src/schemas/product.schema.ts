import { z } from "zod";

/* =========================
   ENUM
========================= */

export const PriceTypeEnum = z.enum(["FIXED", "CONTACT"]);

/* =========================
   BASE PRODUCT SCHEMA
========================= */

export const ProductBaseSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),

  slug: z.string().min(1).max(255),

  category_id: z.uuid().nullable().optional(),

  description: z.string().max(5000).nullable().optional(),

  price_type: PriceTypeEnum,

  price: z.number().nonnegative().nullable().optional(),

  sale_price: z.number().nonnegative().nullable().optional(),
});

/* =========================
   CREATE PRODUCT
========================= */

export const CreateProductSchema = ProductBaseSchema.superRefine(
  (data, ctx) => {
    if (data.price_type === "FIXED") {
      if (data.price == null) {
        ctx.addIssue({
          code: "custom",
          message: "Price is required when price_type is FIXED",
          path: ["price"],
        });
      }

      if (
        data.sale_price != null &&
        data.price != null &&
        data.sale_price > data.price
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Sale price must be less than or equal to price",
          path: ["sale_price"],
        });
      }
    }

    if (data.price_type === "CONTACT") {
      if (data.price != null) {
        ctx.addIssue({
          code: "custom",
          message: "Price must be null when price_type is CONTACT",
          path: ["price"],
        });
      }

      if (data.sale_price != null) {
        ctx.addIssue({
          code: "custom",
          message: "Sale price must be null when price_type is CONTACT",
          path: ["sale_price"],
        });
      }
    }
  },
);

export type CreateProduct = z.infer<typeof CreateProductSchema>;

/* =========================
   UPDATE PRODUCT
========================= */

export const UpdateProductSchema = CreateProductSchema.partial();

export type UpdateProduct = z.infer<typeof UpdateProductSchema>;

/* =========================
   PRODUCT RESPONSE
========================= */

export const ProductResponseSchema = ProductBaseSchema.extend({
  id: z.uuid(),
  rating: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ProductResponse = z.infer<typeof ProductResponseSchema>;
