import React from "react";
import { BlockComponentProps } from "./types.ts";
import { BlockWrapper } from "../BlockWrapper.tsx";

export const HeaderBlock: React.FC<
  BlockComponentProps<Extract<BlockComponentProps["block"], { type: "header" }>>
> = ({ block, blockId, isNested }) => {
  const Tag = `h${block.level}` as "h1" | "h2" | "h3";
  return (
    <BlockWrapper id={blockId} isSnug={true} isNested={isNested}>
      {React.createElement(Tag, null, block.text)}
    </BlockWrapper>
  );
};
