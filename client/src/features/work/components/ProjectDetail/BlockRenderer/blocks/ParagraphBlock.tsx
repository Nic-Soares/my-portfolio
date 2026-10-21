import type React from "react";
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
      <p
        className="body-large-plus"
        dangerouslySetInnerHTML={{ __html: block.text }}
      />
    </BlockWrapper>
  );
};
