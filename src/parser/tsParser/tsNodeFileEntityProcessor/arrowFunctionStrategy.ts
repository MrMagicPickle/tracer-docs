import * as ts from 'typescript';
import type { Hydratees, TsNodeFileEntityProcessorStrategy } from './processorStrategyInterface';

export const arrowFunctionStrategy: TsNodeFileEntityProcessorStrategy = {
  canApply: (node: ts.Node) => ts.isArrowFunction(node),

  apply: (node: ts.Node, hydratees: Hydratees) => {
    // Get the parent node to extract identifier name
    const parent = node.parent;

    let functionName = '';
    if (ts.isVariableDeclaration(parent) && parent.name) {
      functionName = parent.name.getText();
    } else if (ts.isPropertyAssignment(parent) && ts.isIdentifier(parent.name)) {
      functionName = parent.name.getText();
    } else {
      functionName = node.getText();
    }

    hydratees.fnNameToNodeMap[functionName] = node;
  }
}