import type React from "react";
import { Markdown } from "@/components/ui/Markdown/Markdown.tsx";
import { BlockWrapper } from "../BlockWrapper.tsx";
import styles from "./ListBlock.module.css";
import type { BlockComponentProps } from "./types.ts";

export const ListBlock: React.FC<
  BlockComponentProps<Extract<BlockComponentProps["block"], { type: "list" }>>
> = ({ block, blockId, isNested }) => {
  const isOrdered = block.ordered;
  const ListTag = isOrdered ? "ol" : "ul";
  const listClass = isOrdered ? styles.orderedList : styles.unorderedList;

  return (
    <BlockWrapper id={blockId} isSnug={block.snug} isNested={isNested}>
      <ListTag className={`${styles.listBlock} ${listClass}`}>
        {block.items.map((item, idx) => (
          <li key={idx} className={`body-large-plus ${styles.listItem}`}>
            <Markdown text={item} inline />
          </li>
        ))}
      </ListTag>
    </BlockWrapper>
  );
};
