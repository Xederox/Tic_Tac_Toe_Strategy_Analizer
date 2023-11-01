import React, {useState} from 'react';
import './App.css';
import {Stage0} from './components/Stage0/Stage0';
import {GridType, PlayerType} from "types";

const stage0Grid: GridType = [
  '-','-','-',
  '-','-','-',
  '-','-','-',
];

function App() {
  const [grid, setGrid] = useState(stage0Grid);
  const [currPlayer, setCurrPlayer] = useState<PlayerType>('X');

  return (
      <Stage0 id={'0'} grid={grid} setGrid={setGrid} currPlayer={currPlayer} setCurrPlayer={setCurrPlayer}/>
  );
}

export default App;
