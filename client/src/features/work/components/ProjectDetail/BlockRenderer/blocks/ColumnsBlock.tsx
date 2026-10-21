import type React from "react";
import { BlockWrapper } from "../BlockWrapper.tsx";
import { blockRegistry } from "./blockRegistry.ts";
import styles from "./ColumnsBlock.module.css";
import type { BlockComponentProps } from "./types.ts";

const TEXT_BLOCKS = new Set(["header", "paragraph", "list", "content-group"]);

export const ColumnsBlock: React.FC<
  BlockComponentProps<
    Extract<BlockComponentProps["block"], { type: "columns" }>
  >
> = ({ block, blockId }) => {
  // Media-only rows (screens, code) stay side by side on Medium, as in the
  // Figma Spotify frames; text + media stacks there (Block / Media Columns)
  const hasText = block.columns.some((column) =>
    column.some((inner) => TEXT_BLOCKS.has(inner.type)),
  );
  const layoutFractions = block.layout
    ? block.layout.split("-").map(Number)
    : [];

  return (
    <BlockWrapper id={blockId} isSnug={block.snug}>
      <div
        className={`${styles.columnsContainer} ${hasText ? styles["columnsContainer--text"] : ""}`}
      >
        {block.columns.map((column, colIdx) => (
          <div
            key={`col-${colIdx}`}
            className={styles.column}
            style={
              layoutFractions[colIdx]
                ? { flex: layoutFractions[colIdx] }
                : undefined
            }
          >
            {column.map((innerBlock, blockIdx) => {
              const BlockComponent = blockRegistry[innerBlock.type];
              if (!BlockComponent) return null;

              return (
                <BlockComponent
                  key={`inner-${colIdx}-${blockIdx}`}
                  block={innerBlock}
                  blockId={innerBlock.id}
                  isNested={true}
                />
              );
            })}
          </div>
        ))}
      </div>
    </BlockWrapper>
  );
};
