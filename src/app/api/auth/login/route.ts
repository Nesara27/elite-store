// // app/api/auth/login/route.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { getDb } from "@/lib/mongodb";

// const JWT_SECRET = process.env.JWT_SECRET;
// const JWT_EXPIRES = process.env.JWT_EXPIRES || "7d";

// type Body = {
//   email?: string;
//   password?: string;
// };

// export async function POST(req: NextRequest) {
//   try {
//     const body: Body = await req.json();
//     const { email, password } = body;

//     if (!email || !password) {
//       return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
//     }

//     const db = await getDb();
//     const users = db.collection("users");

//     const user = await users.findOne({ email: email.toLowerCase() });
//     if (!user) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     const ok = await bcrypt.compare(password, user.password);
//     if (!ok) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     if (!JWT_SECRET) {
//       console.error("JWT_SECRET missing in env");
//       return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
//     }

//     // sign JWT and include minimal info
//     const payload = {
//       sub: user._id?.toString ? user._id.toString() : user._id,
//       email: user.email,
//       firstName: user.firstName || "",
//       lastName: user.lastName || "",
//     };

//     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

//     // Set cookie (HttpOnly)
//     const res = NextResponse.json({
//       ok: true,
//       user: {
//         id: user._id?.toString ? user._id.toString() : user._id,
//         firstName: user.firstName || "",
//         lastName: user.lastName || "",
//         email: user.email,
//       },
//     });

//     const cookieParts = [
//       `token=${token}`,
//       `Max-Age=${60 * 60 * 24 * 7}`, // 7 days
//       `Path=/`,
//       `HttpOnly`,
//       `SameSite=Lax`,
//     ];
//     if (process.env.NODE_ENV === "production") cookieParts.push("Secure");

//     res.headers.set("Set-Cookie", cookieParts.join("; "));
//     return res;
//   } catch (err) {
//     console.error("POST /api/auth/login error:", err);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDb } from "@/lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES = "7d";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const db = await getDb();
    const users = db.collection("users");
    const user = await users.findOne({ email: email.toLowerCase() });

    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = jwt.sign(
      {
        sub: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    const res = NextResponse.json({
      ok: true,
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });

    res.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax`
    );
    return res;
  } catch (e) {
    console.error("Login error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
