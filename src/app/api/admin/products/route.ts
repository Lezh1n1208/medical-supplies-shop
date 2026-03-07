import { ProductAdminService } from "@/services/product.admin.service";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "../../handle-error";

export async function GET() {
  try {
    const products = await ProductAdminService.getAll();
    return NextResponse.json({ products });
  } catch (err: any) {
    return handleError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const raw = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      category_id: formData.get("category_id") ?? undefined,
      description: formData.get("description") ?? undefined,
      price_type: formData.get("price_type"),
      price: formData.get("price") ? Number(formData.get("price")) : undefined,
      sale_price: formData.get("sale_price")
        ? Number(formData.get("sale_price"))
        : undefined,
      is_best_seller: formData.get("is_best_seller") === "true", // 👈
    };

    const files = formData.getAll("files") as File[];
    const product = await ProductAdminService.create(raw, files);
    return NextResponse.json({ product }, { status: 201 });
  } catch (err: any) {
    return handleError(err);
  }
}
