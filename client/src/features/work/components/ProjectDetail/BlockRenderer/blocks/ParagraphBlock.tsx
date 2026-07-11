import React from "react";
import { BlockComponentProps } from "./types";
import { BlockWrapper } from "../BlockWrapper";

export const ParagraphBlock: React.FC<
  BlockComponentProps<
    Extract<BlockComponentProps["block"], { type: "paragraph" }>
  >
> = ({ block, blockId, isNested }) => {
  return (
    <BlockWrapper id={blockId} isSnug={block.snug} isNested={isNested}>
      <p dangerouslySetInnerHTML={{ __html: block.text }} />
    </BlockWrapper>
  );
};
