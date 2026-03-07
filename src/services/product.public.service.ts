import { assertNoError } from "@/lib/supabase/assert";
import { createServerSupabase } from "@/lib/supabase/server";
import { ProductSchema } from "@/schemas/product.schema";
import { z } from "zod";

/* ========================
   RESPONSE SCHEMAS (view-specific, not part of DB schema)
======================== */
const ProductCategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
});

const ProductImageItemSchema = z.object({
  image_url: z.url(),
  is_thumbnail: z.boolean(),
  sort_order: z.number().int().nonnegative(),
});

export const ProductListItemSchema = ProductSchema.extend({
  categories: ProductCategorySchema.nullable(),
  product_images: ProductImageItemSchema.omit({ sort_order: true }).array(),
});

export const ProductDetailSchema = ProductSchema.extend({
  categories: ProductCategorySchema.nullable(),
  product_images: ProductImageItemSchema.array(),
});

export type ProductListItem = z.infer<typeof ProductListItemSchema>;
export type ProductDetail = z.infer<typeof ProductDetailSchema>;

/* ========================
   FILTERS
======================== */
export interface ProductFilters {
  search?: string;
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  priceType?: "FIXED" | "CONTACT";
  isBestSeller?: boolean;
  onSale?: boolean;
  page?: number;
  limit?: number;
}

/* ========================
   SERVICE
======================== */
export class ProductPublicService {
  static async getBySlug(slug: string) {
    const supabase = await createServerSupabase();

    const { data, error } = await supabase
      .from("products")
      .select(
        `
      *,
      categories(name, slug),
      product_images(image_url, is_thumbnail, sort_order)
    `,
      )
      .eq("slug", slug)
      .order("sort_order", {
        referencedTable: "product_images",
        ascending: true,
      })
      .single();

    assertNoError(error);
    return ProductDetailSchema.parse(data);
  }

  static async list(filters: ProductFilters = {}) {
    const supabase = await createServerSupabase();

    const {
      search,
      categorySlug,
      minPrice,
      maxPrice,
      priceType,
      isBestSeller,
      onSale,
      page = 1,
      limit = 12,
    } = filters;

    // Dùng !inner khi filter theo categorySlug để Supabase
    // áp đúng điều kiện WHERE trên bảng join.
    // Nếu không có filter, dùng left join bình thường để không loại
    // sản phẩm chưa có category.
    const categoryJoin = categorySlug
      ? "categories!inner(name, slug)"
      : "categories(name, slug)";

    let query = supabase
      .from("products")
      .select(`*, ${categoryJoin}, product_images(image_url, is_thumbnail)`, {
        count: "exact",
      });

    if (search) {
      query = query.textSearch("search_vector", search);
    }

    if (categorySlug) {
      query = query.eq("categories.slug", categorySlug);
    }

    if (priceType) {
      query = query.eq("price_type", priceType);
    }

    if (minPrice != null) {
      query = query.gte("price", minPrice);
    }

    if (maxPrice != null) {
      query = query.lte("price", maxPrice);
    }

    if (isBestSeller) {
      query = query.eq("is_best_seller", true);
    }
    if (onSale) {
      query = query.not("sale_price", "is", null);
    }

    query = query.order("sort_order", {
      referencedTable: "product_images",
      ascending: true,
    });

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    assertNoError(error);

    return {
      items: ProductListItemSchema.array().parse(data),
      total: count ?? 0,
      page,
      limit,
      totalPages: count ? Math.ceil(count / limit) : 0,
    };
  }
}
