import { supabaseAdmin } from "@/lib/supabase/admin";
import { assertNoError } from "@/lib/supabase/assert";
import { QuoteRequestSchema } from "@/schemas/quote-request.schema";
import { z } from "zod";

// Join thêm category name để admin dễ đọc
const QuoteRequestWithCategorySchema = QuoteRequestSchema.extend({
  categories: z
    .object({ name: z.string(), slug: z.string() })
    .nullable(),
});

export type QuoteRequestWithCategory = z.infer<
  typeof QuoteRequestWithCategorySchema
>;

export class QuoteRequestAdminService {
  static async getAll() {
    const { data, error } = await supabaseAdmin
      .from("quote_requests")
      .select("*, categories(name, slug)")
      .order("created_at", { ascending: false });

    assertNoError(error);
    return QuoteRequestWithCategorySchema.array().parse(data);
  }
}