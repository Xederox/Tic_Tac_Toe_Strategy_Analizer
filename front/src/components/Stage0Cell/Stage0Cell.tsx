import React, {useContext} from 'react';
import '../styles.css'
import {getCellIndex} from "../../utils/getCellIndex";
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
  
  let cell;
  let cellIndex = getCellIndex(props.id);
  if(game.grid[cellIndex] === '0')
    cell = '-';
  else if(game.grid[cellIndex] === '1')
    cell = game.firstPlayer;
  else if(game.grid[cellIndex] === '2')
    cell = game.secondPlayer;
  
  if(game.stage !== 'stage0')
    game.setLastMove(props.id);
  
  const handleClick = () => {
    tempGrid[ cellIndex ] = `${game.currPlayer}`;
    if(game.stage === 'stage1') {
      tempGrid = gridKeeper(tempGrid, props.id);
    }
    game.setGrid(tempGrid);
  
    if(game.currPlayer === 1)
      game.setCurrPlayer(2);
    else
      game.setCurrPlayer(1)
  };
  
  return (
    <button
      className={'stage0-cell'}
      disabled={ !(game.grid[cellIndex] === '0') || !( game.grid[Number(props.id[1])*10-1]==='0' || game.stage ==='stage0') }
      id={props.id}
      onClick={ handleClick }
    > {cell} </button>
  )
}
