import * as ts from 'typescript';
import type { TSFunctionNameToNodeMap } from '../tsEntityInterface';
import type { TsNodeFileEntityProcessorStrategy } from './processorStrategyInterface';

export const arrowFunctionStrategy: TsNodeFileEntityProcessorStrategy = {
  canApply: (node: ts.Node) => ts.isArrowFunction(node),

  apply: (node: ts.Node, fnNameToNodeMap: TSFunctionNameToNodeMap) => {
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

    fnNameToNodeMap[functionName] = node;
  }
}