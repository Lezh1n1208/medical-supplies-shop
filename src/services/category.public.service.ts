import { createServerSupabase } from "@/lib/supabase/server";
import { CategorySchema } from "@/schemas/category.schema";

/* ========================
   HELPER
======================== */
function assertNoError(error: { message: string } | null): void {
  if (error) throw new Error(error.message);
}

/* ========================
   SERVICE
======================== */
export class CategoryPublicService {
  static async list() {
    const supabase = await createServerSupabase();

    const { data, error } = await supabase
      .from("categories")
      .select()
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    assertNoError(error);
    return CategorySchema.array().parse(data);
  }

  static async getBySlug(slug: string) {
    const supabase = await createServerSupabase();

    const { data, error } = await supabase
      .from("categories")
      .select()
      .eq("slug", slug)
      .single();

    assertNoError(error);
    return CategorySchema.parse(data);
  }
}
