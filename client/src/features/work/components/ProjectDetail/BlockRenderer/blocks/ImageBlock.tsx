import type React from "react";
import { BlockWrapper } from "../BlockWrapper.tsx";
import styles from "./ImageBlock.module.css";
import type { BlockComponentProps } from "./types.ts";

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
              // Figma "Block / Image" locks a ratio; 16:9 unless the data says
              style={{ aspectRatio: block.aspectRatio ?? "16 / 9" }}
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
