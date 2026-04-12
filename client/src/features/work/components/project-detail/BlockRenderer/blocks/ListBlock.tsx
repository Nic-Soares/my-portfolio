import React from "react";
import { BlockComponentProps } from "./types";
import { BlockWrapper } from "../BlockWrapper";

export const ListBlock: React.FC<
  BlockComponentProps<Extract<BlockComponentProps["block"], { type: "list" }>>
> = ({ block, blockId }) => {
  return (
    <BlockWrapper id={blockId}>
      <ul>
        {block.items.map((item, idx) => (
          <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>
    </BlockWrapper>
  );
};
