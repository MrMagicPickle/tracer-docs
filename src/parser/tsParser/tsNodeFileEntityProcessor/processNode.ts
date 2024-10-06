import { TSFunctionNameToNodeMap } from "../tsEntityInterface";
import type { Node } from 'typescript';
import { arrowFunctionStrategy } from "./arrowFunctionStrategy";
import { functionDeclarationStrategy } from "./functionDeclarationStrategy";

export const processNode = (node: Node, fnNameToNodeMap: TSFunctionNameToNodeMap) => {
  const strategies = [
    arrowFunctionStrategy,
    functionDeclarationStrategy,
  ];

  const strategy = strategies.find(strategy => strategy.canApply(node));
  if (strategy) {
    strategy.apply(node, fnNameToNodeMap);
  }
};