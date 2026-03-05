import { supabaseAdmin } from "@/lib/supabase/admin";
import { assertNoError } from "@/lib/supabase/assert";
import {
  CategorySchema,
  CreateCategorySchema,
  UpdateCategorySchema,
} from "@/schemas/category.schema";

/* ========================
   SERVICE
======================== */
export class CategoryAdminService {
  static async getAll() {
    const { data, error } = await supabaseAdmin
      .from("categories")
      .select()
      .order("display_order", { ascending: true });

    assertNoError(error);
    return CategorySchema.array().parse(data);
  }

  static async getById(id: string) {
    const { data, error } = await supabaseAdmin
      .from("categories")
      .select()
      .eq("id", id)
      .single();

    assertNoError(error);
    return CategorySchema.parse(data);
  }

  static async create(data: unknown) {
    const parsed = CreateCategorySchema.parse(data);

    const { data: result, error } = await supabaseAdmin
      .from("categories")
      .insert(parsed)
      .select()
      .single();

    assertNoError(error);
    return CategorySchema.parse(result);
  }

  static async update(id: string, data: unknown) {
    const parsed = UpdateCategorySchema.parse(data);

    const { data: result, error } = await supabaseAdmin
      .from("categories")
      .update(parsed)
      .eq("id", id)
      .select()
      .single();

    assertNoError(error);
    return CategorySchema.parse(result);
  }

  static async delete(id: string) {
    const { error } = await supabaseAdmin
      .from("categories")
      .delete()
      .eq("id", id);

    assertNoError(error);
    return { success: true };
  }
}
