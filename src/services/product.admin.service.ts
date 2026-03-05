import { supabaseAdmin } from "@/lib/supabase/admin";
import { assertNoError } from "@/lib/supabase/assert";
import {
  ProductSchema,
  CreateProductSchema,
  UpdateProductSchema,
} from "@/schemas/product.schema";
import { ProductImageAdminService } from "./product-image.admin.service";

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

  static async create(data: unknown, files: File[] = []) {
    const parsed = CreateProductSchema.parse(data);

    const { data: result, error } = await supabaseAdmin
      .from("products")
      .insert(parsed)
      .select()
      .single();

    assertNoError(error);
    const product = ProductSchema.parse(result);

    // Upload image — rollback product if upload fail
    if (files.length > 0) {
      try {
        await ProductImageAdminService.uploadMany(product.id, files);
      } catch (err) {
        // Upload thất bại → xóa product vừa tạo để tránh orphan record
        await supabaseAdmin.from("products").delete().eq("id", product.id);
        throw err;
      }
    }

    return product;
  }

  static async update(id: string, data: unknown, files: File[] = []) {
    const parsed = UpdateProductSchema.parse(data);

    const { data: result, error } = await supabaseAdmin
      .from("products")
      .update(parsed)
      .eq("id", id)
      .select()
      .single();

    assertNoError(error);
    const product = ProductSchema.parse(result);

    if (files.length > 0) {
      await ProductImageAdminService.deleteAllByProduct(id);
      await ProductImageAdminService.uploadMany(id, files);
    }

    return product;
  }

  static async delete(id: string) {
    await ProductImageAdminService.deleteAllByProduct(id);
    const { error } = await supabaseAdmin
      .from("products")
      .delete()
      .eq("id", id);

    assertNoError(error);
    return { success: true };
  }
}
