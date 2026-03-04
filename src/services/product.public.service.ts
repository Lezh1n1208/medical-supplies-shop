import { createServerSupabase } from "@/lib/supabase/server";
import { ProductResponseSchema } from "@/schemas/product.schema";

export interface ProductFilters {
  search?: string;
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  priceType?: "FIXED" | "CONTACT";
  page?: number;
  limit?: number;
}

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
      .single();

    if (error) throw new Error(error.message);

    return ProductResponseSchema.parse(data);
  }

  static async list(filters: ProductFilters = {}) {
    const supabase = await createServerSupabase();

    const {
      search,
      categorySlug,
      minPrice,
      maxPrice,
      priceType,
      page = 1,
      limit = 12,
    } = filters;

    let query = supabase.from("products").select(
      `
        *,
        categories(name, slug),
        product_images(image_url, is_thumbnail)
      `,
      { count: "exact" },
    );

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

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw new Error(error.message);

    return {
      items: data?.map((p) => ProductResponseSchema.parse(p)) ?? [],
      total: count ?? 0,
      page,
      limit,
      totalPages: count ? Math.ceil(count / limit) : 0,
    };
  }
}
