import { handleError } from "@/app/api/handle-error";
import { ProductImageAdminService } from "@/services/product-image.admin.service";
import { NextRequest, NextResponse } from "next/server";

// POST /api/admin/products/:id/images — upload thêm ảnh (không replace)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    const images = await ProductImageAdminService.uploadMany(id, files);

    return NextResponse.json({ images }, { status: 201 });
  } catch (err: any) {
    if (err.code === "VALIDATION_ERROR") {
      return NextResponse.json(
        { error: err.message, details: err.details },
        { status: 422 },
      );
    }

    return handleError(err);
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const images = await ProductImageAdminService.getByProduct(id);
    return NextResponse.json({ images });
  } catch (err: any) {
    return handleError(err);
  }
}
