import React from "react";
import {TableTopRow} from "./TableTopRow";
import {MonteMove} from "./MonteMove";
import {dbMonteRecord, dbRecord} from "types";
import {SolvedMove} from "./SolvedMove";

interface Props {
  mcts: boolean,
  moves: dbRecord[] | dbMonteRecord[],
  currPositionID: string,
}

export const MovesTable = (props: Props) => {
  return (
    <>
      { props.mcts ?
        <>
          <table>
          <TableTopRow mcts={props.mcts}/>
          {
            props.moves.map((move, index) => (
              <tr>
                <MonteMove key={index} record={move as dbMonteRecord}/>
              </tr>
            ))
          }
          </table>
        </> :
        <>
          <table>
          <TableTopRow mcts={props.mcts}/>
          {
            props.moves.map((move, index) => (
              <tr>
                <SolvedMove key={index} currPositionID={props.currPositionID} record={move as dbRecord}/>
              </tr>
            ))
          }
        </table>
      </> }
    </>
  );
};
