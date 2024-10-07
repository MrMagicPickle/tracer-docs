import { Actor, CallExpressionDERecord } from "../../../domain/diagramEntityInterface";
import { TargetFileAndFunction } from "../../../domain/targetFileAndFunction";
import { getImportPath } from "../../../utils/getImportPath";
import { getDb } from "../diagramEntityDb";
import { processTargetFileAndFunction } from "../processTargetFileAndFunction";
import { traceFunction } from "../traceFunction";
import { TsNodeDiagramEntityProcessorStrategy } from "./processorStrategyInterface";
import * as ts from 'typescript';

const createCallExpressionDiagramEntityRecord = ({
  text,
  from,
  to,
}: {
  text: string,
  from: Actor,
  to: Actor,
}): CallExpressionDERecord => ({
  kind: 'CallExpression',
  text,
  from,
  to,
  arrow: from === to ? 'call' : 'callActivate',
});


export const callExpressionStrategy: TsNodeDiagramEntityProcessorStrategy = {
  canApply: (node: ts.Node) => ts.isCallExpression(node),
  apply:(node: ts.Node, targetFileAndFunction: TargetFileAndFunction) => {

    /* Handle case where the function doesnt exist in the file
       This can occur when using built-in functions like console.log
    */
    if (!ts.isCallExpression(node)) {
      console.warn('Invalid node for call expression strategy');
      return;
    }

    const entityRecordText = node.getFullText();
    const expression = node.expression;

    // Get the function or method name
    let functionName = '';
    if (ts.isIdentifier(expression)) {
      functionName = expression.text;  // Function name (e.g., greet)

    } else if (ts.isPropertyAccessExpression(expression)) {
      /* TODO: Tracing this a lot trickier */
      functionName = expression.getText();  // Method call (e.g., obj.sayHi)
    }

    const { filePath: currentFile } = targetFileAndFunction;
    const db = getDb();
    const currentFileEntity = db.fileNameToTSFileEntity[currentFile];
    const functionNode = currentFileEntity.fnNameToNodeMap[functionName];

    /* If function is not defined in current file */
    if (!functionNode) {
      /* We need to check the import statements */
      const importNode = currentFileEntity.importNameToNodeMap[functionName];
      if (!importNode) {
        /* This means we did not define this function.
         * it could be a built-in function.
         * ignore.
         */
        return;
      }
      /* Grab the filepath */
      const importPath = getImportPath(importNode);

      /* Add entity record to db. */
      const diagramEntityRecord = createCallExpressionDiagramEntityRecord({
        text: entityRecordText,
        from: targetFileAndFunction,
        /* TODO: We need to handle functionName when it gets aliased
         * e.g. import { greet as greetAlias } from './path.ts'
         */
        to: { filePath: importPath, functionName },
      });
      db.addEntityRecord(diagramEntityRecord);

      /* We need to begin the recursive traversal on the target file. */
      processTargetFileAndFunction({
        filePath: importPath,
        functionName,
      });
      return;
    }

    /* If function is defined in the current file
     * - Add to db.
     */
    const diagramEntityRecord = createCallExpressionDiagramEntityRecord({
      text: entityRecordText,
      from: targetFileAndFunction,
      to: { filePath: currentFile, functionName },
    });
    db.addEntityRecord(diagramEntityRecord);

    /* We need to recursively trace this function. */
    traceFunction(functionNode, {
      filePath: currentFile,
      functionName,
    });
  }
}