import * as path from 'path';
import * as fs from 'fs';
import * as ts from 'typescript';
import { TSFileEntity, TSFunctionNameToNodeMap } from './tsEntityInterface';
import { processNode } from './tsNodeFileEntityProcessor/processNode';

const readFile = (filePath: string): string => {
  const filePathResolved = path.resolve(__dirname, `../../../${filePath}`);
  return fs.readFileSync(filePathResolved, 'utf8');
}

const getFileName = (filePath: string): string => {
  return path.basename(filePath);
}

const generateFunctionNameToNodeMap = (node: ts.Node): TSFunctionNameToNodeMap => {
  const fnNameToNodeMap: TSFunctionNameToNodeMap = {};

  const traverseAST = (node: ts.Node) => {
    processNode(node, fnNameToNodeMap);
    ts.forEachChild(node, (child) => traverseAST(child));
  }
  traverseAST(node);
  return fnNameToNodeMap;
}

export const generateTSFileEntity = (filePath: string): TSFileEntity => {
  const content = readFile(filePath);

  const ast = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  const fnNameToNodeMap = generateFunctionNameToNodeMap(ast);
  return {
    fileName: getFileName(filePath),
    fnNameToNodeMap,
  };
}
