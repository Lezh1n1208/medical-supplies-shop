import {
  ProductPublicService,
  ProductFilters,
} from "@/services/product.public.service";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "../handle-error";

// GET /api/products?search=&categorySlug=&minPrice=&maxPrice=&priceType=&page=&limit=
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const filters: ProductFilters = {
      search: searchParams.get("search") ?? undefined,
      categorySlug: searchParams.get("categorySlug") ?? undefined,
      priceType:
        (searchParams.get("priceType") as ProductFilters["priceType"]) ??
        undefined,
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      isBestSeller: searchParams.get("isBestSeller") === "true" || undefined,
      onSale: searchParams.get("onSale") === "true" || undefined,
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 12,
    };

    const result = await ProductPublicService.list(filters);
    return NextResponse.json(result);
  } catch (err: any) {
    return handleError(err);
  }
}
