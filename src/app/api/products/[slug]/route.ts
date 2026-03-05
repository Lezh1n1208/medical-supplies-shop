import { ProductPublicService } from "@/services/product.public.service";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "../../handle-error";

type Params = { params: { slug: string } };

// GET /api/products/:slug
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const product = await ProductPublicService.getBySlug(params.slug);
    return NextResponse.json({ product });
  } catch (err: any) {
    handleError(err);
  }
}
