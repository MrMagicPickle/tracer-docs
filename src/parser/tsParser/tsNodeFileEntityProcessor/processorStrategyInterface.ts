import type { Node } from "typescript";
import { TSFunctionNameToNodeMap, TSImportNameToNodeMap } from "../tsEntityInterface";

export type Hydratees = {
  fnNameToNodeMap: TSFunctionNameToNodeMap;
  importNameToNodeMap: TSImportNameToNodeMap;
};

export type TsNodeFileEntityProcessorStrategy = {
  canApply: (node: Node) => boolean;
  apply: (node: Node, hydratees: Hydratees) => void;
}
