import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sb_access_token")?.value;

    if (token) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wjsgcmjgujkmedymjjxi.supabase.co";
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "sb_publishable_a64Ek_zM03ASOHgHgzPllg_O-cmKWKM";
      
      const client = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });
      
      const { data: { user }, error } = await client.auth.getUser(token);

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
