import * as ts from 'typescript';
import { processNode } from './tsNodeDiagramEntityProcessor/processNode';
import { TargetFileAndFunction } from '../../domain/targetFileAndFunction';

export const traceFunction = (node: ts.Node, targetFileAndFunction: TargetFileAndFunction) => {
  console.log('traceFunction', node, targetFileAndFunction);
  processNode(node, targetFileAndFunction);
  ts.forEachChild(node, (child) => { traceFunction(child, targetFileAndFunction) });
}
