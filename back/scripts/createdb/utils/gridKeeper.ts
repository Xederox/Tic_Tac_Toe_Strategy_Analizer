import {GridType} from "../../../types";
import {checkWin} from "./checkWin";
import {checkDraw} from "./checkDraw";

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
