import {GridType} from "../../../types";

export const checkWin = (grid: GridType): string => {
  if((grid[0]==='1' || grid[0]==='2') && grid[0]===grid[1] && grid[0]===grid[2]) return grid[0];
  if((grid[3]==='1' || grid[3]==='2') && grid[3]===grid[4] && grid[3]===grid[5]) return grid[3];
  if((grid[6]==='1' || grid[6]==='2') && grid[6]===grid[7] && grid[6]===grid[8]) return grid[6];
  
  if((grid[0]==='1' || grid[0]==='2') && grid[0]===grid[3] && grid[0]===grid[6]) return grid[0];
  if((grid[1]==='1' || grid[1]==='2') && grid[1]===grid[4] && grid[1]===grid[7]) return grid[1];
  if((grid[2]==='1' || grid[2]==='2') && grid[2]===grid[5] && grid[2]===grid[8]) return grid[2];
  
  if((grid[0]==='1' || grid[0]==='2') && grid[0]===grid[4] && grid[0]===grid[8]) return grid[0];
  if((grid[2]==='1' || grid[2]==='2') && grid[2]===grid[4] && grid[2]===grid[6]) return grid[2];
  return '0';
};