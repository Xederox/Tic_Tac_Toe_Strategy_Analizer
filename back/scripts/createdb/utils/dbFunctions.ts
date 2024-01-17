import {pool} from "../../../db";
import {FieldPacket} from "mysql2";
import {dbMonteRecord, dbRecord, StageType} from "../../../types";

const isDBMonteRecord = (x: dbMonteRecord | dbRecord): x is dbMonteRecord => (x as dbMonteRecord).value !== undefined;
const isDBRecord = (x: dbMonteRecord | dbRecord): x is dbRecord => (x as dbRecord).perfect !== undefined;

export const insertIntoDB = async (data: dbMonteRecord | dbRecord, stage: StageType): Promise<void> => {
  if(isDBRecord(data)) {
    switch (stage) {
      case 'stage0': {
        await pool.execute("INSERT INTO `stage0` (`id`, `perfect`, `random`, `wins`, `draws`, `loses`) VALUES (:id, :perfect, :random, :wins, :draws, :loses)", {
          id: data.id,
          perfect: data.perfect,
          random: data.random,
          wins: data.wins,
          draws: data.draws,
          loses: data.loses,
        });
        break;
      }
      default:
        throw new Error(`Failed to insert ${data}\n${stage} is not supported.`);
    }
  } else if(isDBMonteRecord(data)) {
    switch (stage){
      case "stage0": {
        await pool.execute("INSERT INTO `mcts stage0` (`id`, `value`, `total`) VALUES (:id, :value, :total)", {
          id: data.id,
          value: data.value,
          total: data.total,
        });
        break;
      }
      case "stage1": {
        await pool.execute("INSERT INTO `mcts stage1` (`id`, `value`, `total`) VALUES (:id, :value, :total)", {
          id: data.id,
          value: data.value,
          total: data.total,
        });
        break;
      }
      default:
        throw new Error(`Failed to insert ${data}\n${stage} is not supported.`);
    }
  } else
    throw new Error(`Failed to insert ${data} Wrong type`);
};

export const insertRelation = async (parentID: string, childID: string, stage: StageType): Promise<void> => {
  switch(stage) {
    case "stage0": {
      await pool.execute("INSERT INTO `stage0_stage0` (`parentid`, `childid`) VALUES (:parentid, :childid)", {
        parentid: parentID,
        childid: childID
      });
      break;
    }
    default:
      throw new Error(`Failed to select ${parentID} - ${childID}\n${stage} is not supported.`);
  }
};

export const updateDB = async (data: dbMonteRecord | dbRecord, stage: StageType): Promise<void> => {
  if(isDBRecord(data)) {
    switch (stage) {
      case 'stage0': {
        await pool.execute("UPDATE `stage0` SET id=:id, perfect=:perfect, random=:random, wins=:wins, draws=:draws, loses=:loses WHERE id = :id", {
          id: data.id,
          perfect: data.perfect,
          random: data.random,
          wins: data.wins,
          draws: data.draws,
          loses: data.loses,
        });
        break;
      }
      default:
        throw new Error(`Failed to update ${data}\n${stage} is not supported.`);
    }
  } else if(isDBMonteRecord(data)) {
    switch (stage) {
      case "stage0": {
        await pool.execute("UPDATE `mcts stage0` SET id=:id, value=:value, total=:total WHERE id=:id", {
          id: data.id,
          value: data.value,
          total: data.total,
        });
        break;
      } case "stage1": {
        await pool.execute("UPDATE `mcts stage1` SET id=:id, value=:value, total=:total WHERE id=:id", {
          id: data.id,
          value: data.value,
          total: data.total,
        });
        break;
      } default:
        throw new Error(`Failed to update ${data}\n${stage} is not supported.`);
    }
  } else
    throw new Error(`Failed to update ${data} Wrong type`);
};

export const selectFromDB = async (id: string, stage: StageType): Promise<dbRecord> => {
  switch(stage) {
    case "stage0": {
      const [results] = await pool.execute("SELECT * FROM `stage0` WHERE id=:id", {id: id}) as [dbRecord[], FieldPacket[]];
      return {
        id: results[0].id,
        perfect: results[0].perfect,
        random: results[0].random,
        wins: results[0].wins,
        draws: results[0].draws,
        loses: results[0].loses,
      };
    }
    default:
      throw new Error(`Failed to select ${id}\n${stage} is not supported.`);
  }
};

export const selectFromDBMonte = async (id: string, stage: StageType): Promise<dbMonteRecord> => {
  switch (stage) {
    case "stage0": {
      const [results] = await pool.execute("SELECT * FROM `mcts stage0` WHERE id=:id", {id: id}) as [dbMonteRecord[], FieldPacket[]];
      return {
        id: results[0].id,
        value: results[0].value,
        total: results[0].total,
      };
    }
    case "stage1": {
      const [results] = await pool.execute("SELECT * FROM `mcts stage1` WHERE id=:id", {id: id}) as [dbMonteRecord[], FieldPacket[]];
      return {
        id: results[0].id,
        value: results[0].value,
        total: results[0].total,
      };
    }
    default:
  }
};
