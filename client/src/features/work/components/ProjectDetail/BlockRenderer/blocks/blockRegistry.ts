import React from "react";
import { BaseBlockComponentProps } from "./types";
import { HeaderBlock } from "./HeaderBlock";
import { ParagraphBlock } from "./ParagraphBlock";
import { ImageBlock } from "./ImageBlock";
import { TableBlock } from "./TableBlock";
import { CodeBlock } from "./CodeBlock";
import { ListBlock } from "./ListBlock";
import { ContentGroupBlock } from "./ContentGroupBlock";
import { ColumnsBlock } from "./ColumnsBlock";
import { VideoBlock } from "./VideoBlock";

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
