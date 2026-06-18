import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
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
    
    let rows;
    if (auth) {
      const stmt = db.prepare("SELECT * FROM posts ORDER BY date DESC");
      rows = stmt.all() as any[];
    } else {
      const stmt = db.prepare("SELECT * FROM posts WHERE published = 1 ORDER BY date DESC");
      rows = stmt.all() as any[];
    }

    const posts = rows.map((row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      summary: row.summary,
      content: row.content,
      date: row.date,
      tags: row.tags ? JSON.parse(row.tags) : [],
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
    const tagsStr = JSON.stringify(tags || []);
    const publishedVal = published ? 1 : 0;

    // Check if ID or Slug already exists to determine update vs insert
    const checkStmt = db.prepare("SELECT id FROM posts WHERE id = ? OR slug = ?");
    const existing = checkStmt.get(id, slug) as { id: string } | undefined;

    if (existing) {
      // Update by existing ID
      const updateStmt = db.prepare(`
        UPDATE posts SET
          title = ?, slug = ?, summary = ?, content = ?, date = ?, tags = ?, published = ?
        WHERE id = ?
      `);
      updateStmt.run(title, slug, summary, content, date, tagsStr, publishedVal, existing.id);
    } else {
      // Insert new post
      const insertStmt = db.prepare(`
        INSERT INTO posts (id, title, slug, summary, content, date, tags, published)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      insertStmt.run(id, title, slug, summary, content, date, tagsStr, publishedVal);
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
        tags,
        published,
      },
    });
  } catch (error: any) {
    console.error("POST post error:", error);
    if (error?.code === "SQLITE_CONSTRAINT") {
      return NextResponse.json({ success: false, error: "A post with this slug already exists." }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
