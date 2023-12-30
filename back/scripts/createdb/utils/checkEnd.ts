import {GridType} from "../../../types";

export const checkEnd = (grid: GridType) => {
  for(let i=0; i<grid.length; i++)
    if(grid[i] === '0')
      return false;
  
  return true;
};
