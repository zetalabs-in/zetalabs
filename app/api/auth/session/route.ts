import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("zetalabs_session")?.value;
    const jwtSecret = process.env.JWT_SECRET || "supersecretcyberpunkkeythatnobodycaneverguessever";

    if (token) {
      const payload = await verifyJWT(token, jwtSecret);
      if (payload && payload.username) {
        return NextResponse.json({ authenticated: true, username: payload.username });
      }
    }

    return NextResponse.json({ authenticated: false });
  } catch (error) {
    console.error("Session check API error:", error);
    return NextResponse.json({ authenticated: false });
  }
}
