import { Node } from "typescript";
import { TargetFileAndFunction } from "../../../domain/targetFileAndFunction";

export type TsNodeDiagramEntityProcessorStrategy = {
  canApply: (node: Node) => boolean;
  apply: (node: Node, targetFileAndFunction: TargetFileAndFunction) => void;
}
