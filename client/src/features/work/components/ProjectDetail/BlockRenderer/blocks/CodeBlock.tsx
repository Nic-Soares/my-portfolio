import type React from "react";
import { CodeBlock as UICodeBlock } from "../../../../../../components/ui/CodeBlock/CodeBlock.tsx";
import { BlockWrapper } from "../BlockWrapper.tsx";
import type { BlockComponentProps } from "./types.ts";

export const CodeBlock: React.FC<
  BlockComponentProps<Extract<BlockComponentProps["block"], { type: "code" }>>
> = ({ block, blockId, isNested }) => {
  return (
    <BlockWrapper id={blockId} isNested={isNested}>
      <UICodeBlock code={block.code} title={block.title} />
    </BlockWrapper>
  );
};
