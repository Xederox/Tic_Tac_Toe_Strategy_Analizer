import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import './App.css';
import {Stage0} from './components/StagesRelated/Stage0';
import {GridType, PlayerType, StageType} from "types";
import {MovesList} from "./components/MovesList/MovesList";
import {ChooseStage} from "./components/ChooseSetup/ChooseStage";
import {ChooseFirstPlayer} from "./components/ChooseSetup/ChooseFirstPlayer";
import {getID, getSecondPlayer, otherPlayer} from "./utils/AppUtils";
import {Stage1} from "./components/StagesRelated/Stage1";
import {Tutorial} from "./components/Tutorial/Tutorial";

//When implementing higher stages (*chuckles*) remember to change/expand:
//- getCellIndex.ts,
//- starting_grids.ts,
//- gridKeeper.ts (double check its usages [should be fine tho]),
//- ChooseStage.tsx,
//MoveList.tsx 'solved database' for stage1 is hardcoded to never show moves.

interface GameContextType {
  firstPlayer: 'O'|'X'|null,
  secondPlayer: 'O'|'X'|null,
  stage: StageType,
  grid: GridType,
  setGrid: Dispatch<SetStateAction<GridType>>,
  currPlayer: PlayerType,
  setCurrPlayer: Dispatch<SetStateAction<PlayerType>>,
  currMonteID: string;
  setCurrMonteID: Dispatch<SetStateAction<string>>,
}

export const GameContext = createContext<GameContextType | null>(null);

export default function App() {
  const [stage, setStage] = useState<StageType>(null)
  const [grid, setGrid] = useState<GridType>([]);
  const [currPlayer, setCurrPlayer] = useState<PlayerType>(1);
  const [firstPlayer, setFirstPlayer] = useState<'O'|'X'|null>(null);
  const [currMonteID, setCurrMonteID] = useState<string>('0');
  
  return (
    <>
      <GameContext.Provider value={{
        firstPlayer,
        secondPlayer: getSecondPlayer(firstPlayer),
        stage,
        grid,
        setGrid,
        currPlayer,
        setCurrPlayer,
        currMonteID,
        setCurrMonteID,
      }}>
        
        <>{stage === 'stage0' ?
          <>
            <Stage0 id={''}/>
          </> : <></>
        }</>
        
        <>{stage === 'stage1' ?
          <>
            <div><Stage1 id={''}/></div>
          </> : <></>
        }</>
        <MovesList currPositionID={getID(grid, otherPlayer(currPlayer))} currPlayer={currPlayer}/>
        
        <ChooseStage setStage={setStage} setFirstPlayer={setFirstPlayer}/>
        <ChooseFirstPlayer firstPlayer={firstPlayer} setFirstPlayer={setFirstPlayer} gridLength={grid.length}/>
        
        <Tutorial/>
        
      </GameContext.Provider>
    </>
  );
}
