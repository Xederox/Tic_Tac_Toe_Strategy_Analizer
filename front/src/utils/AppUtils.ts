import {GridType, PlayerType} from "types";

export const getID = (grid: GridType, currPlayer: PlayerType, lastMove: string): string => {
  let start = true;
  let id = '';
  for(let i=0; i<grid.length; i++) {
    if(start && grid[i] !== '0')
      start = false;
    id = id + grid[i];
  }
  id = id + `${currPlayer + lastMove}`;
  if(start) {
    if(grid.length === 9) {
      return '0000000000';
    }
    if(grid.length === 81)
      return 'Stage 1 Starting Grid ID Here';
  }
  return id;
};

export const otherPlayer = (player: PlayerType): PlayerType => {
  if(player === 2)
    return 1;
  else
    return 2;
};

export const otherFirstPlayer = (player: 'O' | 'X' | null): 'O' | 'X' | null => {
  if(player === 'O')
    return 'X';
  else if(player === 'X')
    return 'O';
  return null;
};
