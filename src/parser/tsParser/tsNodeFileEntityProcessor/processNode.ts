import { TSFunctionNameToNodeMap } from "../tsEntityInterface";
import type { Node } from 'typescript';
import { arrowFunctionStrategy } from "./arrowFunctionStrategy";

export const processNode = (node: Node, fnNameToNodeMap: TSFunctionNameToNodeMap) => {
  const strategies = [
    arrowFunctionStrategy,
  ]

  const strategy = strategies.find(strategy => strategy.canApply(node));
  if (strategy) {
    strategy.apply(node, fnNameToNodeMap);
  }
};