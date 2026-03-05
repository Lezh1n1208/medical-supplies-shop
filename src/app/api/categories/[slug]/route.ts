import { CategoryPublicService } from "@/services/category.public.service";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "../../handle-error";

type Params = { params: { slug: string } };

// GET /api/categories/:slug
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const category = await CategoryPublicService.getBySlug(params.slug);
    return NextResponse.json({ category });
  } catch (err: any) {
    // Supabase trả PGRST116 khi không tìm thấy row với .single()
    handleError(err);
  }
}
