import React from "react";
import { BlockComponentProps } from "./types";
import { BlockWrapper } from "../BlockWrapper";

export const HeaderBlock: React.FC<
  BlockComponentProps<Extract<BlockComponentProps["block"], { type: "header" }>>
> = ({ block, blockId }) => {
  const Tag = `h${block.level}` as "h1" | "h2" | "h3";
  return (
    <BlockWrapper id={blockId} isSnug={true}>
      {React.createElement(Tag, null, block.text)}
    </BlockWrapper>
  );
};
