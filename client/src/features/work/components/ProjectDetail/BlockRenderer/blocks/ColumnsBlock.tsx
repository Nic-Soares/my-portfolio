import React from "react";
import { BlockComponentProps } from "./types.ts";
import { BlockWrapper } from "../BlockWrapper.tsx";
import { blockRegistry } from "./blockRegistry.ts";
import styles from "./ColumnsBlock.module.css";

export const ColumnsBlock: React.FC<
  BlockComponentProps<
    Extract<BlockComponentProps["block"], { type: "columns" }>
  >
> = ({ block, blockId }) => {
  const layoutFractions = block.layout
    ? block.layout.split("-").map(Number)
    : [];

  return (
    <BlockWrapper id={blockId} isSnug={block.snug}>
      <div className={styles.columnsContainer}>
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
