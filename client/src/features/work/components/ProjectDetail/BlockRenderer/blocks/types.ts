import { ContentBlock } from "../../../../data/project-data.types.ts";

export interface BaseBlockComponentProps {
  block: ContentBlock;
  blockId?: string;
  isNested?: boolean;
}

export interface BlockComponentProps<
  T extends ContentBlock = ContentBlock,
> extends BaseBlockComponentProps {
  block: T;
}
