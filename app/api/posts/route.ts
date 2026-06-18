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

export async function GET() {
  try {
    const auth = await isAuthenticated();
    
    let query = supabase.from("posts").select("*").order("date", { ascending: false });
    
    if (!auth) {
      query = query.eq("published", true);
    }

    const { data: rows, error } = await query;

    if (error) {
      console.error("Supabase GET error:", error);
      return NextResponse.json({ success: false, posts: [] });
    }

    const posts = (rows || []).map((row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      summary: row.summary,
      content: row.content,
      date: row.date,
      tags: Array.isArray(row.tags) ? row.tags : (row.tags ? JSON.parse(row.tags) : []),
      published: Boolean(row.published),
    }));

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error("GET posts error:", error);
    return NextResponse.json({ success: false, posts: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await isAuthenticated();
    if (!auth) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const postData = await request.json();
    let { id, title, slug, summary, content, date, tags, published } = postData;
    
    if (!title || !slug || !content) {
      return NextResponse.json({ success: false, error: "Title, slug, and content are required" }, { status: 400 });
    }

    slug = slug.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-");

    if (!id) {
      id = Date.now().toString();
    }
    if (!date) {
      date = new Date().toISOString().split("T")[0];
    }
    const publishedVal = Boolean(published);

    // Perform upsert (Insert or Update if ID or Slug already exists)
    const { error } = await supabase.from("posts").upsert({
      id,
      title,
      slug,
      summary,
      content,
      date,
      tags: tags || [],
      published: publishedVal
    });

    if (error) {
      console.error("Supabase UPSERT error:", error);
      if (error.code === "23505") { // Unique violation in Postgres
        return NextResponse.json({ success: false, error: "A post with this slug already exists." }, { status: 409 });
      }
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      post: {
        id,
        title,
        slug,
        summary,
        content,
        date,
        tags: tags || [],
        published: publishedVal,
      },
    });
  } catch (error) {
    console.error("POST post error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
