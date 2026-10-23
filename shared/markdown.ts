// Minimal Markdown for project text (ADR-008): **bold**, *italic*, `code`,
// [links](https://…), paragraphs and lists. It parses to a small tree that
// the client renders as React elements, so no text ever becomes raw HTML.
// Anything it doesn't recognize stays literal text.

export type Inline =
  | { type: "text"; value: string }
  | { type: "strong"; children: Inline[] }
  | { type: "em"; children: Inline[] }
  | { type: "code"; value: string }
  | { type: "link"; href: string; children: Inline[] };

export type Block =
  | { type: "paragraph"; children: Inline[] }
  | { type: "list"; ordered: boolean; items: Inline[][] };

const ESCAPABLE = "\\*`[]()";
const UNORDERED_ITEM = /^\s*[-*]\s+(.*)$/;
const ORDERED_ITEM = /^\s*\d+\.\s+(.*)$/;

export function parseInline(text: string): Inline[] {
  const nodes: Inline[] = [];
  let buffer = "";
  const flush = () => {
    if (buffer) nodes.push({ type: "text", value: buffer });
    buffer = "";
  };

  let i = 0;
  while (i < text.length) {
    const char = text[i];

    if (char === "\\" && ESCAPABLE.includes(text[i + 1] ?? "")) {
      buffer += text[i + 1];
      i += 2;
      continue;
    }

    if (char === "`") {
      const end = text.indexOf("`", i + 1);
      if (end > i + 1) {
        flush();
        nodes.push({ type: "code", value: text.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }

    if (char === "[") {
      const labelEnd = text.indexOf("]", i + 1);
      if (labelEnd > i && text[labelEnd + 1] === "(") {
        const hrefEnd = text.indexOf(")", labelEnd + 2);
        if (hrefEnd > labelEnd) {
          flush();
          nodes.push({
            type: "link",
            href: text.slice(labelEnd + 2, hrefEnd).trim(),
            children: parseInline(text.slice(i + 1, labelEnd)),
          });
          i = hrefEnd + 1;
          continue;
        }
      }
    }

    if (text.startsWith("**", i)) {
      const end = text.indexOf("**", i + 2);
      if (end > i + 2) {
        flush();
        nodes.push({
          type: "strong",
          children: parseInline(text.slice(i + 2, end)),
        });
        i = end + 2;
        continue;
      }
    }

    if (char === "*") {
      const end = findSingleStar(text, i + 1);
      if (end > i + 1) {
        flush();
        nodes.push({ type: "em", children: parseInline(text.slice(i + 1, end)) });
        i = end + 1;
        continue;
      }
    }

    buffer += char;
    i += 1;
  }
  flush();
  return nodes;
}

// The closing `*` of an italic span, skipping `**` pairs inside it
function findSingleStar(text: string, from: number): number {
  for (let i = from; i < text.length; i++) {
    if (text[i] !== "*") continue;
    if (text[i + 1] === "*") {
      const end = text.indexOf("**", i + 2);
      if (end === -1) return -1;
      i = end + 1;
      continue;
    }
    return i;
  }
  return -1;
}

export function parseBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const closeParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({
        type: "paragraph",
        children: parseInline(paragraph.join(" ")),
      });
    }
    paragraph = [];
  };
  const closeList = () => {
    if (list) {
      blocks.push({
        type: "list",
        ordered: list.ordered,
        items: list.items.map(parseInline),
      });
    }
    list = null;
  };

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    const ordered = ORDERED_ITEM.exec(rawLine);
    const unordered = ordered ? null : UNORDERED_ITEM.exec(rawLine);
    const item = ordered ?? unordered;

    if (item) {
      closeParagraph();
      const isOrdered = Boolean(ordered);
      if (list && list.ordered !== isOrdered) closeList();
      list ??= { ordered: isOrdered, items: [] };
      list.items.push(item[1].trim());
    } else if (line === "") {
      closeParagraph();
      closeList();
    } else {
      closeList();
      paragraph.push(line);
    }
  }
  closeParagraph();
  closeList();
  return blocks;
}

const HTML_TAG = /<\/?[a-zA-Z][^>]*>/;
const HTML_ENTITY = /&(#\d+|#x[0-9a-f]+|[a-z]+);/i;
const CODE_SPAN = /`[^`]+`/g;

// Problems the content schema rejects: HTML tags or entities outside `code`,
// and links that aren't https
export function markdownProblems(text: string): string[] {
  const problems: string[] = [];
  const prose = text.replace(CODE_SPAN, "");
  if (HTML_TAG.test(prose)) problems.push("HTML tags are not allowed");
  if (HTML_ENTITY.test(prose)) {
    problems.push("HTML entities are not allowed; write the character itself");
  }
  const visit = (nodes: Inline[]) => {
    for (const node of nodes) {
      if (node.type === "link") {
        if (!isSafeHref(node.href)) {
          problems.push(`Link must use https: ${node.href}`);
        }
        visit(node.children);
      } else if (node.type === "strong" || node.type === "em") {
        visit(node.children);
      }
    }
  };
  for (const block of parseBlocks(text)) {
    if (block.type === "paragraph") visit(block.children);
    else for (const item of block.items) visit(item);
  }
  return problems;
}

export function isSafeHref(href: string): boolean {
  return /^https:\/\/[^\s]+$/i.test(href);
}
