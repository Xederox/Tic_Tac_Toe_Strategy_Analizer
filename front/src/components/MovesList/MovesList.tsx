import React, {useEffect, useState} from 'react';
import { dbRecord, PlayerType} from "types";
import {Move} from "../Move/Move";

interface Props {
  stage: string,
  currPositionID: string,
  currPlayer: PlayerType,
}

export const MovesList = (props: Props) => {
  const [moves, setMoves] = useState<dbRecord[]>([]);
  
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3001/${props.stage}/${props.currPositionID}`);
      const data = await res.json();
      setMoves(data);
    })();
  }, [props.currPlayer]);
  
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
