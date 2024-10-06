import { DiagramEntityRecord } from "../domain/diagramEntityInterface";
import { TargetFileAndFunction } from "../domain/targetFileAndFunction";

export type Parser = {
  canApply: (targetFileAndFunction: TargetFileAndFunction) => boolean;
  getDiagramEntityRecords: (targetFileAndFunction: TargetFileAndFunction) => DiagramEntityRecord[];
}
