import { handleError } from "@/app/api/handle-error";
import { ProductAdminService } from "@/services/product.admin.service";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/products/:id
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const product = await ProductAdminService.getById(id);
    return NextResponse.json({ product });
  } catch (err: any) {
    return handleError(err);
  }
}

// PATCH /api/admin/products/:id
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const formData = await req.formData();

    const raw: Record<string, unknown> = {};

    for (const [key, value] of formData.entries()) {
      if (key === "files") continue;
      if (value === "") continue;
      raw[key] = value;
    }

    if (raw.price !== undefined) raw.price = Number(raw.price);
    if (raw.sale_price !== undefined) raw.sale_price = Number(raw.sale_price);

    const files = formData
      .getAll("files")
      .filter((f): f is File => f instanceof File);

    const product = await ProductAdminService.update(id, raw, files);

    return NextResponse.json({ product });
  } catch (err: any) {
    return handleError(err);
  }
}

// DELETE /api/admin/products/:id
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await ProductAdminService.delete(id);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return handleError(err);
  }
}
