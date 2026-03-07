import { z } from "zod";

/* =========================
   BASE
========================= */
const QuoteRequestBaseSchema = z.object({
  full_name: z.string().min(1, "Họ tên là bắt buộc").max(255),
  phone: z
    .string()
    .min(1, "Số điện thoại là bắt buộc")
    .regex(/^(0|\+84)\d{8,10}$/, "Số điện thoại không hợp lệ"),
  category_id: z.uuid().nullable().optional(),
});

/* =========================
   DB ROW
========================= */
export const QuoteRequestSchema = QuoteRequestBaseSchema.extend({
  id: z.uuid(),
  created_at: z.string(),
});

/* =========================
   CREATE
========================= */
export const CreateQuoteRequestSchema = QuoteRequestBaseSchema;

/* =========================
   TYPES
========================= */
export type QuoteRequest = z.infer<typeof QuoteRequestSchema>;
export type CreateQuoteRequest = z.infer<typeof CreateQuoteRequestSchema>;
