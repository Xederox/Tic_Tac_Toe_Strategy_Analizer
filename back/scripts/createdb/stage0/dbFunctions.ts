import {pool} from "../../../db";
import {FieldPacket} from "mysql2";
import {dbRecord} from "../../../types";

export const insertIntoDB = async ( data: dbRecord ): Promise<void> => {
  await pool.execute("INSERT INTO `stage0` (`id`, `perfect`, `random`, `wins`, `draws`, `loses`) VALUES (:id, :perfect, :random, :wins, :draws, :loses)", {
    id: data.id,
    perfect: data.perfect,
    random: data.random,
    wins: data.wins,
    draws: data.draws,
    loses: data.loses,
  });
};

export const updateDB = async (data: dbRecord ): Promise<void> => {
  await pool.execute("UPDATE `stage0` SET id=:id, perfect=:perfect, random=:random, wins=:wins, draws=:draws, loses=:loses WHERE id = :id", {
    id: data.id,
    perfect: data.perfect,
    random: data.random,
    wins: data.wins,
    draws: data.draws,
    loses: data.loses,
  })
};

export const insertRelation = async (parentID: string, childID: string): Promise<void> => {
  await pool.execute("INSERT INTO `stage0_stage0` (`parentid`, `childid`) VALUES (:parentid, :childid)", {
    parentid: parentID,
    childid: childID
  });
};

export const selectFromDB = async (id: string): Promise<dbRecord> => {
  const [results] = await pool.execute("SELECT * FROM `stage0` WHERE id=:id", {id: id}) as [dbRecord[], FieldPacket[]];
  return {
    id: results[0].id,
    perfect: results[0].perfect,
    random: results[0].random,
    wins: results[0].wins,
    draws: results[0].draws,
    loses: results[0].loses,
  };
};
