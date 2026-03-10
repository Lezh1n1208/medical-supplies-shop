import { ProductPublicService } from "@/services/product.public.service";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "../../handle-error";

// GET /api/products/suggest?q=bang+gac
export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";

    // Bỏ qua query quá ngắn
    if (q.length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    const suggestions = await ProductPublicService.suggest(q);
    return NextResponse.json({ suggestions });
  } catch (err: any) {
    return handleError(err);
  }
}
