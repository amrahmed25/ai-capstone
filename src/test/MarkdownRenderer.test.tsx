import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MarkdownRenderer } from "../components/MarkdownRenderer";

describe("MarkdownRenderer Component", () => {
  it("renders plain paragraphs correctly", () => {
    render(<MarkdownRenderer content="This is a simple paragraph." />);
    expect(screen.getByText("This is a simple paragraph.")).toBeInTheDocument();
  });

  it("parses bold text correctly", () => {
    render(<MarkdownRenderer content="This is **bold** text." />);
    const boldEl = screen.getByText("bold");
    expect(boldEl.tagName).toBe("STRONG");
    expect(boldEl).toHaveClass("text-indigo-400");
  });

  it("parses inline code correctly", () => {
    render(<MarkdownRenderer content="This is `code` text." />);
    const codeEl = screen.getByText("code");
    expect(codeEl.tagName).toBe("CODE");
    expect(codeEl).toHaveClass("text-indigo-300");
  });

  it("handles unclosed bold tags gracefully at EOF (streaming scenario)", () => {
    render(<MarkdownRenderer content="This is **unclosed bold" />);
    const boldEl = screen.getByText("unclosed bold");
    expect(boldEl.tagName).toBe("STRONG");
  });

  it("handles unclosed inline code tags gracefully at EOF (streaming scenario)", () => {
    render(<MarkdownRenderer content="This is `unclosed code" />);
    const codeEl = screen.getByText("unclosed code");
    expect(codeEl.tagName).toBe("CODE");
  });

  it("renders lists correctly", () => {
    const content = "- Item 1\n- Item 2\n- Item 3";
    render(<MarkdownRenderer content={content} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });

  it("renders code blocks correctly", () => {
    const content = "```javascript\nconst a = 1;\nconsole.log(a);\n```";
    render(<MarkdownRenderer content={content} />);
    const codeBlock = screen.getByText((c) => c.includes("const a = 1"));
    expect(codeBlock.tagName).toBe("CODE");
    expect(codeBlock.parentElement?.tagName).toBe("PRE");
  });
});
