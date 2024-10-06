import type { Node } from 'typescript';

export type TSFunctionNameToNodeMap = Record<string, Node>;
export type TSImportNameToNodeMap = Record<string, Node>;
export type TSFileEntity = {
  fileName: string;
  fnNameToNodeMap: TSFunctionNameToNodeMap;
  importNameToNodeMap: TSImportNameToNodeMap;
};
