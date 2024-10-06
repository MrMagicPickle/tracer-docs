import { NodeEntity } from "../domain/nodeEntityInterface";
import { TracerFunction } from "../domain/tracerFunctionInterface";

export type Parser = {
  canApply: (targetFunction: TracerFunction) => boolean;
  getNodeEntities: (targetFunction: TracerFunction) => NodeEntity[];
}
