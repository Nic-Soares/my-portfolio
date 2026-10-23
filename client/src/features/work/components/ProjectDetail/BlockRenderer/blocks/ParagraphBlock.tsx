import type React from "react";
import { Markdown } from "@/components/ui/Markdown/Markdown.tsx";
import { BlockWrapper } from "../BlockWrapper.tsx";
import type { BlockComponentProps } from "./types.ts";

export const ParagraphBlock: React.FC<
  BlockComponentProps<
    Extract<BlockComponentProps["block"], { type: "paragraph" }>
  >
> = ({ block, blockId, isNested }) => {
  return (
    <BlockWrapper id={blockId} isSnug={block.snug} isNested={isNested}>
      {/* Figma "Block / Paragraph" Size=Large */}
      <p className="body-large-plus">
        <Markdown text={block.text} inline />
      </p>
    </BlockWrapper>
  );
};
