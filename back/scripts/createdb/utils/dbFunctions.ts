import {pool} from "../../../db";
import {FieldPacket} from "mysql2";
import {dbRecord} from "../../../types";

export const insertIntoDB = async ( table: string, data: dbRecord ): Promise<void> => {
  await pool.execute("INSERT INTO "+table+" (`id`, `perfect`, `random`, `wins`, `draws`, `loses`) VALUES (:id, :perfect, :random, :wins, :draws, :loses)", {
    id: data.id,
    perfect: data.perfect,
    random: data.random,
    wins: data.wins,
    draws: data.draws,
    loses: data.loses,
  });
};

export const updateDB = async (table: string, data: dbRecord ): Promise<void> => {
  await pool.execute("UPDATE "+table+" SET id=:id, perfect=:perfect, random=:random, wins=:wins, draws=:draws, loses=:loses WHERE id = :id", {
    id: data.id,
    perfect: data.perfect,
    random: data.random,
    wins: data.wins,
    draws: data.draws,
    loses: data.loses,
  });
};

export const insertRelation = async (table: string, parentID: string, childID: string): Promise<void> => {
  const relationTable = table+"_"+table;
  await pool.execute("INSERT INTO "+relationTable+" (`parentid`, `childid`) VALUES (:parentid, :childid)", {
    parentid: parentID,
    childid: childID
  });
};

export const selectFromDB = async (table: string, id: string): Promise<dbRecord> => {
  const [results] = await pool.execute("SELECT * FROM "+table+" WHERE id=:id", {id: id}) as [dbRecord[], FieldPacket[]];
  return {
    id: results[0].id,
    perfect: results[0].perfect,
    random: results[0].random,
    wins: results[0].wins,
    draws: results[0].draws,
    loses: results[0].loses,
  };
};
