import React from "react";
import { BlockComponentProps } from "./types.ts";
import { BlockWrapper } from "../BlockWrapper.tsx";
import { CodeBlock as UICodeBlock } from "../../../../../../components/ui/CodeBlock/CodeBlock.tsx";

export const CodeBlock: React.FC<
  BlockComponentProps<Extract<BlockComponentProps["block"], { type: "code" }>>
> = ({ block, blockId, isNested }) => {
  return (
    <BlockWrapper id={blockId} isNested={isNested}>
      <UICodeBlock code={block.code} title={block.title} />
    </BlockWrapper>
  );
};
