import * as ts from 'typescript';
import type { TSFunctionNameToNodeMap } from '../tsEntityInterface';
import type { TsNodeFileEntityProcessorStrategy } from './processorStrategyInterface';

export const functionDeclarationStrategy: TsNodeFileEntityProcessorStrategy = {
  canApply: (node: ts.Node) => ts.isFunctionDeclaration(node),

  apply: (node: ts.Node, fnNameToNodeMap: TSFunctionNameToNodeMap) => {
    if (!ts.isFunctionDeclaration(node) || !node.name) {
      console.warn('Function Declaration node without name');
      return;
    }
    const functionName = node.name.getText();
    fnNameToNodeMap[functionName] = node;
  }
}