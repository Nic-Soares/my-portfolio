import React from "react";
import { BlockComponentProps } from "./types";
import { BlockWrapper } from "../BlockWrapper";

export const ContentGroupBlock: React.FC<
  BlockComponentProps<
    Extract<BlockComponentProps["block"], { type: "content-group" }>
  >
> = ({ block, blockId, isNested }) => {
  return (
    <BlockWrapper
      id={blockId}
      isNested={isNested}
      dangerouslySetInnerHTML={{ __html: block.html }}
    />
  );
};
