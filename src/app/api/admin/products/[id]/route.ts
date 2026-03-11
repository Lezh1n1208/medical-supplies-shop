import { handleError } from "@/app/api/handle-error";
import { ProductAdminService } from "@/services/product.admin.service";
import { NextRequest, NextResponse } from "next/server";

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

      if (key === "is_best_seller") {
        raw[key] = value === "true";
        continue;
      }
      if (key === "price" || key === "sale_price" || key === "rating") {
        raw[key] = Number(value);
        continue;
      }

      raw[key] = value;
    }

    const files = formData
      .getAll("files")
      .filter((f): f is File => f instanceof File);

    const product = await ProductAdminService.update(id, raw, files);
    return NextResponse.json({ product });
  } catch (err: any) {
    return handleError(err);
  }
}

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
