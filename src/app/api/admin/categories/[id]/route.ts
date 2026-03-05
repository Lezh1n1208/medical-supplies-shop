import { handleError } from "@/app/api/handle-error";
import { CategoryAdminService } from "@/services/category.admin.service";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/categories/:id
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const category = await CategoryAdminService.getById(id);
    return NextResponse.json({ category });
  } catch (err: any) {
    return handleError(err);
  }
}

// PATCH /api/admin/categories/:id
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const formData = await req.formData();

    const raw: Record<string, unknown> = {};
    for (const [key, value] of formData.entries()) {
      if (key === "thumbnail") continue;
      if (value === "") continue;
      raw[key] = value;
    }

    if (raw.display_order !== undefined) {
      raw.display_order = Number(raw.display_order);
    }

    const thumbnail = formData.get("thumbnail") as File | null;

    const category = await CategoryAdminService.update(
      id,
      raw,
      thumbnail ?? undefined,
    );

    return NextResponse.json({ category });
  } catch (err: any) {
    return handleError(err);
  }
}

// DELETE /api/admin/categories/:id
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await CategoryAdminService.delete(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return handleError(err);
  }
}
