import * as ts from 'typescript';
import type { Hydratees, TsNodeFileEntityProcessorStrategy } from './processorStrategyInterface';

export const importDeclarationStrategy: TsNodeFileEntityProcessorStrategy = {
  canApply: (node: ts.Node) => ts.isImportDeclaration(node),

  apply: (node: ts.Node, hydratees: Hydratees) => {
    if (!ts.isImportDeclaration(node) || !node.importClause) {
      console.warn('Invalid node for import declaration strategy');
      return;
    }

    const importClause = node.importClause;
    if (importClause.name) {
      /* Handle default imports (import abc from './path.ts') */
      const importName = importClause.name.getText();
      hydratees.importNameToNodeMap[importName] = node;
    } else if (importClause.namedBindings) {
      /* Handle specific named imports (import { abc, xyz } from './path.ts) */
      const namedBindings = importClause.namedBindings;
      if (ts.isNamedImports(namedBindings)) {
        namedBindings.elements.forEach(el => {
          /* TODO: Handle for namespace for namedImports
           * import { abc, xyz as xyzAlias } from './path.ts'
           */
          const importName = el.name.getText();
          hydratees.importNameToNodeMap[importName] = node;
        });
      } else if (ts.isNamespaceImport(namedBindings)) {
        /* Handle namespace imports (import * as abc from './path.ts') */
        const importName = namedBindings.name.getText();
        hydratees.importNameToNodeMap[importName] = node;
      }
    }
  }
}