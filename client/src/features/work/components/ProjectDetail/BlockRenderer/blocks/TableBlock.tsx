import React from "react";
import { BlockComponentProps } from "./types.ts";
import { BlockWrapper } from "../BlockWrapper.tsx";
import styles from "./TableBlock.module.css";

export const TableBlock: React.FC<
  BlockComponentProps<Extract<BlockComponentProps["block"], { type: "table" }>>
> = ({ block, blockId, isNested }) => {
  return (
    <BlockWrapper id={blockId} isSnug={block.snug} isNested={isNested}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {block.headers.map((header, idx) => (
                <th
                  key={`th-${idx}`}
                  dangerouslySetInnerHTML={{ __html: header }}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIdx) => (
              <tr key={`tr-${rowIdx}`}>
                {row.map((cell, cellIdx) => (
                  <td
                    key={`td-${rowIdx}-${cellIdx}`}
                    dangerouslySetInnerHTML={{ __html: cell }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BlockWrapper>
  );
};
