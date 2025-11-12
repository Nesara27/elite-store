// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Do NOT attempt to parse req.json() here — the client sends no body.
    // Clear the auth cookie by setting an expired Set-Cookie header.
    const res = NextResponse.json({ ok: true });

    // Cookie attributes: Path=/, HttpOnly, SameSite=Lax
    // Max-Age=0 -> delete cookie
    const cookieParts = [
      `token=; Max-Age=0`,
      `Path=/`,
      `HttpOnly`,
      `SameSite=Lax`,
    ];
    // Add Secure in production
    if (process.env.NODE_ENV === "production") cookieParts.push("Secure");

    res.headers.set("Set-Cookie", cookieParts.join("; "));
    return res;
  } catch (err) {
    console.error("POST /api/auth/logout error:", err);
    return NextResponse.json({ ok: false, error: "Logout failed" }, { status: 500 });
  }
}
