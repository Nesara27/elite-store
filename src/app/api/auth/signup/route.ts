// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";

type Body = {
  firstName: string;
  lastName?: string;
  gender?: string;
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: Body = await req.json();
    const { firstName, lastName, gender, email, password } = body;

    if (!firstName || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const db = await getDb();
    const users = db.collection("users");

    const exists = await users.findOne({ email: email.toLowerCase() });
    if (exists) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const userDoc = {
      firstName,
      lastName: lastName || "",
      gender: gender || "",
      email: email.toLowerCase(),
      password: hashed,
      createdAt: new Date(),
    };

    await users.insertOne(userDoc);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
