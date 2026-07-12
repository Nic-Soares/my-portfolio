import React from "react";
import { BaseBlockComponentProps } from "./types.ts";
import { HeaderBlock } from "./HeaderBlock.tsx";
import { ParagraphBlock } from "./ParagraphBlock.tsx";
import { ImageBlock } from "./ImageBlock.tsx";
import { TableBlock } from "./TableBlock.tsx";
import { CodeBlock } from "./CodeBlock.tsx";
import { ListBlock } from "./ListBlock.tsx";
import { ContentGroupBlock } from "./ContentGroupBlock.tsx";
import { ColumnsBlock } from "./ColumnsBlock.tsx";
import { VideoBlock } from "./VideoBlock.tsx";

export const blockRegistry: Record<
  string,
  React.ComponentType<BaseBlockComponentProps>
> = {
  header: HeaderBlock as React.ComponentType<BaseBlockComponentProps>,
  paragraph: ParagraphBlock as React.ComponentType<BaseBlockComponentProps>,
  image: ImageBlock as React.ComponentType<BaseBlockComponentProps>,
  table: TableBlock as React.ComponentType<BaseBlockComponentProps>,
  code: CodeBlock as React.ComponentType<BaseBlockComponentProps>,
  list: ListBlock as React.ComponentType<BaseBlockComponentProps>,
  video: VideoBlock as React.ComponentType<BaseBlockComponentProps>,
  columns:
    ColumnsBlock as unknown as React.ComponentType<BaseBlockComponentProps>,
  "content-group":
    ContentGroupBlock as React.ComponentType<BaseBlockComponentProps>,
};
