import { cookies } from "next/headers";
import crypto from "node:crypto";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
const ADMIN_SECRET = process.env.ADMIN_SECRET!;

const COOKIE_NAME = "admin_session";

export function verifyAdmin(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

function sign(value: string) {
  return crypto.createHmac("sha256", ADMIN_SECRET).update(value).digest("hex");
}

export async function setAdminSession() {
  const payload = "admin";
  const signature = sign(payload);

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, `${payload}.${signature}`, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 4,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function verifyAdminSession(cookieValue?: string) {
  if (!cookieValue) return false;

  const [payload, signature] = cookieValue.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);

  return signature === expected;
}
