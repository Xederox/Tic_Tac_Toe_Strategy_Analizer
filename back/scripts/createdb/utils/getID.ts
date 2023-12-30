import {GridType} from "../../../types";

export const getID = (grid: GridType, currPlayer: 0 | 1 | 2, lastMove: string): string => {
  let id = '';
  for(let i=0; i<grid.length; i++)
    id = id + grid[i];
  id = id + `${currPlayer + lastMove}`;
  return id;
};
