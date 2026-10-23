import type React from "react";
import { Markdown } from "@/components/ui/Markdown/Markdown.tsx";
import { BlockWrapper } from "../BlockWrapper.tsx";
import type { BlockComponentProps } from "./types.ts";
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
              className={styles.video}
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
              <span className={styles.caption}>
                <Markdown text={block.caption} inline />
              </span>
            </figcaption>
          )}
        </figure>
      </div>
    </BlockWrapper>
  );
};
