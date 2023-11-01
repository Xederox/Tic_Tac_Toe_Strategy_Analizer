import React, {Dispatch, SetStateAction, useState} from 'react';
import '../styles.css';
import { Stage0Cell } from '../Stage0Cell/Stage0Cell';
import {GridType, PlayerType} from "types";

interface Props {
  id: string
  grid: GridType
  setGrid: Dispatch<SetStateAction<GridType>>
  currPlayer: PlayerType
  setCurrPlayer: Dispatch<SetStateAction<PlayerType>>
}

export function Stage0(props: Props) {
  return (
    <>
      <p className={'stage0-cell-p'}>
        <Stage0Cell id={'1' + props.id} grid={props.grid} setGrid={props.setGrid} currPlayer={props.currPlayer} setCurrPlayer={props.setCurrPlayer}/>
        <Stage0Cell id={'2' + props.id} grid={props.grid} setGrid={props.setGrid} currPlayer={props.currPlayer} setCurrPlayer={props.setCurrPlayer}/>
        <Stage0Cell id={'3' + props.id} grid={props.grid} setGrid={props.setGrid} currPlayer={props.currPlayer} setCurrPlayer={props.setCurrPlayer}/>
      </p>
      <p className={'stage0-cell-p'}>
        <Stage0Cell id={'4' + props.id} grid={props.grid} setGrid={props.setGrid} currPlayer={props.currPlayer} setCurrPlayer={props.setCurrPlayer}/>
        <Stage0Cell id={'5' + props.id} grid={props.grid} setGrid={props.setGrid} currPlayer={props.currPlayer} setCurrPlayer={props.setCurrPlayer}/>
        <Stage0Cell id={'6' + props.id} grid={props.grid} setGrid={props.setGrid} currPlayer={props.currPlayer} setCurrPlayer={props.setCurrPlayer}/>
      </p>
      <p className={'stage0-cell-p'}>
        <Stage0Cell id={'7' + props.id} grid={props.grid} setGrid={props.setGrid} currPlayer={props.currPlayer} setCurrPlayer={props.setCurrPlayer}/>
        <Stage0Cell id={'8' + props.id} grid={props.grid} setGrid={props.setGrid} currPlayer={props.currPlayer} setCurrPlayer={props.setCurrPlayer}/>
        <Stage0Cell id={'9' + props.id} grid={props.grid} setGrid={props.setGrid} currPlayer={props.currPlayer} setCurrPlayer={props.setCurrPlayer}/>
      </p>
    </>
  )
}
