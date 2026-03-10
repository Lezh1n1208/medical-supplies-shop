import { supabaseAdmin } from "@/lib/supabase/admin";
import { assertNoError } from "@/lib/supabase/assert";
import { QuoteRequestSchema } from "@/schemas/quote-request.schema";
import { z } from "zod";

const QuoteRequestWithCategorySchema = QuoteRequestSchema.extend({
  categories: z.object({ name: z.string(), slug: z.string() }).nullable(),
});

export type QuoteRequestWithCategory = z.infer<
  typeof QuoteRequestWithCategorySchema
>;

export interface QuoteRequestAdminFilters {
  search?: string;
  page?: number;
  limit?: number;
}

export interface QuoteRequestListResult {
  items: QuoteRequestWithCategory[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class QuoteRequestAdminService {
  static async list(
    filters: QuoteRequestAdminFilters = {},
  ): Promise<QuoteRequestListResult> {
    const { search, page = 1, limit = 20 } = filters;

    let query = supabaseAdmin
      .from("quote_requests")
      .select("*, categories(name, slug)", { count: "exact" })
      .order("created_at", { ascending: false });

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,phone.ilike.%${search}%`);
    }

    const from = (page - 1) * limit;
    query = query.range(from, from + limit - 1);

    const { data, error, count } = await query;
    assertNoError(error);

    return {
      items: QuoteRequestWithCategorySchema.array().parse(data),
      total: count ?? 0,
      page,
      limit,
      totalPages: count ? Math.ceil(count / limit) : 0,
    };
  }

  static async getAll() {
    const { data, error } = await supabaseAdmin
      .from("quote_requests")
      .select("*, categories(name, slug)")
      .order("created_at", { ascending: false });

    assertNoError(error);
    return QuoteRequestWithCategorySchema.array().parse(data);
  }
}
