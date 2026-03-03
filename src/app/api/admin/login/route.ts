import { NextResponse } from "next/server";
import { verifyAdmin, setAdminSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const valid = verifyAdmin(username, password);

  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  setAdminSession();

  return NextResponse.json({ success: true });
}
