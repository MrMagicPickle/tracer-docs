import type { Node } from 'typescript';

export type TSFunctionNameToNodeMap = Record<string, Node>;
export type TSFileEntity = {
  fileName: string;
  fnNameToNodeMap: TSFunctionNameToNodeMap;
};
