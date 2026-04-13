import React from "react";
import { BlockComponentProps } from "./types";
import { BlockWrapper } from "../BlockWrapper";

export const ImageBlock: React.FC<
  BlockComponentProps<Extract<BlockComponentProps["block"], { type: "image" }>>
> = ({ block, blockId }) => {
  return (
    <BlockWrapper id={blockId}>
      <div className="project-img-wrapper">
        <img src={block.src} alt={block.alt} />
      </div>
    </BlockWrapper>
  );
};
