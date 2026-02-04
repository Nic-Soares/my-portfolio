import React from "react";
import { ContentBlock } from "../../../data/types";
import { CodeBlock } from "../../../../../components/ui/CodeBlock/CodeBlock";

export const BlockRenderer = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case "header": {
      const Tag = `h${block.level}` as "h1" | "h2" | "h3";
      return React.createElement(Tag, { id: block.id }, block.text);
    }

    case "paragraph":
      // dangerouslySetInnerHTML permite usar <strong> dentro do texto do JSON
      return <p dangerouslySetInnerHTML={{ __html: block.text }} />;

    case "image":
      return (
        <div className="project-img-wrapper">
          <img src={block.src} alt={block.alt} />
        </div>
      );

    case "code":
      return <CodeBlock code={block.code} title={block.title} />;

    case "list":
      return (
        <ul>
          {block.items.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );

    default:
      return null;
  }
};
