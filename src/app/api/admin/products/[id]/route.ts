import { handleError } from "@/app/api/handle-error";
import { ProductAdminService } from "@/services/product.admin.service";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: { id: string } };

// GET /api/admin/products/:id
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const product = await ProductAdminService.getById(params.id);
    return NextResponse.json({ product });
  } catch (err: any) {
    handleError(err);
  }
}

// PATCH /api/admin/products/:id
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const formData = await req.formData();

    // Chỉ lấy field nào client gửi lên (partial update)
    const raw: Record<string, unknown> = {};
    for (const [key, value] of formData.entries()) {
      if (key === "files") continue;
      if (value === "") continue; // bỏ qua field rỗng
      raw[key] = value;
    }

    // Ép kiểu số nếu có
    if (raw.price !== undefined) raw.price = Number(raw.price);
    if (raw.sale_price !== undefined) raw.sale_price = Number(raw.sale_price);

    const files = formData.getAll("files") as File[];

    const product = await ProductAdminService.update(params.id, raw, files);
    return NextResponse.json({ product });
  } catch (err: any) {
    handleError(err);
  }
}

// DELETE /api/admin/products/:id
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await ProductAdminService.delete(params.id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    handleError(err);
  }
}
