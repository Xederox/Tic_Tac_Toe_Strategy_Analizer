import React, {Dispatch, SetStateAction, useContext} from 'react';
import { StageType} from "types";
import {GameContext} from "../../App";
import { stageOneGrid, stageZeroGrid} from "../../starting_grids/starting_grids";

interface Props {
  setStage: Dispatch<SetStateAction<StageType>>,
  setFirstPlayer: Dispatch<SetStateAction<'O'|'X'|null>>,
}

export const ChooseStage = (props: Props) => {
  const game = useContext(GameContext);
  if(!game)
    return null;
  
  return (
    <>
      <p>Choose Stage</p>
      <button onClick={() => {
        props.setStage('stage0');
        game.setGrid(stageZeroGrid);
        game.setLastMove('');
        props.setFirstPlayer(null);
      }}> Stage 0 </button>
      <button onClick={() => {
        props.setStage('stage1');
        game.setGrid(stageOneGrid);
        game.setLastMove('');
        props.setFirstPlayer(null);
      }}> Stage 1</button>
    </>
  );
};
