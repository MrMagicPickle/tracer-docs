import type { Node } from "typescript";
import { TSFunctionNameToNodeMap } from "../tsEntityInterface";

export type TsNodeFileEntityProcessorStrategy = {
  canApply: (node: Node) => boolean;
  apply: (node: Node, fnNameToNodeMap: TSFunctionNameToNodeMap) => void;
}
