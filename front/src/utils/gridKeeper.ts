import {GridType} from "types";

const checkWin = (grid: GridType): string => {
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

const checkDraw = (grid: GridType): string => {
  for(let i=0; i<grid.length; i++)
    if(grid[i] === '0')
      return '0';
  return '3';
};

//Will not work for stage 2+ game
export const gridKeeper = (grid: GridType, lastMove: string): GridType => {
  let gridOfKeepers = JSON.parse(JSON.stringify(grid));
  const i0 = (Number(lastMove[0])-1)*10;
  const i1 = (Number(lastMove[1])-1)*10;
  let checkResult: string;
  
  checkResult = checkWin( gridOfKeepers.slice(i0, i0+9) );
  if(checkResult === '0')
    checkResult = checkDraw( gridOfKeepers.slice(i0, i0+9) );
  gridOfKeepers[i0+9] = checkResult;
  
  if( gridOfKeepers[i1+9]==='1' || gridOfKeepers[i1+9]==='2' || gridOfKeepers[i1+9]==='3' ){
    for(let i=0; i<9; i++)
      if(gridOfKeepers[i*10+9] === '-1')
        gridOfKeepers[i*10+9] = '0';
  }
  else{
    for(let i=0; i<9; i++)
      if (gridOfKeepers[i*10+9] === '0')
        gridOfKeepers[i*10+9] = '-1';
    gridOfKeepers[i1+9] = '0';
  }
  
  return gridOfKeepers;
};
