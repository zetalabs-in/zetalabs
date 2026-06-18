import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { verifyJWT } from "@/lib/jwt";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get("zetalabs_session")?.value;
  if (!token) return false;
  
  const jwtSecret = process.env.JWT_SECRET || "supersecretcyberpunkkeythatnobodycaneverguessever";
  const payload = await verifyJWT(token, jwtSecret);
  return !!(payload && payload.username);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const { data: row, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !row) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    const auth = await isAuthenticated();
    if (!row.published && !auth) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    const post = {
      id: row.id,
      title: row.title,
      slug: row.slug,
      summary: row.summary,
      content: row.content,
      date: row.date,
      tags: Array.isArray(row.tags) ? row.tags : (row.tags ? JSON.parse(row.tags) : []),
      published: Boolean(row.published),
    };

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("GET post error:", error);
    return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const auth = await isAuthenticated();
    if (!auth) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("slug", slug);

    if (error) {
      console.error("DELETE post error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE post error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete post" }, { status: 500 });
  }
}
