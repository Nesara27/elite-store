// src/app/api/debug/db/route.ts
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();
    // ping command for MongoDB
    const ping = await db.command({ ping: 1 });
    return NextResponse.json({ ok: true, ping });
  } catch (err: any) {
    console.error("DB ping error:", err);
    return NextResponse.json(
      { ok: false, error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
