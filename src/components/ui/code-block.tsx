"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Check, Copy, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; // assuming you have a Button component

interface CodeBlockProps {
  code: string;
  language?: string;
  fileName?: string;
  showLineNumbers?: boolean;
  maxHeight?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  fileName = "calendar.tsx",
  showLineNumbers = true,
  maxHeight = "max-h-[200px]",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    if (!codeRef.current?.textContent) return;

    await navigator.clipboard.writeText(codeRef.current.textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeLines = code.trim().split("\n");

  return (
    <div className="rounded-lg border border-border bg-black overflow-hidden max-w-2xl my-3">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileCode className="h-4 w-4" />
          <span>{fileName}</span>
        </div>
        <button
          onClick={handleCopy}
          className="rounded-md p-1 hover:bg-muted/30 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Code area */}
      <div
        className={cn(
          "relative p-4 transition-all duration-300",
          expanded ? "max-h-none overflow-auto" : `${maxHeight} overflow-hidden`
        )}
      >
        {/* Expand button overlay */}
        {!expanded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-black/60 to-black/80 z-10">
            <Button
              size="sm"
              variant="secondary"
              className="z-20"
              onClick={() => setExpanded(true)}
            >
              Expand Code
            </Button>
          </div>
        )}

        <pre
          ref={codeRef}
          className={cn(
            "text-sm font-mono text-white relative",
            showLineNumbers && "pl-12"
          )}
        >
          {showLineNumbers && (
            <div className="absolute left-4 top-4 select-none text-muted-foreground">
              {codeLines.map((_, i) => (
                <div key={i} className="text-right pr-4">
                  {i + 1}
                </div>
              ))}
            </div>
          )}
          <code className={`language-${language}`}>
            {codeLines.map((line, i) => (
              <div key={i} className="whitespace-pre">
                {formatCodeLine(line, language)}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

function formatCodeLine(line: string, language: string): React.ReactNode {
  if (language === "jsx" || language === "tsx") {
    const tokens: React.ReactNode[] = [];
    let lastIndex = 0;

    const patterns = [
      {
        regex:
          /\b(function|return|const|let|var|if|else|for|while|import|export|from|default|async|await)\b/g,
        className: "text-pink-500",
      }, // keywords
      {
        regex: /\b(Promise|setTimeout|console|log)\b/g,
        className: "text-yellow-400",
      }, // built-in/global
      { regex: /"[^"]*"|'[^']*'/g, className: "text-green-400" }, // strings
      { regex: /\b\d+\b/g, className: "text-orange-400" }, // numbers
      {
        regex: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g,
        className: "text-blue-400",
      }, // function calls
    ];

    while (lastIndex < line.length) {
      let nearestMatch: {
        index: number;
        match: string;
        className: string;
      } | null = null;

      for (const { regex, className } of patterns) {
        regex.lastIndex = lastIndex;
        const match = regex.exec(line);
        if (
          match &&
          (nearestMatch === null || match.index < nearestMatch.index)
        ) {
          nearestMatch = { index: match.index, match: match[0], className };
        }
      }

      if (!nearestMatch) {
        tokens.push(line.substring(lastIndex));
        break;
      }

      if (nearestMatch.index > lastIndex) {
        tokens.push(line.substring(lastIndex, nearestMatch.index));
      }

      tokens.push(
        <span key={nearestMatch.index} className={nearestMatch.className}>
          {nearestMatch.match}
        </span>
      );
      lastIndex = nearestMatch.index + nearestMatch.match.length;
    }

    return tokens;
  }

  return line;
}
