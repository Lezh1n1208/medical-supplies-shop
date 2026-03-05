import { handleError } from "@/app/api/handle-error";
import { ProductImageAdminService } from "@/services/product-image.admin.service";
import { NextRequest, NextResponse } from "next/server";

// DELETE /api/admin/products/:id/images/:imageId
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> },
) {
  try {
    const { imageId } = await params;

    await ProductImageAdminService.deleteOne(imageId);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return handleError(err);
  }
}

// PATCH /api/admin/products/:id/images/:imageId — đổi thumbnail
export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> },
) {
  try {
    const { id, imageId } = await params;

    const image = await ProductImageAdminService.setThumbnail(id, imageId);

    return NextResponse.json({ image });
  } catch (err: any) {
    return handleError(err);
  }
}
