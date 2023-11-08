import React, {useContext, useEffect, useState} from 'react';
import {dbRecord, PlayerType, StageType} from "types";
import {Move} from "../Move/Move";
import {GameContext} from "../../App";

interface Props {
  stage: StageType,
  currPositionID: string,
  currPlayer: PlayerType,
}

export const MovesList = (props: Props) => {
  const [moves, setMoves] = useState<dbRecord[]>([]);
  
  useEffect(() => {
    (async () => {
      if(props.stage === 'stage0'){
        try {
          const res = await fetch(`http://localhost:3001/${props.stage}/${props.currPositionID}`);
          const data = await res.json();
          setMoves(data);
        } catch(e) {
          console.log(e);
        }
      }
    })();
  }, [props.currPlayer]);
  
  const game = useContext(GameContext);
  if(game === null)
    return null;
  if(!game.stage || !game.firstPlayer)
    return null;
  
  if(game.stage === 'stage1')
    return (
      <>
        <p>Database not implemented</p>
      </>
    );
  
  return (
    <>
      <table>
        <tr>
          <td>Coord</td>
          <td>Perfect Play</td>
          <td>Random Play</td>
          <td>Wins</td>
          <td>Draws</td>
          <td>Loses</td>
        </tr>
        {
          moves.map((move, index) => (
            <tr>
              <Move key={index} currPositionID={props.currPositionID} record={move}/>
            </tr>
          ))
        }
      </table>
    </>
  )
  
};
