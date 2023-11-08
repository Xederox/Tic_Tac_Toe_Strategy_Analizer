import React, {Dispatch, SetStateAction, useContext} from 'react';
import {GameContext} from "../../App";

interface Props {
  firstPlayer: 'O'|'X'|null,
  setFirstPlayer: Dispatch<SetStateAction<'O'|'X'|null>>,
  gridLength: number,
}

export const ChooseFirstPlayer = (props: Props) => {
  const game = useContext(GameContext);
  if(!game)
    return null;
  
  if(props.firstPlayer !== null || props.gridLength === 0)
    return null;
  
  return (
    <>
      <p>Choose First Player</p>
      <button onClick={() => {
        props.setFirstPlayer('O');
        game.setCurrPlayer(1);
      }}> O </button>
      <button onClick={() => {
        props.setFirstPlayer('X');
        game.setCurrPlayer(1);
      }}> X </button>
    </>
  );
};