import { z } from "zod";

/* =========================
   ENUM
========================= */
export const PriceTypeEnum = z.enum(["FIXED", "CONTACT"]);

/* =========================
   BASE (internal, not exported)
   Dùng cho Create/Update — nullable fields là optional
   vì client có thể không gửi hoặc gửi null đều hợp lệ
========================= */
const ProductBaseSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  slug: z.string().min(1).max(255),
  category_id: z.uuid().nullable().optional(),
  description: z.string().max(5000).nullable().optional(),
  price_type: PriceTypeEnum,
  price: z.number().nonnegative().nullable().optional(),
  sale_price: z.number().nonnegative().nullable().optional(),
  is_best_seller: z.boolean().default(false),
});

/* =========================
   DB ROW
========================= */
export const ProductSchema = ProductBaseSchema.extend({
  id: z.uuid(),
  rating: z.number().min(0).max(5).default(0),
  created_at: z.string(),
  updated_at: z.string(),
});

/* =========================
   PRICE CONSTRAINT REFINEMENT
   Tách ra để tái sử dụng ở Create và Update
========================= */
type PriceInput = {
  price_type?: "FIXED" | "CONTACT";
  price?: number | null;
  sale_price?: number | null;
};

const refinePriceConstraints = (data: PriceInput, ctx: z.RefinementCtx) => {
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
};

/* =========================
   CREATE
========================= */
export const CreateProductSchema = ProductBaseSchema.superRefine(
  refinePriceConstraints,
);

/* =========================
   UPDATE
   Khi update, chỉ validate price constraint nếu price_type được gửi lên.
   Nếu chỉ update name thì không cần quan tâm price logic.
========================= */
export const UpdateProductSchema = ProductBaseSchema.partial().superRefine(
  (data, ctx) => {
    if (data.price_type != null) {
      refinePriceConstraints(data, ctx);
    }
  },
);

/* =========================
   TYPES
========================= */
export type PriceType = z.infer<typeof PriceTypeEnum>;
export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;
