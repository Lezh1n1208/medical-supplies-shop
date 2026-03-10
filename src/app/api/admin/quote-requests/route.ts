import { QuoteRequestAdminService } from "@/services/quote-request.admin.service";
import type { QuoteRequestAdminFilters } from "@/services/quote-request.admin.service";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "../../handle-error";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const filters: QuoteRequestAdminFilters = {
      search: searchParams.get("search") ?? undefined,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    };

    const result = await QuoteRequestAdminService.list(filters);
    return NextResponse.json(result);
  } catch (err: any) {
    return handleError(err);
  }
}
