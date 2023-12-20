import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import './App.css';
import {Stage0} from './components/Stage0/Stage0';
import {GridType, PlayerType, StageType} from "types";
import {MovesList} from "./components/MovesList/MovesList";
import {ChooseStage} from "./components/ChooseStage/ChooseStage";
import {ChooseFirstPlayer} from "./components/ChooseFirstPlayer/ChooseFirstPlayer";
import {getID, otherFirstPlayer, otherPlayer} from "./utils/AppUtils";
import {Stage1} from "./components/Stage1/Stage1";
import {Tutorial} from "./components/Tutorial/Tutorial";

//When implementing higher stages (*chuckles*) remember to change getCellIndex.ts, starting_grids.ts and gridKeeper.ts

interface GameContextType {
  firstPlayer: 'O'|'X'|null,
  secondPlayer: 'O'|'X'|null,
  stage: StageType,
  grid: GridType,
  setGrid: Dispatch<SetStateAction<GridType>>,
  currPlayer: PlayerType,
  setCurrPlayer: Dispatch<SetStateAction<PlayerType>>,
  lastMove: string,
  setLastMove: Dispatch<SetStateAction<string>>,
}

export const GameContext = createContext<GameContextType | null>(null);

export default function App() {
  const [stage, setStage] = useState<StageType>(null)
  const [grid, setGrid] = useState<GridType>([]);
  const [currPlayer, setCurrPlayer] = useState<PlayerType>(1);
  const [firstPlayer, setFirstPlayer] = useState<'O'|'X'|null>(null);
  const [lastMove, setLastMove] = useState<string>('');
  
  return (
    <>
      <GameContext.Provider value={{
        firstPlayer: firstPlayer,
        secondPlayer: otherFirstPlayer(firstPlayer),
        stage: stage,
        grid: grid,
        setGrid: setGrid,
        currPlayer: currPlayer,
        setCurrPlayer: setCurrPlayer,
        lastMove: lastMove,
        setLastMove: setLastMove,
      }}>
        
        <>{stage === 'stage0' ?
          <>
            <Stage0 id={''}/>
            <MovesList stage={stage} currPositionID={getID(grid, otherPlayer(currPlayer), '')} currPlayer={currPlayer}/>
          </> : <></>
        }</>
        
        <>{stage === 'stage1' ?
          <>
            <div><Stage1 id={''}/></div>
            <MovesList stage={stage} currPositionID={getID(grid, otherPlayer(currPlayer), '00')} currPlayer={currPlayer}/>
          </> : <></>
        }</>
        
        <ChooseStage setStage={setStage} setFirstPlayer={setFirstPlayer}/>
        <ChooseFirstPlayer firstPlayer={firstPlayer} setFirstPlayer={setFirstPlayer} gridLength={grid.length}/>
        
        <Tutorial/>
        
      </GameContext.Provider>
    </>
  );
}
