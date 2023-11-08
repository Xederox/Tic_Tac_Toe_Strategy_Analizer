import {GridType} from "types";

const checkWin = (grid: GridType): boolean => {
  if(grid[0] !== '0' && grid[0] === grid[1] && grid[0] === grid[2]) return true;
  if(grid[3] !== '0' && grid[3] === grid[4] && grid[3] === grid[5]) return true;
  if(grid[6] !== '0' && grid[6] === grid[7] && grid[6] === grid[8]) return true;
  
  if(grid[0] !== '0' && grid[0] === grid[3] && grid[0] === grid[6]) return true;
  if(grid[1] !== '0' && grid[1] === grid[4] && grid[2] === grid[7]) return true;
  if(grid[2] !== '0' && grid[2] === grid[5] && grid[1] === grid[8]) return true;
  
  if(grid[0] !== '0' && grid[0] === grid[4] && grid[0] === grid[8]) return true;
  if(grid[2] !== '0' && grid[2] === grid[4] && grid[2] === grid[6]) return true;
  return false;
};

const checkEnd = (grid: GridType): boolean => {
  for(let i=0; i<grid.length; i++)
    if(grid[i] === '0')
      return false;
  return true;
};

//Will not work for stage 2 game
export const gridKeeper = (grid: GridType, offeringForGridKeeper: Array<boolean> , lastMove: string): Array<boolean> => {
  let keepersGrid = JSON.parse(JSON.stringify(offeringForGridKeeper));
  let tempGrid: Array<any>;
  let checkGrid = [false,false,false,false,false,false,false,false,false];
  
  for(let i=0; i<9; i++) {
    keepersGrid[i*10+9] = true;
    tempGrid = [];
    for(let j=0; j<9; j++)
      tempGrid.push(grid[i*10+j]);
    if(checkWin(tempGrid)) {
      keepersGrid[i * 10 + 9] = false;
      checkGrid[i] = true;
    }
    if(checkEnd(tempGrid)) {
      keepersGrid[i*10+9] = false;
      checkGrid[i] = true
    }
    if(Number(lastMove[0])!==i+1)
      keepersGrid[i*10+9] = false;
  }
  
  if( keepersGrid[ Number(lastMove[0])*10-1 ] === false) {
    if(grid[9] === '0' && !checkGrid[0]) keepersGrid[9] = true;
    if(grid[19] === '0' && !checkGrid[1]) keepersGrid[19] = true;
    if(grid[29] === '0' && !checkGrid[2]) keepersGrid[29] = true;
    if(grid[39] === '0' && !checkGrid[3]) keepersGrid[39] = true;
    if(grid[49] === '0' && !checkGrid[4]) keepersGrid[49] = true;
    if(grid[59] === '0' && !checkGrid[5]) keepersGrid[59] = true;
    if(grid[69] === '0' && !checkGrid[6]) keepersGrid[69] = true;
    if(grid[79] === '0' && !checkGrid[7]) keepersGrid[79] = true;
    if(grid[89] === '0' && !checkGrid[8]) keepersGrid[89] = true;
  }
  
  return keepersGrid;
};
