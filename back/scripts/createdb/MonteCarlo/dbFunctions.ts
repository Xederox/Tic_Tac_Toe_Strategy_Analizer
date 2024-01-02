import {pool} from "../../../db";
import {FieldPacket} from "mysql2";
import {dbMonteRecord} from "../../../types";

export const insertIntoDB = async (data: dbMonteRecord): Promise<void> => {
  await pool.execute("INSERT INTO `montecarlotest` (`id`, `ratio`, `value`, `total`) VALUES (:id, :ratio, :value, :total)", {
    id: data.id,
    ratio: data.ratio,
    value: data.value,
    total: data.total,
  });
};

export const selectFromDB = async (id: string): Promise<dbMonteRecord> => {
  const [results] = await pool.execute("SELECT * FROM `montecarlotest` WHERE id=:id", {id: id}) as [dbMonteRecord[], FieldPacket[]];
  return {
    id: results[0].id,
    ratio: results[0].ratio,
    value: results[0].value,
    total: results[0].total,
  };
};

export const selectValueFromDB = async (id: string): Promise<number> => {
  const [results] = await pool.execute("SELECT * FROM `montecarlotest` WHERE id=:id", {id: id}) as [dbMonteRecord[], FieldPacket[]];
  return results[0].value;
};

export const updateDB = async (data: dbMonteRecord): Promise<void> => {
  await pool.execute("UPDATE `montecarlotest` SET id=:id, ratio=:ratio, value=:value, total=:total WHERE id=:id", {
    id: data.id,
    ratio: data.ratio,
    value: data.value,
    total: data.total,
  });
};
