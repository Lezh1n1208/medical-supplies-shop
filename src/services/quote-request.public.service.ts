// src/services/quote-request.public.service.ts
import { createServerSupabase } from "@/lib/supabase/server";
import { assertNoError } from "@/lib/supabase/assert";
import {
  CreateQuoteRequestSchema,
  QuoteRequestSchema,
} from "@/schemas/quote-request.schema";

export class QuoteRequestPublicService {
  static async create(data: unknown) {
    const parsed = CreateQuoteRequestSchema.parse(data);
    const supabase = await createServerSupabase();

    const { data: result, error } = await supabase.rpc(
      "insert_quote_request_with_limit",
      {
        p_full_name: parsed.full_name,
        p_phone: parsed.phone,
        p_category_id: parsed.category_id ?? null,
      },
    );

    assertNoError(error);
    return QuoteRequestSchema.parse(result);
  }
}
