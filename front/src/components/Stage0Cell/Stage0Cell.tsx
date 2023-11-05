import React, {Dispatch, SetStateAction} from 'react';
import {GridType, PlayerType} from 'types';
import '../styles.css'
import {getCellCoords} from "../../getCellCoords";

interface Props {
  id: string
  grid: GridType
  setGrid: Dispatch<SetStateAction<GridType>>
  currPlayer: PlayerType
  setCurrPlayer: Dispatch<SetStateAction<PlayerType>>
}

export function Stage0Cell(props: Props) {
  let tempGrid = JSON.parse(JSON.stringify(props.grid));
  
  return (
    <button
      className={'stage0-cell'}
      id={props.id}
      onClick={ () => {
        tempGrid[ getCellCoords(props.id) ] = props.currPlayer;
        props.setGrid(tempGrid);
        if(props.currPlayer === "X")
          props.setCurrPlayer('O');
        else
          props.setCurrPlayer('X')
      }}
    > {props.grid[ getCellCoords(props.id) ]} </button>
  )
}
