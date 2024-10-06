import * as ts from 'typescript';
import type { Hydratees, TsNodeFileEntityProcessorStrategy } from './processorStrategyInterface';

export const importDeclarationStrategy: TsNodeFileEntityProcessorStrategy = {
  canApply: (node: ts.Node) => ts.isImportDeclaration(node),

  apply: (node: ts.Node, hydratees: Hydratees) => {
    /**
     * TODO:
     * - implement import logic.
     */
  }
}