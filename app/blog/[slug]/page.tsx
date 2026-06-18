"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Markdown, extractHeadings } from "@/components/ui/markdown";
import { Calendar, Clock, Tag, ArrowLeft, BookOpen, AlertCircle, ShieldAlert } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  date: string;
  tags: string[];
  published: boolean;
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const [slug, setSlug] = useState("");
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isBlogOnlyDomain, setIsBlogOnlyDomain] = useState(false);

  // Unwrap params
  useEffect(() => {
    params.then((p) => {
      setSlug(p.slug);
    });
  }, [params]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (hostname.includes("securitytesting.") || hostname.startsWith("securitytesting.")) {
        setIsBlogOnlyDomain(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!slug) return;
    fetchPost(slug);
  }, [slug]);

  const fetchPost = async (targetSlug: string) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`/api/posts/${targetSlug}`);
      const data = await res.json();
      if (res.ok && data.success && data.post) {
        setPost(data.post);
      } else {
        setError(data.error || "Post not found.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred loading the writeup.");
    } finally {
      setLoading(false);
    }
  };

  // Estimate read time
  const getReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text ? text.split(/\s+/).length : 0;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  const readTime = post ? getReadTime(post.content) : 1;
  const headings = post ? extractHeadings(post.content) : [];

  return (
    <main className="min-h-screen bg-[#030303] text-gray-100 font-mono selection:bg-terminal-green/30 selection:text-terminal-green">
      <Navbar />

      <section className="px-4 py-20 md:px-6 md:py-32 relative">
        <div className="absolute top-0 left-0 w-72 h-72 bg-terminal-green/5 blur-3xl rounded-full -z-10" />
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none -z-10" />

        <div className="container mx-auto max-w-5xl">
          {/* Back button */}
          <div className="mb-10">
            <Link
              href={isBlogOnlyDomain ? "/" : "/blog"}
              className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-terminal-green transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> &gt; return_to_writeups_feed
            </Link>
          </div>

          {loading ? (
            <div className="py-20 text-center text-xs text-gray-500">
              <span className="animate-pulse">&gt; DECRYPTING_VULNERABILITY_RECORDS...</span>
            </div>
          ) : error || !post ? (
            <div className="py-20 text-center max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 border border-red-500/20 bg-red-500/5 text-red-400 p-4 rounded-lg text-xs font-mono mb-6">
                <ShieldAlert className="h-5 w-5 shrink-0" />
                <span>{error || "Telemetry failed to load."}</span>
              </div>
              <Link
                href={isBlogOnlyDomain ? "/" : "/blog"}
                className="text-xs text-terminal-teal hover:underline"
              >
                &gt; Back to feed
              </Link>
            </div>
          ) : (
            <div className="grid gap-12 lg:grid-cols-4">
              {/* Writeup Content (takes 3 cols on desktop) */}
              <div className="lg:col-span-3 space-y-8">
                {/* Heading details */}
                <div className="border-b border-cyber-border/60 pb-8">
                  {/* Draft Badge */}
                  {!post.published && (
                    <span className="inline-block border border-yellow-500/30 text-yellow-500 bg-yellow-500/5 text-[9px] px-2 py-0.5 rounded font-mono uppercase mb-4">
                      [ DRAFT_TELEMETRY ]
                    </span>
                  )}
                  
                  <h1 className="text-3xl font-bold font-sans text-white uppercase tracking-tight md:text-4xl lg:text-5xl leading-tight mb-4">
                    {post.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-6 text-[10px] text-gray-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {readTime} min read
                    </span>
                    {post.tags.length > 0 && (
                      <span className="flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5" /> {post.tags.join(", ")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Main Rendered Content */}
                <article className="prose prose-invert max-w-none">
                  <Markdown content={post.content} />
                </article>
              </div>

              {/* Sidebar (sticky Table of Contents) */}
              {headings.length > 0 && (
                <div className="hidden lg:block lg:col-span-1">
                  <div className="sticky top-28 border border-cyber-border bg-[#050505]/70 rounded-xl p-5 backdrop-blur">
                    <div className="flex items-center gap-2 border-b border-cyber-border pb-3 mb-4 text-xs font-bold text-white uppercase tracking-wider">
                      <BookOpen className="h-4 w-4 text-terminal-teal" />
                      <span>Table of Contents</span>
                    </div>
                    
                    <nav className="space-y-2.5 text-[11px] font-mono">
                      {headings.map((heading, idx) => (
                        <a
                          key={idx}
                          href={`#${heading.slug}`}
                          className={`block hover:text-terminal-green transition-colors leading-relaxed ${
                            heading.level === 2
                              ? "text-gray-400 pl-2 border-l border-cyber-border"
                              : heading.level === 3
                              ? "text-gray-500 pl-4 border-l border-cyber-border/40"
                              : "text-gray-300 font-bold"
                          }`}
                        >
                          {heading.level === 2 && <span className="text-terminal-teal/40 mr-1">&gt;</span>}
                          {heading.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
