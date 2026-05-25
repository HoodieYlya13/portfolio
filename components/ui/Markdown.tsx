import React from "react";

interface MarkdownProps {
  content: string | null | undefined;
  className?: string;
}

export function renderTextWithInlineFormatting(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  while (remaining) {
    const boldIdx = remaining.indexOf("**");
    const codeIdx = remaining.indexOf("`");
    const linkIdx = remaining.indexOf("[");

    if (boldIdx === -1 && codeIdx === -1 && linkIdx === -1) {
      parts.push(remaining);
      break;
    }

    let tokenType: "bold" | "code" | "link" = "bold";
    let tokenIdx = Infinity;

    if (boldIdx !== -1 && boldIdx < tokenIdx) {
      tokenType = "bold";
      tokenIdx = boldIdx;
    }
    if (codeIdx !== -1 && codeIdx < tokenIdx) {
      tokenType = "code";
      tokenIdx = codeIdx;
    }
    if (linkIdx !== -1 && linkIdx < tokenIdx) {
      tokenType = "link";
      tokenIdx = linkIdx;
    }

    if (tokenIdx > 0) parts.push(remaining.substring(0, tokenIdx));

    const tokenLength = tokenType === "bold" ? 2 : 1;
    remaining = remaining.substring(tokenIdx + tokenLength);

    if (tokenType === "bold") {
      const closeIdx = remaining.indexOf("**");
      if (closeIdx === -1) {
        parts.push("**" + remaining);
        break;
      }
      const insideText = remaining.substring(0, closeIdx);
      remaining = remaining.substring(closeIdx + 2);
      parts.push(
        <strong key={keyIdx++} className="font-extrabold text-foreground">
          {insideText}
        </strong>,
      );
    } else if (tokenType === "code") {
      const closeIdx = remaining.indexOf("`");
      if (closeIdx === -1) {
        parts.push("`" + remaining);
        break;
      }
      const insideText = remaining.substring(0, closeIdx);
      remaining = remaining.substring(closeIdx + 1);
      parts.push(
        <code
          key={keyIdx++}
          className="px-1.5 py-0.5 rounded bg-muted/80 text-primary font-mono text-xs"
        >
          {insideText}
        </code>,
      );
    } else if (tokenType === "link") {
      const closeBracketIdx = remaining.indexOf("]");
      if (closeBracketIdx === -1) {
        parts.push("[" + remaining);
        break;
      }
      const linkText = remaining.substring(0, closeBracketIdx);
      const afterBracket = remaining.substring(closeBracketIdx + 1);

      if (afterBracket.startsWith("(")) {
        const closeParenIdx = afterBracket.indexOf(")");
        if (closeParenIdx !== -1) {
          const href = afterBracket.substring(1, closeParenIdx);
          remaining = afterBracket.substring(closeParenIdx + 1);
          parts.push(
            <a
              key={keyIdx++}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              {linkText}
            </a>,
          );
          continue;
        }
      }

      parts.push("[" + linkText + "]");
      remaining = afterBracket;
    }
  }

  return <>{parts}</>;
}

export function Markdown({ content, className = "" }: MarkdownProps) {
  if (!content) return null;

  const blocks = content.split(/\n\s*\n/);

  return (
    <div className={`space-y-4 ${className}`}>
      {blocks.map((block, blockIdx) => {
        const trimmedBlock = block.trim();
        if (!trimmedBlock) return null;

        const lines = trimmedBlock.split("\n");

        const isBulletList = lines.some((line) => /^\s*[-*]\s+/.test(line));
        const isNumberedList = lines.some((line) => /^\s*\d+\.\s+/.test(line));

        if (isBulletList) {
          return (
            <ul
              key={blockIdx}
              className="list-disc pl-5 my-3 space-y-2 text-muted-foreground"
            >
              {lines.map((line, lineIdx) => {
                const cleanLine = line.replace(/^\s*[-*]\s+/, "");
                return (
                  <li key={lineIdx} className="leading-relaxed">
                    {renderTextWithInlineFormatting(cleanLine)}
                  </li>
                );
              })}
            </ul>
          );
        }

        if (isNumberedList) {
          return (
            <ol
              key={blockIdx}
              className="list-decimal pl-5 my-3 space-y-2 text-muted-foreground"
            >
              {lines.map((line, lineIdx) => {
                const cleanLine = line.replace(/^\s*\d+\.\s+/, "");
                return (
                  <li key={lineIdx} className="leading-relaxed">
                    {renderTextWithInlineFormatting(cleanLine)}
                  </li>
                );
              })}
            </ol>
          );
        }

        return (
          <p key={blockIdx} className="leading-relaxed last:mb-0">
            {renderTextWithInlineFormatting(trimmedBlock)}
          </p>
        );
      })}
    </div>
  );
}
