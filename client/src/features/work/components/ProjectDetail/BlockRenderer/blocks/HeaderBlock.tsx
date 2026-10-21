import React from "react";
import { BlockWrapper } from "../BlockWrapper.tsx";
import type { BlockComponentProps } from "./types.ts";

export const HeaderBlock: React.FC<
  BlockComponentProps<Extract<BlockComponentProps["block"], { type: "header" }>>
> = ({ block, blockId, isNested }) => {
  const Tag = `h${block.level}` as "h1" | "h2" | "h3";
  return (
    <BlockWrapper
      id={blockId}
      isSnug={true}
      isNested={isNested}
      startsSection={block.level === 2}
    >
      {React.createElement(Tag, null, block.text)}
    </BlockWrapper>
  );
};
