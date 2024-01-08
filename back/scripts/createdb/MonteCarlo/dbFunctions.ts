import {pool} from "../../../db";
import {FieldPacket} from "mysql2";
import {dbMonteRecord} from "../../../types";

export const insertIntoDB = async (data: dbMonteRecord): Promise<void> => {
  await pool.execute("INSERT INTO `montecarlotest2` (`id`, `value`, `total`) VALUES (:id, :value, :total)", {
    id: data.id,
    value: data.value,
    total: data.total,
  });
};

export const selectFromDB = async (id: string): Promise<dbMonteRecord> => {
  const [results] = await pool.execute("SELECT * FROM `montecarlotest2` WHERE id=:id", {id: id}) as [dbMonteRecord[], FieldPacket[]];
  return {
    id: results[0].id,
    value: results[0].value,
    total: results[0].total,
  };
};

export const selectValueFromDB = async (id: string): Promise<number> => {
  const [results] = await pool.execute("SELECT * FROM `montecarlotest2` WHERE id=:id", {id: id}) as [dbMonteRecord[], FieldPacket[]];
  return results[0].value;
};

export const updateDB = async (data: dbMonteRecord): Promise<void> => {
  await pool.execute("UPDATE `montecarlotest2` SET id=:id, value=:value, total=:total WHERE id=:id", {
    id: data.id,
    value: data.value,
    total: data.total,
  });
};
