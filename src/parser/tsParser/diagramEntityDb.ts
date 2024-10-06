import { DiagramEntityRecord } from "../../domain/diagramEntityInterface";
import { TSFileEntity } from "./tsEntityInterface";

type TSDiagramEntityDb = {
  records: DiagramEntityRecord[];
  fileNameToTSFileEntity: Record<string, TSFileEntity>;
}

let db: TSDiagramEntityDb | undefined;

const getDb = (): TSDiagramEntityDb => {
  if (!db) {
    db = createDb();
  }
  return db;
}

const createDb = (): TSDiagramEntityDb => {
  return {
    records: [],
    fileNameToTSFileEntity: {},
  };
}

export {
  getDb,
};
