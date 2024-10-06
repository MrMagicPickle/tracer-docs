import { TracerFunction } from "./domain/tracerFunctionInterface";
import tsParser from './parser/tsParser/tsParser';

const init = (targetFunction: TracerFunction) => {
  // const parsers = [
  //   tsParser,
  // ];
  // const parser = getParserStrategy(targetFunction, parsers);
  const parser = tsParser;
  const nodeEntities = parser.getNodeEntities(targetFunction);

  console.log(nodeEntities, '<< nodeEntities');
  // const applicationCoordinator = createApplicationCoordinator();
  // await applicationCoordinator.process(nodeEntities);
}

const targetFunction = {
  filePath: '../test/mocks/mockFile.ts',
  functionName: 'mockFunction',
}
init(targetFunction);
