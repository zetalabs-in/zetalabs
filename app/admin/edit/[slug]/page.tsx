"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Terminal, Save, X, Eye, Edit, Upload, Image, ArrowLeft, Sparkles } from "lucide-react";
import { Markdown } from "@/components/ui/markdown";

interface EditPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter();
  const [slugParam, setSlugParam] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  // Post State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState("");
  const [published, setPublished] = useState(false);
  const [id, setId] = useState("");

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Unwrap params using React.use() equivalent pattern
  useEffect(() => {
    params.then((p) => {
      setSlugParam(p.slug);
    });
  }, [params]);

  useEffect(() => {
    if (!slugParam) return;

    if (slugParam === "new") {
      // Initialize new post
      setDate(new Date().toISOString().split("T")[0]);
      setLoading(false);
    } else {
      // Load existing post
      fetchPost(slugParam);
    }
  }, [slugParam]);

  const fetchPost = async (targetSlug: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/posts/${targetSlug}`);
      const data = await res.json();
      if (res.ok && data.success && data.post) {
        const p = data.post;
        setId(p.id);
        setTitle(p.title);
        setSlug(p.slug);
        setSummary(p.summary);
        setContent(p.content);
        setDate(p.date);
        setTags(p.tags.join(", "));
        setPublished(p.published);
      } else {
        setError("Failed to load post data.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred fetching post details.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-slug generator from Title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (slugParam === "new") {
      const generatedSlug = val
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s_-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setSlug(generatedSlug);
    }
  };

  // Image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success && data.url) {
        // Insert markdown image syntax at cursor position
        const markdownImage = `![${file.name.split(".")[0]}](${data.url})`;
        insertAtCursor(markdownImage);
      } else {
        setError(data.error || "Image upload failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Error uploading file to server.");
    } finally {
      setUploading(false);
    }
  };

  const insertAtCursor = (textToInsert: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = textarea.value;
    const before = currentText.substring(0, start);
    const after = currentText.substring(end, currentText.length);

    setContent(before + textToInsert + after);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + textToInsert.length;
    }, 0);
  };

  const handleSave = async () => {
    if (!title || !slug || !content) {
      setError("Title, Slug, and content are required.");
      return;
    }

    setSaving(true);
    setError("");

    const tagsArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const postData = {
      id: id || Date.now().toString(),
      title,
      slug: slug.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-"),
      summary,
      content,
      date,
      tags: tagsArray,
      published,
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Failed to save write-up.");
      }
    } catch (err) {
      console.error(err);
      setError("Error saving write-up data.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] text-gray-400 font-mono flex justify-center items-center">
        <span className="animate-pulse">&gt; LOADING_WRITE_UP_EDITOR_TELEMETRY...</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#030303] text-gray-100 font-mono flex flex-col h-screen overflow-hidden relative">
      {/* Editor top navigation bar */}
      <header className="flex justify-between items-center bg-[#0d1214] px-6 py-4 border-b border-cyber-border shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin")}
            className="text-gray-400 hover:text-white mr-2 flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-terminal-green" />
            <h1 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
              {slugParam === "new" ? "NEW_WRITEUP" : `EDIT: ${slugParam}`}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Tabs for small screens */}
          <div className="flex border border-cyber-border rounded-lg overflow-hidden md:hidden mr-2">
            <button
              onClick={() => setActiveTab("edit")}
              className={`p-2 text-xs font-bold ${activeTab === "edit" ? "bg-terminal-green text-black" : "text-gray-400"}`}
            >
              <Edit className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`p-2 text-xs font-bold ${activeTab === "preview" ? "bg-terminal-green text-black" : "text-gray-400"}`}
            >
              <Eye className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded bg-terminal-green hover:bg-white text-black font-bold py-2 px-4 text-xs cursor-pointer shadow-[0_0_10px_rgba(0,255,102,0.1)] transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4" /> {saving ? "SAVING..." : "SAVE"}
          </button>
          <button
            onClick={() => router.push("/admin")}
            className="inline-flex items-center gap-1.5 rounded border border-cyber-border hover:border-red-500 hover:bg-red-500/5 text-gray-400 hover:text-red-400 font-bold py-2 px-4 text-xs cursor-pointer transition-colors"
          >
            <X className="h-4 w-4" /> CANCEL
          </button>
        </div>
      </header>

      {error && (
        <div className="bg-red-500/10 border-b border-red-500/30 text-red-400 px-6 py-2.5 text-xs text-center font-mono flex items-center justify-center gap-2 shrink-0">
          <span>[!] Error: {error}</span>
        </div>
      )}

      {/* Main split-screen editor body */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT COLUMN: Metadata + Editor */}
        <div className={`flex-1 flex flex-col overflow-y-auto border-r border-cyber-border p-6 space-y-6 ${activeTab === "edit" ? "block" : "hidden md:block"}`}>
          {/* Metadata Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Title</label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="vulnerability_assessment_reports"
                className="w-full bg-[#030303] border border-cyber-border focus:border-terminal-green rounded-lg py-2 px-3 text-xs outline-none transition-colors"
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Slug (URL Path)</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="slug-path"
                disabled={slugParam !== "new"}
                className="w-full bg-[#030303] border border-cyber-border focus:border-terminal-green disabled:opacity-50 rounded-lg py-2 px-3 text-xs outline-none transition-colors"
              />
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Publish Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#030303] border border-cyber-border focus:border-terminal-green rounded-lg py-2 px-3 text-xs outline-none transition-colors"
              />
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Tags (comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="owasp, xss, audit"
                className="w-full bg-[#030303] border border-cyber-border focus:border-terminal-green rounded-lg py-2 px-3 text-xs outline-none transition-colors"
              />
            </div>

            {/* Summary */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Summary / Description</label>
              <input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="A summary description of this writeup..."
                className="w-full bg-[#030303] border border-cyber-border focus:border-terminal-green rounded-lg py-2 px-3 text-xs outline-none transition-colors"
              />
            </div>

            {/* Toggle Status */}
            <div className="sm:col-span-2 flex items-center justify-between border border-cyber-border/60 bg-cyber-gray/25 p-3.5 rounded-lg">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white uppercase tracking-tight">Publish Writeup</span>
                <p className="text-[10px] text-gray-500 font-sans leading-relaxed">If checked, it will immediately appear on the public feed.</p>
              </div>
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4.5 w-4.5 accent-terminal-green cursor-pointer"
              />
            </div>
          </div>

          {/* Text Editor Section */}
          <div className="flex-1 flex flex-col space-y-3 min-h-[300px]">
            <div className="flex justify-between items-center bg-[#0d1214] px-4 py-2 border border-cyber-border border-b-0 rounded-t-lg text-[10px] text-gray-400 tracking-wider">
              <span>// MARKDOWN_BODY_CONTENT</span>
              
              {/* File Uploader */}
              <label className="flex items-center gap-1.5 cursor-pointer text-terminal-teal hover:text-white transition-colors">
                <Upload className="h-3.5 w-3.5" />
                <span>{uploading ? "UPLOADING..." : "UPLOAD_IMAGE"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="# Introduction&#10;&#10;Write your cybersecurity write-up markdown here...&#10;&#10;Use headings, code blocks, lists, and tables."
              className="flex-1 w-full bg-[#050505] border border-cyber-border focus:border-terminal-teal rounded-b-lg p-4 font-mono text-xs leading-relaxed resize-none outline-none overflow-y-auto"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Live Render Preview */}
        <div className={`flex-1 overflow-y-auto p-6 md:p-8 bg-[#020202] ${activeTab === "preview" ? "block" : "hidden md:block"}`}>
          <div className="max-w-3xl mx-auto">
            {/* Header info mock */}
            <div className="mb-8 border-b border-cyber-border/40 pb-6">
              <div className="inline-flex items-center gap-1 text-[10px] text-terminal-teal uppercase tracking-wider mb-3">
                <Sparkles className="h-3.5 w-3.5 text-terminal-teal" /> live_preview_telemetry
              </div>
              <h1 className="text-3xl font-bold font-sans text-white uppercase tracking-tight mb-2">
                {title || "UNRESOLVED_TITLE"}
              </h1>
              <div className="flex items-center gap-4 text-[10px] text-gray-500 font-mono">
                <span>{date || "YYYY-MM-DD"}</span>
                {tags && <span>/ tags: {tags}</span>}
                <span className="text-terminal-green">/ {published ? "PUBLISHED" : "DRAFT"}</span>
              </div>
            </div>

            {/* Markdown Display */}
            {content ? (
              <Markdown content={content} />
            ) : (
              <p className="text-xs text-gray-600 italic">// Empty markdown body telemetry...</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
