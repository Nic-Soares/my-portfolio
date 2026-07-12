import React from "react";
import { ContentBlock } from "../../../data/project-data.types.ts";
import { blockRegistry } from "./blocks/blockRegistry.ts";

export const BlockRenderer = ({
  block,
  isNested,
}: {
  block: ContentBlock;
  isNested?: boolean;
}) => {
  const generatedId = React.useId();
  // Ensure every block has an ID so the copy link button is always shown
  const blockId = block.id || `block-${generatedId.replace(/:/g, "")}`;

  const BlockComponent = blockRegistry[block.type];

  if (!BlockComponent) {
    console.warn(`Block type "${block.type}" is not registered.`);
    return null; // Fallback: return null if the block type is unknown
  }

  return <BlockComponent block={block} blockId={blockId} isNested={isNested} />;
};
