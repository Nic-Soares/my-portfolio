import React from "react";
import { BaseBlockComponentProps } from "./types";
import { HeaderBlock } from "./HeaderBlock";
import { ParagraphBlock } from "./ParagraphBlock";
import { ImageBlock } from "./ImageBlock";
import { CodeBlock } from "./CodeBlock";
import { ListBlock } from "./ListBlock";
import { ContentGroupBlock } from "./ContentGroupBlock";

export const blockRegistry: Record<
  string,
  React.ComponentType<BaseBlockComponentProps>
> = {
  header: HeaderBlock as React.ComponentType<BaseBlockComponentProps>,
  paragraph: ParagraphBlock as React.ComponentType<BaseBlockComponentProps>,
  image: ImageBlock as React.ComponentType<BaseBlockComponentProps>,
  code: CodeBlock as React.ComponentType<BaseBlockComponentProps>,
  list: ListBlock as React.ComponentType<BaseBlockComponentProps>,
  "content-group":
    ContentGroupBlock as React.ComponentType<BaseBlockComponentProps>,
};
