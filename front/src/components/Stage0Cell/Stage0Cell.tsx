import React, {useContext} from 'react';
import '../styles.css'
import {getCellCoords} from "../../utils/getCellCoords";
import {GameContext} from "../../App";
import {gridKeeper} from "../../utils/gridKeeper";

interface Props {
  id: string,
}

export function Stage0Cell(props: Props) {
  const game = useContext(GameContext);
  if(!game)
    return null;
  
  let tempGrid = JSON.parse(JSON.stringify(game.grid));
  let tempAllowBtn = JSON.parse(JSON.stringify(game.allowBtn));
  
  let cell;
  let cellCoords = getCellCoords(props.id);
  if(game.grid[cellCoords] === '0')
    cell = '-';
  else if(game.grid[cellCoords] === '1')
    cell = game.firstPlayer;
  else if(game.grid[cellCoords] === '2')
    cell = game.secondPlayer;
  
  if(game.stage !== 'stage0')
    game.setLastMove(props.id);
  
  return (
    <button
      className={'stage0-cell'}
      disabled={!game.allowBtn[cellCoords] || !( game.allowBtn[Number(props.id[1])*10-1] || game.stage ==='stage0')}
      id={props.id}
      onClick={ () => {
        tempGrid[ cellCoords ] = `${game.currPlayer}`;
        tempAllowBtn[ cellCoords ] = false;
        
        game.setGrid(tempGrid);
        
        if(game.stage === 'stage1') {
          tempAllowBtn = gridKeeper(game.grid, tempAllowBtn, props.id);
        }
        game.setAllowBtn(tempAllowBtn);
        
        if(game.currPlayer === 1)
          game.setCurrPlayer(2);
        else
          game.setCurrPlayer(1)
      }}
    > {cell} </button>
  )
}
