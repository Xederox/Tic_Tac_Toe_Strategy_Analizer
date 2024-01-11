import {GridType, StageType} from "../../../types";

export const getRandomIndex = (grid: GridType, stage: StageType): number => {
  let totalMoves = 0;
  for(let i=0; i<grid.length; i++){
    if(grid[i]==='0' && (stage!=='stage1' || (i%10!==9 && grid[i-i%10+9]==='0')))
      totalMoves++;
  }
  let random = Math.floor(Math.random()*totalMoves);
  for(let i=0; i<grid.length; i++){
    if(grid[i]==='0' && (stage!=='stage1' || (i%10!==9 && grid[i-i%10+9]==='0'))){
      if(random===0)
        return i;
      random--;
    }
  }
};
