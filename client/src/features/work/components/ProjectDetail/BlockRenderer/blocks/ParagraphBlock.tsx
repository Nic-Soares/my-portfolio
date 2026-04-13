import React from "react";
import { BlockComponentProps } from "./types";
import { BlockWrapper } from "../BlockWrapper";

export const ParagraphBlock: React.FC<
  BlockComponentProps<
    Extract<BlockComponentProps["block"], { type: "paragraph" }>
  >
> = ({ block, blockId }) => {
  return (
    <BlockWrapper id={blockId}>
      <p dangerouslySetInnerHTML={{ __html: block.text }} />
    </BlockWrapper>
  );
};
