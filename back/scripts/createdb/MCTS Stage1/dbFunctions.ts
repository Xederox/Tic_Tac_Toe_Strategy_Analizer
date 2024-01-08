import {pool} from "../../../db";
import {FieldPacket} from "mysql2";
import {dbMonteRecord} from "../../../types";

export const insertIntoDB = async (data: dbMonteRecord): Promise<void> => {
  await pool.execute("INSERT INTO `mcts stage1` (`id`, `value`, `total`) VALUES (:id, :value, :total)", {
    id: data.id,
    value: data.value,
    total: data.total,
  });
};

export const selectFromDB = async (id: string): Promise<dbMonteRecord> => {
  const [results] = await pool.execute("SELECT * FROM `mcts stage1` WHERE id=:id", {id: id}) as [dbMonteRecord[], FieldPacket[]];
  return {
    id: results[0].id,
    value: results[0].value,
    total: results[0].total,
  };
};

export const updateDB = async (data: dbMonteRecord): Promise<void> => {
  await pool.execute("UPDATE `mcts stage1` SET id=:id, value=:value, total=:total WHERE id=:id", {
    id: data.id,
    value: data.value,
    total: data.total,
  });
};
