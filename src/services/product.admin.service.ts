import { supabaseAdmin } from "@/lib/supabase/admin";
import { assertNoError } from "@/lib/supabase/assert";
import {
  ProductSchema,
  CreateProductSchema,
  UpdateProductSchema,
} from "@/schemas/product.schema";
import { ProductImageAdminService } from "./product-image.admin.service";

/* ========================
   FILTERS
======================== */
export interface AdminProductFilters {
  search?: string;
  categoryId?: string;
  priceType?: "FIXED" | "CONTACT";
  sortBy?: "name" | "price" | "created_at" | "rating";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface AdminProductListResult {
  items: ReturnType<typeof ProductSchema.parse>[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/* ========================
   SERVICE
======================== */
export class ProductAdminService {
  static async list(
    filters: AdminProductFilters = {},
  ): Promise<AdminProductListResult> {
    const {
      search,
      categoryId,
      priceType,
      sortBy = "created_at",
      sortOrder = "desc",
      page = 1,
      limit = 20,
    } = filters;

    let query = supabaseAdmin.from("products").select("*", { count: "exact" });

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }
    if (categoryId) {
      query = query.eq("category_id", categoryId);
    }
    if (priceType) {
      query = query.eq("price_type", priceType);
    }

    query = query.order(sortBy, { ascending: sortOrder === "asc" });

    const from = (page - 1) * limit;
    query = query.range(from, from + limit - 1);

    const { data, error, count } = await query;
    assertNoError(error);

    return {
      items: ProductSchema.array().parse(data),
      total: count ?? 0,
      page,
      limit,
      totalPages: count ? Math.ceil(count / limit) : 0,
    };
  }

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

    if (files.length > 0) {
      try {
        await ProductImageAdminService.uploadMany(product.id, files);
      } catch (err) {
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
