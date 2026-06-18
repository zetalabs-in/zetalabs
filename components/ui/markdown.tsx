"use client";

import React, { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

interface MarkdownProps {
  content: string;
}

// Inline token rendering helper
function parseInline(text: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  let index = 0;

  // Simple parser for bold, italic, inline code, links, and images
  while (index < text.length) {
    // 1. Image: ![alt](url)
    if (text.startsWith("![", index)) {
      const altEnd = text.indexOf("]", index + 2);
      if (altEnd !== -1 && text.startsWith("(", altEnd + 1)) {
        const urlEnd = text.indexOf(")", altEnd + 2);
        if (urlEnd !== -1) {
          const alt = text.substring(index + 2, altEnd);
          const url = text.substring(altEnd + 2, urlEnd);
          tokens.push(
            <span key={index} className="block my-6 border border-cyber-border rounded-lg overflow-hidden bg-black/50 p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={alt} className="max-w-full h-auto mx-auto rounded" />
              {alt && <span className="block text-center text-[10px] text-gray-500 mt-2 font-mono">// {alt}</span>}
            </span>
          );
          index = urlEnd + 1;
          continue;
        }
      }
    }

    // 2. Link: [text](url)
    if (text.startsWith("[", index)) {
      const textEnd = text.indexOf("]", index + 1);
      if (textEnd !== -1 && text.startsWith("(", textEnd + 1)) {
        const urlEnd = text.indexOf(")", textEnd + 2);
        if (urlEnd !== -1) {
          const linkText = text.substring(index + 1, textEnd);
          const url = text.substring(textEnd + 2, urlEnd);
          const isExternal = url.startsWith("http");
          tokens.push(
            <a
              key={index}
              href={url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="text-terminal-teal hover:underline font-mono"
            >
              {linkText}
            </a>
          );
          index = urlEnd + 1;
          continue;
        }
      }
    }

    // 3. Inline Code: `code`
    if (text.startsWith("`", index)) {
      const codeEnd = text.indexOf("`", index + 1);
      if (codeEnd !== -1) {
        const codeText = text.substring(index + 1, codeEnd);
        tokens.push(
          <code key={index} className="bg-cyber-gray border border-cyber-border text-terminal-green rounded px-1.5 py-0.5 text-xs font-mono">
            {codeText}
          </code>
        );
        index = codeEnd + 1;
        continue;
      }
    }

    // 4. Bold: **text**
    if (text.startsWith("**", index)) {
      const boldEnd = text.indexOf("**", index + 2);
      if (boldEnd !== -1) {
        const boldText = text.substring(index + 2, boldEnd);
        tokens.push(
          <strong key={index} className="font-bold text-white">
            {parseInline(boldText)}
          </strong>
        );
        index = boldEnd + 2;
        continue;
      }
    }

    // 5. Italic: *text*
    if (text.startsWith("*", index)) {
      const italicEnd = text.indexOf("*", index + 1);
      if (italicEnd !== -1) {
        const italicText = text.substring(index + 1, italicEnd);
        tokens.push(
          <em key={index} className="italic text-gray-300">
            {parseInline(italicText)}
          </em>
        );
        index = italicEnd + 1;
        continue;
      }
    }

    // 6. Plain character
    tokens.push(text[index]);
    index++;
  }

  return tokens;
}

// Code Block Sub-Component with Copy Button
function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 border border-cyber-border rounded-lg overflow-hidden bg-black/60 font-mono text-xs shadow-lg">
      <div className="flex justify-between items-center bg-[#0d1214] px-4 py-2 border-b border-cyber-border">
        <div className="flex items-center gap-2 text-gray-400">
          <Terminal className="h-4 w-4 text-terminal-green" />
          <span className="text-[10px] uppercase tracking-wider">{language || "code"}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-terminal-teal transition-colors flex items-center gap-1 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-terminal-green" />
              <span className="text-[10px] text-terminal-green">copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span className="text-[10px]">copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto max-h-[500px]">
        <pre className="text-gray-300 whitespace-pre leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export function Markdown({ content }: MarkdownProps) {
  if (!content) return null;

  const lines = content.split(/\r?\n/);
  const elements: React.ReactNode[] = [];
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // 1. Code block parser
    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <CodeBlock key={i} code={codeLines.join("\n")} language={lang} />
      );
      i++;
      continue;
    }

    // 2. Table parser
    if (line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }

      if (tableLines.length >= 2) {
        const parseRow = (rowStr: string) => {
          return rowStr
            .split("|")
            .map((c) => c.trim())
            .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        };

        const headers = parseRow(tableLines[0]);
        const rows = tableLines.slice(2).map(parseRow); // Skip alignment row

        elements.push(
          <div key={i} className="my-6 overflow-x-auto border border-cyber-border rounded-lg bg-black/45">
            <table className="w-full border-collapse font-mono text-xs">
              <thead>
                <tr className="bg-cyber-gray border-b border-cyber-border text-left">
                  {headers.map((h, hIdx) => (
                    <th key={hIdx} className="p-3 font-bold text-terminal-teal uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-cyber-border/40 hover:bg-cyber-gray/30 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3 text-gray-300">
                        {parseInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // 3. Headers (# to ######)
    const headerMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const text = headerMatch[2];
      const parsedText = parseInline(text);
      const slug = text.toLowerCase().replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-");

      const baseHeaderClass = "font-sans font-bold text-white tracking-tight uppercase mt-8 mb-4";
      if (level === 1) {
        elements.push(
          <h1 id={slug} key={i} className={`${baseHeaderClass} text-3xl md:text-4xl border-b border-cyber-border pb-2`}>
            {parsedText}
          </h1>
        );
      } else if (level === 2) {
        elements.push(
          <h2 id={slug} key={i} className={`${baseHeaderClass} text-2xl md:text-3xl border-b border-cyber-border pb-1`}>
            <span className="text-terminal-teal mr-2">&gt;_</span>
            {parsedText}
          </h2>
        );
      } else if (level === 3) {
        elements.push(
          <h3 id={slug} key={i} className={`${baseHeaderClass} text-xl md:text-2xl`}>
            {parsedText}
          </h3>
        );
      } else {
        elements.push(
          <h4 id={slug} key={i} className={`${baseHeaderClass} text-lg`}>
            {parsedText}
          </h4>
        );
      }
      i++;
      continue;
    }

    // 4. Blockquotes and GitHub Alerts
    if (line.trim().startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().substring(1).trim());
        i++;
      }

      const rawBlock = quoteLines.join("\n");
      // Check for alerts: [!NOTE], [!IMPORTANT], [!WARNING], [!TIP]
      const alertMatch = rawBlock.match(/^\[!(NOTE|IMPORTANT|WARNING|TIP|CAUTION)\]\s*([\s\S]*)$/i);
      
      if (alertMatch) {
        const type = alertMatch[1].toUpperCase();
        const body = alertMatch[2];
        let borderColor = "border-terminal-teal";
        let bgColor = "bg-terminal-teal/5";
        let titleColor = "text-terminal-teal";

        if (type === "IMPORTANT" || type === "WARNING") {
          borderColor = "border-yellow-500/50";
          bgColor = "bg-yellow-500/5";
          titleColor = "text-yellow-500";
        } else if (type === "CAUTION") {
          borderColor = "border-red-500/50";
          bgColor = "bg-red-500/5";
          titleColor = "text-red-500";
        } else if (type === "TIP") {
          borderColor = "border-terminal-green";
          bgColor = "bg-terminal-green/5";
          titleColor = "text-terminal-green";
        }

        elements.push(
          <div key={i} className={`my-6 border-l-4 ${borderColor} ${bgColor} p-4 rounded-r-lg font-mono text-xs`}>
            <div className={`font-bold uppercase tracking-wider mb-1.5 ${titleColor}`}>[{type}]</div>
            <div className="text-gray-300 leading-relaxed font-sans">{parseInline(body)}</div>
          </div>
        );
      } else {
        elements.push(
          <blockquote key={i} className="my-6 border-l-4 border-cyber-border bg-cyber-gray/30 pl-4 py-2 italic text-gray-400 text-sm font-mono">
            {parseInline(rawBlock)}
          </blockquote>
        );
      }
      continue;
    }

    // 5. Unordered list
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))) {
        listItems.push(lines[i].trim().substring(2).trim());
        i++;
      }
      elements.push(
        <ul key={i} className="my-4 space-y-2 list-none pl-1">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-300 font-sans leading-relaxed">
              <span className="text-terminal-green font-mono select-none mt-0.5">&gt;</span>
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 6. Ordered list
    if (line.trim().match(/^\d+\.\s+/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().match(/^\d+\.\s+/)) {
        const match = lines[i].trim().match(/^\d+\.\s+(.*)$/);
        if (match) {
          listItems.push(match[1]);
        }
        i++;
      }
      elements.push(
        <ol key={i} className="my-4 space-y-2 list-none pl-1">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-300 font-sans leading-relaxed">
              <span className="text-terminal-teal font-mono select-none mt-0.5">[{idx + 1}]</span>
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 7. Divider
    if (line.trim() === "---" || line.trim() === "***" || line.trim() === "___") {
      elements.push(<hr key={i} className="my-8 border-cyber-border" />);
      i++;
      continue;
    }

    // 8. Paragraph / empty space
    if (line.trim() === "") {
      // Just render empty spacing or skip
      i++;
      continue;
    }

    // Otherwise render standard text block
    elements.push(
      <p key={i} className="my-4 text-sm text-gray-300 leading-relaxed font-sans">
        {parseInline(line)}
      </p>
    );
    i++;
  }

  return <div className="space-y-4">{elements}</div>;
}

// TOC generator helper for detail page
export function extractHeadings(content: string): { text: string; slug: string; level: number }[] {
  if (!content) return [];
  const lines = content.split(/\n/);
  const headings: { text: string; slug: string; level: number }[] = [];
  
  let inCodeBlock = false;
  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{1,6})\s+(.*)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim().replace(/\*\*|\*|`/g, ""); // Clean formatting tokens
      const slug = text.toLowerCase().replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-");
      
      // We only care about h1, h2, h3 for TOC
      if (level <= 3) {
        headings.push({ text, slug, level });
      }
    }
  }
  return headings;
}
