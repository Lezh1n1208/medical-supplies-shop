import { QuoteRequestAdminService } from "@/services/quote-request.admin.service";
import { NextResponse } from "next/server";
import { handleError } from "../../handle-error";

export async function GET() {
  try {
    const quoteRequests = await QuoteRequestAdminService.getAll();
    return NextResponse.json({ quoteRequests });
  } catch (err: any) {
    return handleError(err);
  }
}