import React, {useEffect, useState} from 'react';
import {dbRecord, PlayerType} from "types";
import {Move} from "../Move/Move";

interface Props {
  stage: string,
  currPositionID: string
  currPlayer: PlayerType,
}

export const MovesList = (props: Props) => {
  const [moves, setMoves] = useState<dbRecord[]>([]);
  
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3001/${props.stage}/${props.currPositionID}`);
      const data = await res.json();
      setMoves(data);
      console.log(data);
    })();
  }, [props.currPlayer]);
  
  return
    <>
      <table>
        <tr>
          <td>Move Coord</td>
          <td>Perfect Play</td>
          <td>Random Play</td>
          <td>Wins</td>
          <td>Draws</td>
          <td>Loses</td>
        </tr>
        {
          moves.map(move => {
            <Move key={move.id} currPositionID={props.currPositionID} record={move}/>
          })
        }
      </table>
    </>
  )
  
};