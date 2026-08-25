import React from "react";

type Block = 
  | { type: "code"; language: string; content: string }
  | { type: "paragraph"; content: string }
  | { type: "list"; items: string[] };

/**
 * Splits text into blocks (paragraphs, list items, and code blocks).
 * Ensures unclosed code blocks are handled gracefully by closing them virtual-style.
 */
function parseMarkdownBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  const lines = text.split("\n");
  
  let inCodeBlock = false;
  let codeContent = "";
  let codeLanguage = "";
  let listItems: string[] = [];
  let currentParagraph = "";

  const flushParagraph = () => {
    if (currentParagraph.trim()) {
      blocks.push({ type: "paragraph", content: currentParagraph.trim() });
      currentParagraph = "";
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ type: "list", items: [...listItems] });
      listItems = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect code block boundaries
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        blocks.push({ type: "code", language: codeLanguage, content: codeContent });
        codeContent = "";
        codeLanguage = "";
        inCodeBlock = false;
      } else {
        flushParagraph();
        flushList();
        inCodeBlock = true;
        codeLanguage = line.trim().slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent += (codeContent ? "\n" : "") + line;
      continue;
    }

    // Detect list items (bullet points starting with *, -, or •)
    const bulletMatch = line.match(/^(\s*)[*\-•]\s+(.*)$/);
    if (bulletMatch) {
      flushParagraph();
      listItems.push(bulletMatch[2]);
      continue;
    }

    // Detect numbered list items (e.g. "1. Movie Title")
    const numberMatch = line.match(/^(\s*)\d+\.\s+(.*)$/);
    if (numberMatch) {
      flushParagraph();
      listItems.push(numberMatch[2]);
      continue;
    }

    // Blank lines separate paragraphs/lists
    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    // Accumulate paragraph text
    flushList();
    currentParagraph += (currentParagraph ? " " : "") + line;
  }

  // Gracefully flush remaining text at EOF (important for active streaming!)
  if (inCodeBlock) {
    blocks.push({ type: "code", language: codeLanguage, content: codeContent });
  } else {
    flushParagraph();
    flushList();
  }

  return blocks;
}

/**
 * Parses inline formatting (**bold** and `code`) within a block of text.
 * Gracefully terminates unclosed tags at the end of the text.
 */
function parseInlineStyles(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  while (remaining.length > 0) {
    const boldIdx = remaining.indexOf("**");
    const codeIdx = remaining.indexOf("`");

    // Handle bold if it appears first
    if (boldIdx !== -1 && (codeIdx === -1 || boldIdx < codeIdx)) {
      if (boldIdx > 0) {
        parts.push(remaining.substring(0, boldIdx));
      }

      const endBoldIdx = remaining.indexOf("**", boldIdx + 2);
      if (endBoldIdx !== -1) {
        parts.push(
          <strong key={`bold-${keyIdx++}`} className="font-extrabold text-indigo-400">
            {remaining.substring(boldIdx + 2, endBoldIdx)}
          </strong>
        );
        remaining = remaining.substring(endBoldIdx + 2);
      } else {
        // Unclosed bold tag at EOF (streaming): bold everything to the end
        parts.push(
          <strong key={`bold-${keyIdx++}`} className="font-extrabold text-indigo-400">
            {remaining.substring(boldIdx + 2)}
          </strong>
        );
        remaining = "";
      }
    }
    // Handle inline code
    else if (codeIdx !== -1 && (boldIdx === -1 || codeIdx < boldIdx)) {
      if (codeIdx > 0) {
        parts.push(remaining.substring(0, codeIdx));
      }

      const endCodeIdx = remaining.indexOf("`", codeIdx + 1);
      if (endCodeIdx !== -1) {
        parts.push(
          <code key={`code-${keyIdx++}`} className="rounded bg-slate-900/80 border border-slate-800 px-1.5 py-0.5 text-xs font-mono text-indigo-300">
            {remaining.substring(codeIdx + 1, endCodeIdx)}
          </code>
        );
        remaining = remaining.substring(endCodeIdx + 1);
      } else {
        // Unclosed code tag at EOF (streaming)
        parts.push(
          <code key={`code-${keyIdx++}`} className="rounded bg-slate-900/80 border border-slate-800 px-1.5 py-0.5 text-xs font-mono text-indigo-300">
            {remaining.substring(codeIdx + 1)}
          </code>
        );
        remaining = "";
      }
    }
    // No inline styles left
    else {
      parts.push(remaining);
      remaining = "";
    }
  }

  return parts;
}

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const blocks = parseMarkdownBlocks(content);

  return (
    <div className="space-y-3.5 leading-relaxed text-slate-200">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "code":
            return (
              <pre
                key={`block-${idx}`}
                className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/50 p-4 font-mono text-sm text-indigo-200 shadow-inner"
              >
                <code>{block.content}</code>
              </pre>
            );
          case "list":
            return (
              <ul key={`block-${idx}`} className="list-disc pl-5 space-y-1.5 text-slate-300">
                {block.items.map((item, itemIdx) => (
                  <li key={`item-${itemIdx}`}>{parseInlineStyles(item)}</li>
                ))}
              </ul>
            );
          case "paragraph":
          default:
            return (
              <p key={`block-${idx}`} className="text-slate-300">
                {parseInlineStyles(block.content)}
              </p>
            );
        }
      })}
    </div>
  );
}
