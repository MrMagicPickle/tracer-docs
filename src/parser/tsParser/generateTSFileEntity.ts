import * as path from 'path';
import * as fs from 'fs';
import * as ts from 'typescript';
import { TSFileEntity, TSFunctionNameToNodeMap, TSImportNameToNodeMap } from './tsEntityInterface';
import { processNode } from './tsNodeFileEntityProcessor/processNode';

const readFile = (filePath: string): string => {
  const filePathResolved = path.resolve(__dirname, `../../../${filePath}`);
  return fs.readFileSync(filePathResolved, 'utf8');
}

const getFileName = (filePath: string): string => {
  return path.basename(filePath);
}

const processAST = (node: ts.Node): {
  fnNameToNodeMap: TSFunctionNameToNodeMap,
  importNameToNodeMap: TSImportNameToNodeMap,
} => {

  const fnNameToNodeMap: TSFunctionNameToNodeMap = {};
  const importNameToNodeMap: TSImportNameToNodeMap = {};

  const hydratees = {
    fnNameToNodeMap,
    importNameToNodeMap,
  };
  const traverseAST = (node: ts.Node) => {
    processNode(node, hydratees);
    ts.forEachChild(node, (child) => traverseAST(child));
  }
  traverseAST(node);
  return {
    fnNameToNodeMap,
    importNameToNodeMap,
  };
}

export const generateTSFileEntity = (filePath: string): TSFileEntity => {
  const content = readFile(filePath);

  const ast = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  const {
    fnNameToNodeMap,
    importNameToNodeMap,
  } = processAST(ast);

  return {
    fileName: getFileName(filePath),
    fnNameToNodeMap,
    importNameToNodeMap,
  };
}
