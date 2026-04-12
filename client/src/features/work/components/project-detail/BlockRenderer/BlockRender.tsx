import React from "react";
import { ContentBlock } from "../../../data/types";
import { blockRegistry } from "./blocks/blockRegistry";

// Gera um ID único para cada bloco
const generateBlockId = (block: ContentBlock): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `block-${block.type}-${random}-${timestamp}`;
};

export const BlockRenderer = ({ block }: { block: ContentBlock }) => {
  // Usa o ID fornecido no JSON (âncora) ou gera um automático
  const blockId = block.id || generateBlockId(block);

  const BlockComponent = blockRegistry[block.type];

  if (!BlockComponent) {
    console.warn(`Block type "${block.type}" is not registered.`);
    return null; // Fallback: return null if the block type is unknown
  }

  return <BlockComponent block={block} blockId={blockId} />;
};
