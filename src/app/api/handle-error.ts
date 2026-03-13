import { NextResponse } from "next/server";
import { AppError } from "@/lib/errors";
import { ZodError } from "zod";

export function handleError(err: unknown) {
  // Lỗi có cấu trúc từ service
  if (err instanceof AppError) {
    return NextResponse.json(
      { error: err.message, details: err.details },
      { status: err.status },
    );
  }

  // Zod parse thất bại (data từ client không hợp lệ)
  if (err instanceof ZodError) {
    const first = err.issues[0];
    const message = first?.message ?? "Dữ liệu không hợp lệ";

    return NextResponse.json(
      {
        error: message,
        details: err.issues,
      },
      { status: 422 },
    );
  }

  // Lỗi hoàn toàn không xác định
  console.error("[Unhandled API Error]", err);
  return NextResponse.json(
    { error: "Đã xảy ra lỗi, vui lòng thử lại" },
    { status: 500 },
  );
}
