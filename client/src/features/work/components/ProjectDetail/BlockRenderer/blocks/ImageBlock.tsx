import React from "react";
import { BlockComponentProps } from "./types.ts";
import { BlockWrapper } from "../BlockWrapper.tsx";
import styles from "./ImageBlock.module.css";

export const ImageBlock: React.FC<
  BlockComponentProps<Extract<BlockComponentProps["block"], { type: "image" }>>
> = ({ block, blockId, isNested }) => {
  return (
    <BlockWrapper id={blockId} isNested={isNested}>
      <div className={styles.imageBlock}>
        <figure className={styles.figure}>
          <div className={styles.imageWrapper}>
            <img
              src={block.src}
              alt={block.alt}
              className={`${styles.image} ${block.className || ""}`.trim()}
              style={
                block.aspectRatio
                  ? { aspectRatio: block.aspectRatio }
                  : undefined
              }
            />
          </div>
          {block.caption && (
            <figcaption className={styles.figcaption}>
              <span
                className={styles.caption}
                dangerouslySetInnerHTML={{ __html: block.caption }}
              />
            </figcaption>
          )}
        </figure>
      </div>
    </BlockWrapper>
  );
};
