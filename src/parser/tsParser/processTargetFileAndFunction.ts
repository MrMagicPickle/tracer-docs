import { TargetFileAndFunction } from "../../domain/targetFileAndFunction";
import { getDb } from "./diagramEntityDb";
import { generateTSFileEntity } from "./generateTSFileEntity";
import { traceFunction } from "./traceFunction";

export const processTargetFileAndFunction = (targetFileAndFunction: TargetFileAndFunction) => {
  const { filePath, functionName } = targetFileAndFunction;
  const db = getDb();
  if (!db.fileNameToTSFileEntity[filePath]) {
    const fileEntity = generateTSFileEntity(filePath);
    db.addTsFileEntity(filePath, fileEntity);
  }

  const fileEntity = db.fileNameToTSFileEntity[filePath];
  /* TODO:
   * - Use file entity to find target function node.
   * - Begin second pass traversal to trace node.
   * -   Second pass might need to recurse.
  */
  const startNode = fileEntity.fnNameToNodeMap[functionName];
  if (!startNode) {
    console.error(`Function ${functionName} not found in file ${filePath}`);
    return getDb().records;
  }

  traceFunction(startNode, targetFileAndFunction);
  return getDb().records;
}