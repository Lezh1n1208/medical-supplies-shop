import { supabaseAdmin } from "@/lib/supabase/admin";
import { CategorySchema } from "@/schemas/category.schema";
import { z } from "zod";

/* ========================
   INPUT SCHEMAS
======================== */

export const CreateCategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  display_order: z.number(),
  thumbnail_url: z.string().nullable().optional(),
  thumbnail_public_id: z.string().nullable().optional(),
});

export const UpdateCategorySchema = CreateCategorySchema.partial();

/* ========================
   SERVICE
======================== */

export class CategoryAdminService {
  static async create(data: unknown) {
    const parsed = CreateCategorySchema.parse(data);

    const { data: result, error } = await supabaseAdmin
      .from("categories")
      .insert(parsed)
      .select()
      .single();

    if (error) throw new Error(error.message);

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

    if (error) throw new Error(error.message);

    return CategorySchema.parse(result);
  }

  static async delete(id: string) {
    const { error } = await supabaseAdmin
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);

    return { success: true };
  }
}
