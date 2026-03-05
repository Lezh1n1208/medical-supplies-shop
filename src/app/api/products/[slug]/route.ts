import { ProductPublicService } from "@/services/product.public.service";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "../../handle-error";

// GET /api/products/:slug
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const product = await ProductPublicService.getBySlug(slug);

    return NextResponse.json({ product });
  } catch (err: any) {
    return handleError(err);
  }
}
