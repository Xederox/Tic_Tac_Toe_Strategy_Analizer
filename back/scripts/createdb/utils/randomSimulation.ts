import {GridType, StageType} from "../../../types";
import {getRandomIndex} from "./getRandomIndex";
import {checkWin} from "./checkWin";
import {checkDraw} from "./checkDraw";
import {gridKeeper} from "./gridKeeper";
import {getOtherPlayer} from "./getOtherPlayer";

export const randomSimulation = (grid: GridType, currPlayer: '1'|'2', stage: StageType): '1'|'2'|'3' => {
  let currGrid = JSON.parse(JSON.stringify(grid));
  const index = getRandomIndex(currGrid, stage);
  currGrid[index] = currPlayer;
  switch (stage){
    case "stage0": {
      if(checkWin(currGrid)!=='0')
        return currPlayer;
      else if(checkDraw(currGrid)==='3')
        return '3';
      break;
    }
    case "stage1": {
      currGrid = gridKeeper(currGrid, `${index+11}`);
      if(checkWin(currGrid.filter( (el:string, i:number) => i%10===9 ))!=='0')
        return currPlayer;
      else if(checkDraw(currGrid.filter( (el:string, i:number) => i%10===9 ))==='3')
        return '3';
      break;
    }
  }
  return randomSimulation(currGrid, getOtherPlayer(currPlayer), stage);
};
