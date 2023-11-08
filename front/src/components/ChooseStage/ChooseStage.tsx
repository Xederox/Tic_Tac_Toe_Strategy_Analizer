import React, {Dispatch, SetStateAction, useContext} from 'react';
import { StageType} from "types";
import {GameContext} from "../../App";
import {stageOneAllowBtn, stageOneGrid, stageZeroAllowBtn, stageZeroGrid} from "../../starting_grids/starting_grids";

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
        game.setAllowBtn(stageZeroAllowBtn);
        game.setLastMove('');
        props.setFirstPlayer(null);
      }}> Stage 0 </button>
      <button onClick={() => {
        props.setStage('stage1');
        game.setGrid(stageOneGrid);
        game.setAllowBtn(stageOneAllowBtn);
        game.setLastMove('');
        props.setFirstPlayer(null);
      }}> Stage 1</button>
    </>
  );
};
