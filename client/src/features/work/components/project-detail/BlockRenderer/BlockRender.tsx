import React from "react";
import { ContentBlock } from "../../../data/types";
import { blockRegistry } from "./blocks/blockRegistry";

export const BlockRenderer = ({ block }: { block: ContentBlock }) => {
  // Use Option A: Only rely on the optional block.id for deterministic anchors
  const blockId = block.id;

  const BlockComponent = blockRegistry[block.type];

  if (!BlockComponent) {
    console.warn(`Block type "${block.type}" is not registered.`);
    return null; // Fallback: return null if the block type is unknown
  }

  return <BlockComponent block={block} blockId={blockId} />;
};
