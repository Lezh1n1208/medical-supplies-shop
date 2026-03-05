// src/app/api/admin/products/[id]/images/[imageId]/route.ts
import { handleError } from "@/app/api/handle-error";
import { ProductImageAdminService } from "@/services/product-image.admin.service";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: { id: string; imageId: string } };

// DELETE /api/admin/products/:id/images/:imageId
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await ProductImageAdminService.deleteOne(params.imageId);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    handleError(err);
  }
}

// PATCH /api/admin/products/:id/images/:imageId — đổi thumbnail
export async function PATCH(_req: NextRequest, { params }: Params) {
  try {
    const image = await ProductImageAdminService.setThumbnail(
      params.id,
      params.imageId,
    );
    return NextResponse.json({ image });
  } catch (err: any) {
    handleError(err);
  }
}
