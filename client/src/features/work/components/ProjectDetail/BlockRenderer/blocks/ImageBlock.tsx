import type React from "react";
import { Markdown } from "@/components/ui/Markdown/Markdown.tsx";
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
              srcSet={block.srcSet}
              sizes={block.sizes}
              alt={block.alt}
              // Case-study images sit below the hero: load as they come near
              loading="lazy"
              decoding="async"
              className={styles.image}
              // Figma "Block / Image" locks a ratio; 16:9 unless the data says
              style={{ aspectRatio: block.aspectRatio ?? "16 / 9" }}
            />
          </div>
          {block.caption && (
            <figcaption className={styles.figcaption}>
              <div className={styles.caption}>
                {/* One line stays caption-sized; paragraphs and lists get
                    the caption's paragraph and numbered-list styles */}
                <Markdown
                  text={block.caption}
                  inline={!/\n\s*\n|^\s*(\d+\.|[-*])\s/m.test(block.caption)}
                />
              </div>
            </figcaption>
          )}
        </figure>
      </div>
    </BlockWrapper>
  );
};
