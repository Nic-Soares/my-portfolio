import { ContentBlock } from "../../../../data/types";

export interface BlockComponentProps<T extends ContentBlock = ContentBlock> {
  block: T;
  blockId: string;
}
