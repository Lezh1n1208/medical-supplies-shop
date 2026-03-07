import { QuoteRequestPublicService } from "@/services/quote-request.public.service";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "../handle-error";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await QuoteRequestPublicService.create(body);
    return NextResponse.json({ quoteRequest: result }, { status: 201 });
  } catch (err: any) {
    return handleError(err);
  }
}
