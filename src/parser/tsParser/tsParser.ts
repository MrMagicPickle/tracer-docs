import { TargetFileAndFunction } from "../../domain/targetFileAndFunction";

import * as fs from 'fs';
import * as ts from 'typescript';
import * as path from 'path';
import { Parser } from "../parserInterface";
import { DiagramEntityRecord } from "../../domain/diagramEntityInterface";
import { getDb } from "./diagramEntityDb";
import { generateTSFileEntity } from "./generateTSFileEntity";

const parser: Parser = {
  canApply: (targetFunction: TargetFileAndFunction): boolean => {
    return targetFunction.filePath.endsWith('.ts');
  },

  getDiagramEntityRecords: (targetFunction: TargetFileAndFunction): DiagramEntityRecord[] => {
    const db = getDb();
    const fileEntity = generateTSFileEntity(targetFunction.filePath);
    console.log(fileEntity, 'root << file entity');
    /* TODO:
     * - Use file entity to find target function node.
     * - Begin second pass traversal to trace node.
     * -   Second pass might need to recurse.
    */
    return db.records;
  },
}

const parseFileToAST = (filePath: string): ts.SourceFile => {
  const filePathResolved = path.resolve(__dirname, `../../../${filePath}`);
  const content = fs.readFileSync(filePathResolved, 'utf8');

  return ts.createSourceFile(
      filePath,
      content,
      ts.ScriptTarget.Latest, // ECMAScript version target
      true                    // Enable strict type checking
  );
}

export default parser;
