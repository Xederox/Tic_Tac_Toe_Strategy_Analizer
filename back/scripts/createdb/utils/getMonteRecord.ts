import {dbMonteRecord, StageType} from "../../../types";
import {insertIntoDB, selectFromDBMonte} from "./dbFunctions";

export const getMonteRecord = async (id: string, stage: StageType) => {
  let record: dbMonteRecord;
  try {
    record = await selectFromDBMonte(id, stage);
  } catch (e) {
    record = {
      id: id,
      value: 0,
      total: 0,
    };
    await insertIntoDB(record, stage);
  }
  return record;
};
