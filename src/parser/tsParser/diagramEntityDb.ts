import { DiagramEntityRecord } from "../../domain/diagramEntityInterface";
import { TSFileEntity } from "./tsEntityInterface";

type TSDiagramEntityDb = {
  records: DiagramEntityRecord[];
  fileNameToTSFileEntity: Record<string, TSFileEntity>;
  addTsFileEntity: (fileName: string, tsFileEntity: TSFileEntity) => void;
  addEntityRecord: (record: DiagramEntityRecord) => void;
}

let db: TSDiagramEntityDb | undefined;

const getDb = (): TSDiagramEntityDb => {
  if (!db) {
    db = createDb();
  }
  return db;
}

const createDb = (): TSDiagramEntityDb => {
  const db: TSDiagramEntityDb = {
    records: [],
    fileNameToTSFileEntity: {},
    addTsFileEntity: (fileName: string, tsFileEntity: TSFileEntity) => {
      db.fileNameToTSFileEntity[fileName] = tsFileEntity;
    },
    addEntityRecord: (record: DiagramEntityRecord) => {
      db.records.push(record);
    }
  };
  return db;
}

export {
  getDb,
};
