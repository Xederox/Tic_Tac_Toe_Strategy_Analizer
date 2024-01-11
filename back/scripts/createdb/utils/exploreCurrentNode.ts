import {dbMonteRecord, GridType, StageType} from "../../../types";
import {getNodeScore} from "./getNodeScore";
import {selectFromDBMonte} from "./dbFunctions";

const firstMoveHardCoded: Array<string> = [
  '11', '12', '13', '15', '16', '19',
  '21', '22', '24', '25', '27', '28',
  '51', '52', '55',
];

export const exploreCurrentNode = async (id:string, grid: GridType, parentTotal: number, stage: StageType) => {
  let nodeScores: Array<number> = [];
  let whatIsRecorded: Array<boolean|null> = [];
  let offset = stage==='stage0' ? 1 : 11;
  for (let i=0; i<grid.length; i++) {
    if(stage==='stage1' && id==='0' &&  !firstMoveHardCoded.includes(`${i+offset}`)) {
      nodeScores[i] = -Infinity;
      whatIsRecorded.push(null);
      continue;
    }
    if(stage==='stage1' && (i%10===9 || grid[i-i%10+9]!=='0')) {
      nodeScores[i] = -Infinity;
      whatIsRecorded.push(null);
      continue;
    }
    let result: dbMonteRecord;
    try {
      result = await selectFromDBMonte(id + `-${i+offset}`, stage);
      whatIsRecorded.push(true);
    } catch (e) {
      whatIsRecorded.push(false);
    }
    if(grid[i]==='0') {
      if(whatIsRecorded[i]===true)
        nodeScores[i] = getNodeScore(result.value, result.total, parentTotal);
      else if(whatIsRecorded[i]===false)
        nodeScores[i] = Infinity;
      else
        throw new Error('ERR: '+whatIsRecorded);
    } else
      nodeScores[i] = -Infinity;
  }
  return {
    nodeScores,
    whatIsRecorded,
  };
};
