import { NodeEntity } from "../../domain/nodeEntityInterface";
import { TracerFunction } from "../../domain/tracerFunctionInterface";

import * as fs from 'fs';
import * as ts from 'typescript';

const parser = {
  canApply: (targetFunction: TracerFunction): boolean => {
    return targetFunction.filePath.endsWith('.ts');
  },

  getNodeEntities: (targetFunction: TracerFunction): NodeEntity[] => {
    const nodeEntities: NodeEntity[] = [];

    const ast = parseFileToAST(targetFunction.filePath);
    traverseAST(nodeEntities, ast);
    return nodeEntities;
  },
}

const parseFileToAST = (filePath: string): ts.SourceFile => {
  const content = fs.readFileSync(filePath, 'utf8');

  return ts.createSourceFile(
      filePath,
      content,
      ts.ScriptTarget.Latest, // ECMAScript version target
      true                    // Enable strict type checking
  );
}

const traverseAST = (nodeEntities: NodeEntity[], node: ts.Node, depth: number = 0): void => {
  // Check for arrow functions
  nodeEntities.push({
    name: node.getFullText() ?? 'Hello',
  });

  if (ts.isArrowFunction(node)) {
      const arrowFunctionText = node.getText();

      // Get the parent node to extract identifier name
      const parent = node.parent;

      if (ts.isVariableDeclaration(parent) && parent.name) {
          console.log(`${' '.repeat(depth)}Arrow function assigned to: ${parent.name.getText()}`);
      } else if (ts.isPropertyAssignment(parent) && ts.isIdentifier(parent.name)) {
          console.log(`${' '.repeat(depth)}Arrow function assigned to property: ${parent.name.getText()}`);
      } else {
          console.log(`${' '.repeat(depth)}Arrow function without identifier: ${arrowFunctionText}`);
      }
  }

  // Continue traversing child nodes
  ts.forEachChild(node, (childNode) => traverseAST(nodeEntities, childNode, depth + 2));
}


export default parser;
