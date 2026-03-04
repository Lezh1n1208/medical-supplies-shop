import { createServerSupabase } from "@/lib/supabase/server";
import { CategorySchema } from "@/schemas/category.schema";

export class CategoryPublicService {
  static async list() {
    const supabase = await createServerSupabase();

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data?.map((c) => CategorySchema.parse(c)) ?? [];
  }

  static async getBySlug(slug: string) {
    const supabase = await createServerSupabase();

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw new Error(error.message);

    return CategorySchema.parse(data);
  }
}
