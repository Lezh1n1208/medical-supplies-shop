import { CategoryPublicService } from "@/services/category.public.service";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "../../handle-error";

// GET /api/categories/:slug
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const category = await CategoryPublicService.getBySlug(slug);

    return NextResponse.json({ category });
  } catch (err: any) {
    // Supabase trả PGRST116 khi không tìm thấy row với .single()
    return handleError(err);
  }
}
