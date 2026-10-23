import type React from "react";
import { Markdown } from "@/components/ui/Markdown/Markdown.tsx";
import { BlockWrapper } from "../BlockWrapper.tsx";
import styles from "./TableBlock.module.css";
import type { BlockComponentProps } from "./types.ts";

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
                <th key={`th-${idx}`}>
                  <Markdown text={header} inline />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIdx) => (
              <tr key={`tr-${rowIdx}`}>
                {row.map((cell, cellIdx) => (
                  <td key={`td-${rowIdx}-${cellIdx}`}>
                    <Markdown text={cell} inline />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BlockWrapper>
  );
};
