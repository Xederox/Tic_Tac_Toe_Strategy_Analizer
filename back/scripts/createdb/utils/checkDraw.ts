import {GridType} from "../../../types";

export const checkDraw = (grid: GridType): string => {
  for(let i=0; i<grid.length; i++)
    if(grid[i] === '0' && i%10!==9)
      return '0';
  return '3';
};
