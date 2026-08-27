import type React from "react";
import { BlockWrapper } from "../BlockWrapper.tsx";
import type { BlockComponentProps } from "./types.ts";

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
