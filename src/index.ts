import { TargetFileAndFunction } from "./domain/targetFileAndFunction";
import tsParser from './parser/tsParser/tsParser';

const init = (targetFileAndFunction: TargetFileAndFunction) => {
  // const parsers = [
  //   tsParser,
  // ];
  // const parser = getParserStrategy(targetFunction, parsers);
  const parser = tsParser;
  const diagramEntityRecords = parser.getDiagramEntityRecords(targetFunction);

  console.log(diagramEntityRecords, '<< diagram entity records');
  // const applicationCoordinator = createApplicationCoordinator();
  // await applicationCoordinator.process(nodeEntities);
}

const targetFunction = {
  filePath: 'test/mocks/mockFileA.ts',
  functionName: 'mockFunction',
}
init(targetFunction);
