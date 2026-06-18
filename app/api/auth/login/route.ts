import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signJWT } from "@/lib/jwt";
import { verifyPassword } from "@/lib/crypto";

// Simple in-memory rate limiting store
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_ATTEMPTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (now > record.resetTime) {
    // Window expired, reset counter and window
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_ATTEMPTS) {
    return false; // Rate limited
  }

  record.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // 1. IP-based Rate Limiter Check
    const ipHeader = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
    const clientIp = ipHeader.split(",")[0].trim();

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { success: false, error: "Too many login attempts. Please try again in 1 minute." },
        { status: 429 }
      );
    }

    const { username, password } = await request.json();

    const adminUser = process.env.ADMIN_USERNAME || "admin";
    const storedHash = process.env.ADMIN_PASSWORD_HASH || "";
    const storedSalt = process.env.ADMIN_PASSWORD_SALT || "";
    const jwtSecret = process.env.JWT_SECRET || "supersecretcyberpunkkeythatnobodycaneverguessever";

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Credentials required" },
        { status: 400 }
      );
    }

    // 2. Cryptographic Password Verification
    const isValidPassword = await verifyPassword(password, storedSalt, storedHash);

    if (username === adminUser && isValidPassword) {
      // Create session token valid for 24h
      const token = await signJWT(
        { username, exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 },
        jwtSecret
      );

      const cookieStore = await cookies();
      cookieStore.set("zetalabs_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 24 * 60 * 60,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
