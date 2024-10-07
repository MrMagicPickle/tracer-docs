export type Actor = {
  filePath: string;
  functionName: string;
}

export type Arrow =
  | 'callActivate'
  | 'call'
  | 'returnDeactivate'
  | 'return';

export type DiagramEntityRecord =
  | CallExpressionDERecord
  | ReturnStatementDERecord;


export type CallExpressionDERecord = {
  kind: 'CallExpression'; // 213
  text: string; // node.getFullText()
  from: Actor;
  to: Actor;
  arrow: Arrow;
}

export type ReturnStatementDERecord = {
  kind: 'ReturnStatement'; // 253
  text: string; // node.getFullText()
  from: Actor;
  to: Actor;
  arrow: Arrow;
}
