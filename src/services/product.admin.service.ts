import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  ProductSchema,
  CreateProductSchema,
  UpdateProductSchema,
} from "@/schemas/product.schema";

/* ========================
   HELPER
======================== */
function assertNoError(error: { message: string } | null): void {
  if (error) throw new Error(error.message);
}

/* ========================
   SERVICE
======================== */
export class ProductAdminService {
  static async getAll() {
    const { data, error } = await supabaseAdmin
      .from("products")
      .select()
      .order("created_at", { ascending: false });

    assertNoError(error);
    return ProductSchema.array().parse(data);
  }

  static async getById(id: string) {
    const { data, error } = await supabaseAdmin
      .from("products")
      .select()
      .eq("id", id)
      .single();

    assertNoError(error);
    return ProductSchema.parse(data);
  }

  static async create(data: unknown) {
    const parsed = CreateProductSchema.parse(data);

    const { data: result, error } = await supabaseAdmin
      .from("products")
      .insert(parsed)
      .select()
      .single();

    assertNoError(error);
    return ProductSchema.parse(result);
  }

  static async update(id: string, data: unknown) {
    const parsed = UpdateProductSchema.parse(data);

    const { data: result, error } = await supabaseAdmin
      .from("products")
      .update(parsed)
      .eq("id", id)
      .select()
      .single();

    assertNoError(error);
    return ProductSchema.parse(result);
  }

  static async delete(id: string) {
    const { error } = await supabaseAdmin
      .from("products")
      .delete()
      .eq("id", id);

    assertNoError(error);
    return { success: true };
  }
}
