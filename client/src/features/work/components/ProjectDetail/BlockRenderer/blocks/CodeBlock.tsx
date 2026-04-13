import React from "react";
import { BlockComponentProps } from "./types";
import { BlockWrapper } from "../BlockWrapper";
import { CodeBlock as UICodeBlock } from "../../../../../../components/ui/CodeBlock/CodeBlock";

export const CodeBlock: React.FC<
  BlockComponentProps<Extract<BlockComponentProps["block"], { type: "code" }>>
> = ({ block, blockId }) => {
  return (
    <BlockWrapper id={blockId}>
      <UICodeBlock code={block.code} title={block.title} />
    </BlockWrapper>
  );
};
