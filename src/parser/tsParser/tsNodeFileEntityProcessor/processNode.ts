import { TSFunctionNameToNodeMap } from "../tsEntityInterface";
import type { Node } from 'typescript';
import { arrowFunctionStrategy } from "./arrowFunctionStrategy";
import { functionDeclarationStrategy } from "./functionDeclarationStrategy";
import { Hydratees } from "./processorStrategyInterface";
import { importDeclarationStrategy } from "./importDeclarationStrategy";

export const processNode = (node: Node, hydratees: Hydratees) => {
  const strategies = [
    arrowFunctionStrategy,
    functionDeclarationStrategy,
    importDeclarationStrategy,
  ];

  const strategy = strategies.find(strategy => strategy.canApply(node));
  if (strategy) {
    strategy.apply(node, hydratees);
  }
};
