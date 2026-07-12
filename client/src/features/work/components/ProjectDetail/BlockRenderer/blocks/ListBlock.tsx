import React from "react";
import { BlockComponentProps } from "./types.ts";
import { BlockWrapper } from "../BlockWrapper.tsx";
import styles from "./ListBlock.module.css";

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
          <li
            key={idx}
            className={styles.listItem}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        ))}
      </ListTag>
    </BlockWrapper>
  );
};
