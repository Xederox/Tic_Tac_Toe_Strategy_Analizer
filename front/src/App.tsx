import React, {createContext, useState} from 'react';
import './App.css';
import {Stage0} from './components/Stage0/Stage0';
import {GridType,  PlayerType} from "types";
import {MovesList} from "./components/MovesList/MovesList";

const stageZeroGrid: GridType = [
  '0','0','0',
  '0','0','0',
  '0','0','0',
];

const stageOneGrid: GridType = [
  '0','0','0','0','0','0','0','0','0', //Stage1Cell 1
  '0','0','0','0','0','0','0','0','0', //Stage1Cell 2
  '0','0','0','0','0','0','0','0','0', //etc
  '0','0','0','0','0','0','0','0','0',
  '0','0','0','0','0','0','0','0','0',
  '0','0','0','0','0','0','0','0','0',
  '0','0','0','0','0','0','0','0','0',
  '0','0','0','0','0','0','0','0','0',
  '0','0','0','0','0','0','0','0','0',
];

//When implementing higher stages (*chuckles*) remember to change getCellCoords.ts

const getID = (grid: GridType, currPlayer: PlayerType, lastMove: string): string => {
  let start = true;
  let id = '';
  for(let i=0; i<grid.length; i++) {
    if(grid[i] !== '0')
      start = false;
    id = id + grid[i];
  }
  id = id + `${currPlayer + lastMove}`;
  if(start)
    return '0000000000';
  return id;
};

const lastPlayer = (currPlayer: PlayerType) => {
  if(currPlayer === 2)
    return 1;
  else
    return 2;
}

interface GameContextType {
  firstPlayer: 'X'|'O',
  secondPlayer: 'X'|'O',
}

export const GameContext = createContext<GameContextType | null>(null);

export default function App() {
  const [grid, setGrid] = useState(stageZeroGrid);
  const [currPlayer, setCurrPlayer] = useState<PlayerType>(1);
  
  return (
    <>
      <GameContext.Provider value={{
        firstPlayer: 'X',
        secondPlayer: 'O',
      }}>
        <Stage0 id={'0'} grid={grid} setGrid={setGrid} currPlayer={currPlayer} setCurrPlayer={setCurrPlayer}/>
        
        <MovesList stage={'stage0'} currPositionID={getID(grid, lastPlayer(currPlayer), '')} currPlayer={currPlayer}/>
      </GameContext.Provider>
    </>
  );
}
