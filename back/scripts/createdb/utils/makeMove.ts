import {GridType, StageType} from "../../../types";
import {exploreCurrentNode} from "./exploreCurrentNode";
import {getBestIndex} from "./getBestIndex";
import {gridKeeper} from "./gridKeeper";
import {goDeeperToFindTheAnswer} from "./goDeeperToFindTheAnswer";

//Mutually recursive with goDeeperToFindTheAnswer

export const makeMove = async (id: string, grid: GridType, currPlayer: '1'|'2', parentTotal: number, stage: StageType): Promise<'1'|'2'|'3'> => {
  let offset = stage==='stage0' ? 1 : 11;
  let currGrid = JSON.parse(JSON.stringify(grid));
  let index: number;
  
  const {nodeScores, whatIsRecorded} = await exploreCurrentNode(id, currGrid, parentTotal, stage);
  index = getBestIndex(nodeScores);
  currGrid[index] = currPlayer;
  if(stage==='stage1')
    currGrid = gridKeeper(currGrid, `${index+offset}`);
  return await goDeeperToFindTheAnswer(id+`-${index+offset}`, index, currGrid, currPlayer, whatIsRecorded[index], stage);
};
