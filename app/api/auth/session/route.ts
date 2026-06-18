import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sb_access_token")?.value;

    if (token) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wjsgcmjgujkmedymjjxi.supabase.co";
      // Create a temporary Supabase client with the user's specific JWT token
      const client = createClient(supabaseUrl, token, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });
      
      const { data: { user }, error } = await client.auth.getUser();

      if (!error && user) {
        return NextResponse.json({ authenticated: true, email: user.email });
      }
    }

    return NextResponse.json({ authenticated: false });
  } catch (error) {
    console.error("Session check API error:", error);
    return NextResponse.json({ authenticated: false });
  }
}
