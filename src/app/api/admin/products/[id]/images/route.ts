import { ProductImageAdminService } from "@/services/product-image.admin.service";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: { id: string } };

// POST /api/admin/products/:id/images — upload thêm ảnh (không replace)
export async function POST(req: NextRequest, { params }: Params) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    const images = await ProductImageAdminService.uploadMany(params.id, files);
    return NextResponse.json({ images }, { status: 201 });
  } catch (err: any) {
    if (err.code === "VALIDATION_ERROR") {
      return NextResponse.json(
        { error: err.message, details: err.details },
        { status: 422 },
      );
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
