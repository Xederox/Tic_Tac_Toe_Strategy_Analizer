import React, {Dispatch, SetStateAction, useContext} from 'react';
import {GridType, PlayerType} from 'types';
import '../styles.css'
import {getCellCoords} from "../../getCellCoords";
import {GameContext} from "../../App";

interface Props {
  id: string,
  grid: GridType,
  setGrid: Dispatch<SetStateAction<GridType>>,
  currPlayer: PlayerType,
  setCurrPlayer: Dispatch<SetStateAction<PlayerType>>,
}

export function Stage0Cell(props: Props) {
  let tempGrid = JSON.parse(JSON.stringify(props.grid));
  const game = useContext(GameContext);
  if(!game) return null;
  
  let cell;
  let cellCoords = getCellCoords(props.id);
  if(props.grid[cellCoords] === '0')
    cell = '-';
  else if(props.grid[cellCoords] === '1')
    cell = game.firstPlayer;
  else if(props.grid[cellCoords] === '2')
    cell = game.secondPlayer;
  
  return (
    <button
      className={'stage0-cell'}
      id={props.id}
      onClick={ () => {
        tempGrid[ cellCoords ] = `${props.currPlayer}`;
        props.setGrid(tempGrid);
        if(props.currPlayer === 1)
          props.setCurrPlayer(2);
        else
          props.setCurrPlayer(1)
      }}
    > {cell} </button>
  )
}
