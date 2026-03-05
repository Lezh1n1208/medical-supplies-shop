import { NextResponse } from "next/server";

export function handleError(err: any) {
  if (err.code === "VALIDATION_ERROR") {
    return NextResponse.json(
      { error: err.message, details: err.details },
      { status: 422 },
    );
  }
  if (err.name === "ZodError") {
    return NextResponse.json(
      { error: "Invalid data", details: err.errors },
      { status: 422 },
    );
  }
  return NextResponse.json({ error: err.message }, { status: 500 });
}
