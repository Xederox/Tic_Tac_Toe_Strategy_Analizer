import React, {useState} from 'react';
import './App.css';
import {Stage0} from './components/Stage0/Stage0';
import {GridType, PlayerType} from "types";

const stageZeroGrid: GridType = [
  '-','-','-',
  '-','-','-',
  '-','-','-',
];

const stageOneGrid: GridType = [
  '-','-','-','-','-','-','-','-','-', //Stage1Cell 1
  '-','-','-','-','-','-','-','-','-', //Stage1Cell 2
  '-','-','-','-','-','-','-','-','-', //etc
  '-','-','-','-','-','-','-','-','-',
  '-','-','-','-','-','-','-','-','-',
  '-','-','-','-','-','-','-','-','-',
  '-','-','-','-','-','-','-','-','-',
  '-','-','-','-','-','-','-','-','-',
  '-','-','-','-','-','-','-','-','-',
];

//When implementing higher stages (*chuckles*) remember to change getCellCoords.ts

export default function App() {
  const [grid, setGrid] = useState(stageZeroGrid);
  const [currPlayer, setCurrPlayer] = useState<PlayerType>('X');

  return (
    <Stage0 id={'0'} grid={grid} setGrid={setGrid} currPlayer={currPlayer} setCurrPlayer={setCurrPlayer}/>
  );
}
