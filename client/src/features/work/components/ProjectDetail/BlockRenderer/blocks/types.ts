import { ContentBlock } from "../../../../data/types";

export interface BaseBlockComponentProps {
  block: ContentBlock;
  blockId?: string;
}

export interface BlockComponentProps<
  T extends ContentBlock = ContentBlock,
> extends BaseBlockComponentProps {
  block: T;
}
