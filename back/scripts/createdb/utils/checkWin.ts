import {GridType} from "../../../types";

export const checkWin = (grid: GridType): boolean => {
  if((grid[0]==='1' || grid[0]==='2') && grid[0]===grid[1] && grid[0]===grid[2]) return true;
  if((grid[3]==='1' || grid[3]==='2') && grid[3]===grid[4] && grid[3]===grid[5]) return true;
  if((grid[6]==='1' || grid[6]==='2') && grid[6]===grid[7] && grid[6]===grid[8]) return true;
  
  if((grid[0]==='1' || grid[0]==='2') && grid[0]===grid[3] && grid[0]===grid[6]) return true;
  if((grid[1]==='1' || grid[1]==='2') && grid[1]===grid[4] && grid[1]===grid[7]) return true;
  if((grid[2]==='1' || grid[2]==='2') && grid[2]===grid[5] && grid[2]===grid[8]) return true;
  
  if((grid[0]==='1' || grid[0]==='2') && grid[0]===grid[4] && grid[0]===grid[8]) return true;
  if((grid[2]==='1' || grid[2]==='2') && grid[2]===grid[4] && grid[2]===grid[6]) return true;
  
  return false;
};
