import type { ImportDeclaration, Node } from 'typescript';

export type TSFunctionNameToNodeMap = Record<string, Node>;
export type TSImportNameToNodeMap = Record<string, ImportDeclaration>;
export type TSFileEntity = {
  fileName: string;
  fnNameToNodeMap: TSFunctionNameToNodeMap;
  importNameToNodeMap: TSImportNameToNodeMap;
};
