import { CategoryPublicService } from "@/services/category.public.service";
import { NextResponse } from "next/server";
import { handleError } from "../handle-error";

// GET /api/categories
export async function GET() {
  try {
    const categories = await CategoryPublicService.list();
    return NextResponse.json({ categories });
  } catch (err: any) {
    handleError(err);
  }
}
