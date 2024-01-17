import React, {useContext, useEffect, useState} from 'react';
import {dbMonteRecord, dbRecord, PlayerType} from "types";
import {GameContext} from "../../App";
import {CheckBoxMCTS} from "./CheckBoxMCTS";
import {MovesTable} from "./MovesTable";

interface Props {
  currPositionID: string,
  currPlayer: PlayerType,
}

export const MovesList = (props: Props) => {
  const [moves, setMoves] = useState<dbRecord[] | dbMonteRecord[]>([]);
  const [mcts, setMcts] = useState<boolean>(false);
  const game = useContext(GameContext);
  
  useEffect(() => {
    (async () => {
      if(game!==null) {
        try {
          let res: any;
          if(mcts)
            res = await fetch(`http://localhost:3001/monte/${game.stage}/${game.currMonteID}`);
          else
            res = await fetch(`http://localhost:3001/solved/${game.stage}/${props.currPositionID}`);
          const data = await res.json();
          if (data !== null)
            setMoves(data);
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, [props.currPlayer, mcts, game?.firstPlayer]);
  
  if(game===null)
    return null;
  if(!game.stage || !game.firstPlayer)
    return null;
  
  return (
    <>
      <CheckBoxMCTS mcts={mcts} setMcts={setMcts}/>
      {game.stage==='stage1' && !mcts ?
        <>
          <p>Database not implemented</p>
        </> :
        <MovesTable mcts={mcts} moves={moves} currPositionID={props.currPositionID}/>
      }
    </>
  );
};
