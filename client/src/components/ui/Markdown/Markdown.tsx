import {
  type Block,
  type Inline,
  isSafeHref,
  parseBlocks,
  parseInline,
} from "@shared/markdown.ts";
import { Fragment, type ReactNode } from "react";

function renderInline(nodes: Inline[]): ReactNode[] {
  return nodes.map((node, index) => {
    // Inline nodes have no identity beyond their position in the text
    const key = `${node.type}-${index}`;
    switch (node.type) {
      case "text":
        return <Fragment key={key}>{node.value}</Fragment>;
      case "strong":
        return <strong key={key}>{renderInline(node.children)}</strong>;
      case "em":
        return <em key={key}>{renderInline(node.children)}</em>;
      case "code":
        return <code key={key}>{node.value}</code>;
    }
    // A link; one that isn't https renders as its label only
    return isSafeHref(node.href) ? (
      <a key={key} href={node.href} target="_blank" rel="noopener noreferrer">
        {renderInline(node.children)}
      </a>
    ) : (
      <Fragment key={key}>{renderInline(node.children)}</Fragment>
    );
  });
}

function renderBlock(block: Block, index: number): ReactNode {
  if (block.type === "paragraph") {
    return <p key={`p-${index}`}>{renderInline(block.children)}</p>;
  }
  const List = block.ordered ? "ol" : "ul";
  return (
    <List key={`list-${index}`}>
      {block.items.map((item, itemIndex) => (
        <li key={`li-${itemIndex}`}>{renderInline(item)}</li>
      ))}
    </List>
  );
}

interface MarkdownProps {
  text: string;
  // Inline: bold, italic, code and links only, for text that sits inside an
  // element already (a paragraph, a list item, a table cell). Otherwise
  // paragraphs and lists too.
  inline?: boolean;
}

// Project text as React elements (ADR-008): never raw HTML
export function Markdown({ text, inline = false }: MarkdownProps) {
  return (
    <>
      {inline
        ? renderInline(parseInline(text))
        : parseBlocks(text).map(renderBlock)}
    </>
  );
}
