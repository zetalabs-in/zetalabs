"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Terminal, Search, Calendar, Tag, Clock, ArrowRight, ShieldAlert, ArrowLeft } from "lucide-react";

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

export default function BlogFeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Detect which host we are on to show correct return links
  const [isBlogOnlyDomain, setIsBlogOnlyDomain] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (hostname.includes("securitytesting.") || hostname.startsWith("securitytesting.")) {
        setIsBlogOnlyDomain(true);
      }
    }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/posts");
      const data = await res.json();
      if (res.ok && data.success) {
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error("Failed to fetch blog posts:", err);
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

  // Extract all unique tags
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  return (
    <main className="min-h-screen bg-[#030303] text-gray-100 font-mono selection:bg-terminal-green/30 selection:text-terminal-green">
      <Navbar />

      <section className="px-4 py-20 md:px-6 md:py-32 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-terminal-teal/5 blur-3xl rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-terminal-green/5 blur-3xl rounded-full -z-10" />
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none -z-10" />

        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-16">
            {isBlogOnlyDomain ? (
              <a
                href="https://zetalabs.in"
                className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-terminal-green mb-6 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> &gt; return_to_zetalabs_portfolio
              </a>
            ) : (
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-terminal-green mb-6 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> &gt; return_to_homepage
              </Link>
            )}

            <div className="inline-block rounded border border-terminal-green/30 bg-terminal-green/5 px-3 py-1.5 text-xs text-terminal-green mb-4">
              [ SEC_LOGS // VULNERABILITY_ARCHIVE ]
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl font-sans mb-4 uppercase">
              Security <span className="text-terminal-green underline decoration-terminal-green decoration-2 underline-offset-8">Assessments Blog</span>
            </h1>
            <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
              Technical write-ups, vulnerability assessment processes, reverse engineering exploits, and penetration testing walkthroughs conducted by the ZetaLabs security collective.
            </p>
          </div>

          {/* Search and Tag Filtering Controls */}
          <div className="grid gap-6 md:grid-cols-4 mb-12">
            {/* Search Box */}
            <div className="md:col-span-3 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search writeups by keyword, tag, title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-cyber-border hover:border-cyber-border/80 focus:border-terminal-green focus:ring-1 focus:ring-terminal-green text-gray-200 placeholder-gray-600 rounded-lg py-3 pl-10 pr-4 text-xs font-mono transition-all outline-none"
              />
            </div>

            {/* Clear Filters Button */}
            {(searchQuery || selectedTag) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag(null);
                }}
                className="rounded border border-cyber-border text-gray-400 hover:text-terminal-teal hover:border-terminal-teal text-xs py-3 px-4 transition-colors font-bold cursor-pointer"
              >
                &gt; CLEAR_FILTERS
              </button>
            )}
          </div>

          {/* Tags List */}
          {allTags.length > 0 && (
            <div className="mb-12 flex flex-wrap gap-2 items-center">
              <span className="text-[10px] text-gray-500 uppercase font-bold mr-2">// FILTER_BY_TAG:</span>
              <button
                onClick={() => setSelectedTag(null)}
                className={`text-[10px] border rounded px-2.5 py-1 font-mono transition-all cursor-pointer ${
                  selectedTag === null
                    ? "border-terminal-green text-terminal-green bg-terminal-green/5"
                    : "border-cyber-border text-gray-400 hover:border-gray-500"
                }`}
              >
                all_posts
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`text-[10px] border rounded px-2.5 py-1 font-mono transition-all cursor-pointer ${
                    selectedTag === tag
                      ? "border-terminal-green text-terminal-green bg-terminal-green/5"
                      : "border-cyber-border text-gray-400 hover:border-gray-500"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Posts Feed Grid */}
          {loading ? (
            <div className="py-20 text-center text-xs text-gray-500">
              <span className="animate-pulse">&gt; SYNCING_VULNERABILITY_ARCHIVE...</span>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="py-20 text-center text-xs text-gray-500 border border-dashed border-cyber-border/40 rounded-xl">
              <ShieldAlert className="h-8 w-8 text-terminal-teal mx-auto mb-4" />
              <span>&gt; Zero telemetry matching the filter parameters.</span>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {filteredPosts.map((post) => {
                const readTime = getReadTime(post.content);
                return (
                  <div
                    key={post.id}
                    className="glow-card rounded-xl p-8 flex flex-col justify-between hover:shadow-cyber-glow-green/10"
                  >
                    <div>
                      {/* Meta info */}
                      <div className="flex items-center gap-4 text-[10px] text-gray-500 mb-4 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {readTime} min read
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight hover:text-terminal-green transition-colors">
                        <Link href={isBlogOnlyDomain ? `/${post.slug}` : `/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      {/* Summary */}
                      <p className="text-xs text-gray-400 leading-relaxed font-sans mb-6">
                        {post.summary}
                      </p>
                    </div>

                    <div className="border-t border-cyber-border/40 pt-4 mt-auto">
                      <div className="flex justify-between items-center flex-wrap gap-3">
                        {/* Tags list */}
                        <div className="flex gap-1.5 flex-wrap">
                          {post.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[9px] font-mono text-terminal-teal border border-terminal-teal/15 bg-terminal-teal/5 px-2 py-0.5 rounded"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>

                        {/* Read link */}
                        <Link
                          href={isBlogOnlyDomain ? `/${post.slug}` : `/blog/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs text-terminal-green hover:underline cursor-pointer"
                        >
                          read_report <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
