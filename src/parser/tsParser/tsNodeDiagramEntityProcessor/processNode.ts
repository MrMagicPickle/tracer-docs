import { Node } from "typescript";
import { TsNodeDiagramEntityProcessorStrategy } from "./processorStrategyInterface";
import { callExpressionStrategy } from "./callExpressionStrategy";
import { TargetFileAndFunction } from "../../../domain/targetFileAndFunction";

export const processNode = (node: Node, targetFileAndFunction: TargetFileAndFunction) => {
  const strategies: TsNodeDiagramEntityProcessorStrategy[] = [
    callExpressionStrategy,
  ];

  const strategy = strategies.find(strategy => strategy.canApply(node));
  if (strategy) {
    strategy.apply(node, targetFileAndFunction);
  }
};
