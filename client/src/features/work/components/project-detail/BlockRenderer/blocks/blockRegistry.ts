import React from "react";
import { BlockComponentProps } from "./types";
import { HeaderBlock } from "./HeaderBlock";
import { ParagraphBlock } from "./ParagraphBlock";
import { ImageBlock } from "./ImageBlock";
import { CodeBlock } from "./CodeBlock";
import { ListBlock } from "./ListBlock";
import { ContentGroupBlock } from "./ContentGroupBlock";

export const blockRegistry: Record<
  string,
  React.ComponentType<BlockComponentProps<any>>
> = {
  header: HeaderBlock as React.ComponentType<BlockComponentProps<any>>,
  paragraph: ParagraphBlock as React.ComponentType<BlockComponentProps<any>>,
  image: ImageBlock as React.ComponentType<BlockComponentProps<any>>,
  code: CodeBlock as React.ComponentType<BlockComponentProps<any>>,
  list: ListBlock as React.ComponentType<BlockComponentProps<any>>,
  "content-group": ContentGroupBlock as React.ComponentType<
    BlockComponentProps<any>
  >,
};
