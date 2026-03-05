import { CategoryAdminService } from "@/services/category.admin.service";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "../../handle-error";

// GET /api/admin/categories
export async function GET() {
  try {
    const categories = await CategoryAdminService.getAll();
    return NextResponse.json({ categories });
  } catch (err: any) {
    return handleError(err);
  }
}

// POST /api/admin/categories
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const raw = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      display_order: formData.get("display_order")
        ? Number(formData.get("display_order"))
        : undefined,
    };

    const thumbnail = formData.get("thumbnail") as File | null;

    const category = await CategoryAdminService.create(
      raw,
      thumbnail ?? undefined,
    );
    return NextResponse.json({ category }, { status: 201 });
  } catch (err: any) {
    return handleError(err);
  }
}
