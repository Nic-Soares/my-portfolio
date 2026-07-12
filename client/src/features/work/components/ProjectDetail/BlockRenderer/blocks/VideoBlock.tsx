import React from "react";
import { BlockComponentProps } from "./types.ts";
import { BlockWrapper } from "../BlockWrapper.tsx";
import styles from "./VideoBlock.module.css";

export const VideoBlock: React.FC<
  BlockComponentProps<Extract<BlockComponentProps["block"], { type: "video" }>>
> = ({ block, blockId, isNested }) => {
  return (
    <BlockWrapper id={blockId} isSnug={block.snug} isNested={isNested}>
      <div className={styles.videoBlock}>
        <figure className={styles.figure}>
          <div className={styles.videoWrapper}>
            <video
              src={block.src}
              className={`${styles.video} ${block.className || ""}`.trim()}
              autoPlay
              loop
              muted
              playsInline
              style={
                block.aspectRatio
                  ? { aspectRatio: block.aspectRatio }
                  : undefined
              }
              aria-label={block.alt}
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
