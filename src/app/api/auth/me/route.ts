// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req: NextRequest) {
  try {
    // read token cookie
    const tokenCookie = req.cookies.get("token")?.value;
    if (!tokenCookie || !JWT_SECRET) {
      return NextResponse.json({ user: null });
    }

    // verify token
    let payload: any;
    try {
      payload = jwt.verify(tokenCookie, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ user: null });
    }

    // payload should contain sub/email etc.
    const userId = payload.sub;
    const email = payload.email;

    const db = await getDb();
    const users = db.collection("users");

    // try to find by id or email
    const query: any = {};
    if (userId) query._id = typeof userId === "string" ? userId : userId;
    if (Object.keys(query).length === 0 && email) query.email = email.toLowerCase();

    const userDoc = await users.findOne(query);

    if (!userDoc) {
      return NextResponse.json({ user: null });
    }

    // return safe user object (no password)
    const userSafe = {
      id: userDoc._id?.toString ? userDoc._id.toString() : userDoc._id,
      firstName: userDoc.firstName || "",
      lastName: userDoc.lastName || "",
      email: userDoc.email || "",
      gender: userDoc.gender || "",
    };

    return NextResponse.json({ user: userSafe });
  } catch (err) {
    console.error("GET /api/auth/me error:", err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
