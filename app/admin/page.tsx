"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Terminal, Plus, Edit2, Trash2, LogOut, FileText, Calendar, Tag, Shield, AlertCircle } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  date: string;
  tags: string[];
  published: boolean;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/posts");
      const data = await res.json();
      if (res.ok && data.success) {
        setPosts(data.posts || []);
      } else {
        setError(data.error || "Failed to load posts.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch posts from api.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete the post "${slug}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPosts((prev) => prev.filter((p) => p.slug !== slug));
      } else {
        alert(data.error || "Failed to delete post.");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred deleting post.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <main className="min-h-screen bg-[#030303] text-gray-100 font-mono p-4 md:p-8 relative">
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Admin Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-cyber-border rounded-xl bg-black/60 p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded border border-terminal-green bg-terminal-green/5 flex items-center justify-center text-terminal-green shadow-[0_0_10px_rgba(0,255,102,0.1)]">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white uppercase tracking-tight">ZETALABS_ADMIN_PORTAL</h1>
              <p className="text-[10px] text-gray-500">// SECURE VULNERABILITY ARCHIVE EDITOR</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href="/admin/edit/new"
              className="flex-1 md:flex-initial inline-flex justify-center items-center gap-1.5 rounded border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-black font-bold py-2.5 px-4 text-xs cursor-pointer transition-all duration-300"
            >
              <Plus className="h-4 w-4" /> NEW_POST
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 md:flex-initial inline-flex justify-center items-center gap-1.5 rounded border border-red-500/30 text-red-400 hover:border-red-500 hover:bg-red-500/10 font-bold py-2.5 px-4 text-xs cursor-pointer transition-colors"
            >
              <LogOut className="h-4 w-4" /> LOGOUT
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="border border-cyber-border rounded-xl bg-[#050505] overflow-hidden">
          {/* Subheader */}
          <div className="flex justify-between items-center bg-[#0d1214] px-6 py-4 border-b border-cyber-border">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-terminal-teal" />
              <h2 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
                Vulnerability Write-ups ({posts.length})
              </h2>
            </div>
            <Link href="/" className="text-[10px] text-terminal-teal hover:underline">&lt; Return home</Link>
          </div>

          {/* Table / List */}
          <div className="p-6">
            {loading ? (
              <div className="py-12 text-center text-xs text-gray-500">
                <span className="animate-pulse">&gt; LOADING_TELEMETRY_DATA...</span>
              </div>
            ) : error ? (
              <div className="flex items-center gap-2 border border-red-500/20 bg-red-500/5 text-red-400 p-4 rounded-lg text-xs my-4">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>
            ) : posts.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-500 border border-dashed border-cyber-border/40 rounded-lg">
                &gt; No write-ups found on local storage. Create your first post using the NEW_POST button.
              </div>
            ) : (
              <div className="divide-y divide-cyber-border/45">
                {posts.map((post) => (
                  <div key={post.id} className="py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 first:pt-0 last:pb-0 hover:bg-cyber-gray/10 transition-colors px-2 rounded-lg">
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="text-sm font-bold text-white hover:text-terminal-teal hover:underline tracking-tight uppercase"
                        >
                          {post.title}
                        </Link>
                        <span className={`text-[9px] border rounded px-1.5 py-0.5 uppercase font-mono ${
                          post.published
                            ? "border-terminal-green/30 text-terminal-green bg-terminal-green/5"
                            : "border-yellow-500/30 text-yellow-500 bg-yellow-500/5"
                        }`}>
                          {post.published ? "published" : "draft"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 font-sans leading-relaxed">{post.summary}</p>
                      
                      <div className="flex items-center gap-4 text-[10px] text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {post.date}
                        </span>
                        {post.tags.length > 0 && (
                          <span className="flex items-center gap-1">
                            <Tag className="h-3 w-3" /> {post.tags.join(", ")}
                          </span>
                        )}
                        <span className="text-gray-600 font-mono">/slug: {post.slug}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                      <Link
                        href={`/admin/edit/${post.slug}`}
                        className="flex-1 md:flex-initial inline-flex justify-center items-center gap-1 rounded border border-cyber-border hover:border-terminal-teal hover:bg-terminal-teal/5 text-gray-400 hover:text-terminal-teal font-bold py-2 px-3 text-[10px] cursor-pointer transition-colors"
                      >
                        <Edit2 className="h-3 w-3" /> EDIT
                      </Link>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        className="flex-1 md:flex-initial inline-flex justify-center items-center gap-1 rounded border border-cyber-border hover:border-red-500 hover:bg-red-500/5 text-gray-400 hover:text-red-400 font-bold py-2 px-3 text-[10px] cursor-pointer transition-colors"
                      >
                        <Trash2 className="h-3 w-3" /> DELETE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
