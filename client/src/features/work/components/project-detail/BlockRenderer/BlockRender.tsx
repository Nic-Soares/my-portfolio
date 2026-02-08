import React from "react";
import { ContentBlock } from "../../../data/types";
import { CodeBlock } from "../../../../../components/ui/CodeBlock/CodeBlock";
import { BlockWrapper } from "./BlockWrapper";

// Gera um ID único para cada bloco
const generateBlockId = (block: ContentBlock): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `block-${block.type}-${random}-${timestamp}`;
};

export const BlockRenderer = ({ block }: { block: ContentBlock }) => {
  // Gera ID automático para todos os blocos
  const blockId = generateBlockId(block);

  switch (block.type) {
    case "header": {
      const Tag = `h${block.level}` as "h1" | "h2" | "h3";
      return (
        <BlockWrapper id={blockId} isSnug={true}>
          {React.createElement(Tag, null, block.text)}
        </BlockWrapper>
      );
    }

    case "paragraph":
      // dangerouslySetInnerHTML permite usar <strong> dentro do texto do JSON
      return (
        <BlockWrapper id={blockId}>
          <p dangerouslySetInnerHTML={{ __html: block.text }} />
        </BlockWrapper>
      );

    case "image":
      return (
        <BlockWrapper id={blockId}>
          <div className="project-img-wrapper">
            <img src={block.src} alt={block.alt} />
          </div>
        </BlockWrapper>
      );

    case "code":
      return (
        <BlockWrapper id={blockId}>
          <CodeBlock code={block.code} title={block.title} />
        </BlockWrapper>
      );

    case "list":
      return (
        <BlockWrapper id={blockId}>
          <ul>
            {block.items.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </BlockWrapper>
      );

    case "content-group":
      // Tipo para agrupar múltiplos elementos HTML dentro do mesmo bloco
      return (
        <BlockWrapper
          id={blockId}
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );

    default:
      return null;
  }
};
