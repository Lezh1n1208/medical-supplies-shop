import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  CreateProductSchema,
  UpdateProductSchema,
  ProductResponseSchema,
} from "@/schemas/product.schema";

export class ProductAdminService {
  static async create(data: unknown) {
    const parsed = CreateProductSchema.parse(data);

    const { data: result, error } = await supabaseAdmin
      .from("products")
      .insert(parsed)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return ProductResponseSchema.parse(result);
  }

  static async update(id: string, data: unknown) {
    const parsed = UpdateProductSchema.parse(data);

    const { data: result, error } = await supabaseAdmin
      .from("products")
      .update(parsed)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return ProductResponseSchema.parse(result);
  }

  static async delete(id: string) {
    const { error } = await supabaseAdmin
      .from("products")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);

    return { success: true };
  }
}
