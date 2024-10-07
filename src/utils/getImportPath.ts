import * as ts from 'typescript';
export const getImportPath = (importNode: ts.ImportDeclaration): string => {
  const path = importNode.moduleSpecifier.getText().replace(/"/g, '');
  if (path.endsWith('.ts')) {
    return path;
  }
  return path + '.ts';
}
