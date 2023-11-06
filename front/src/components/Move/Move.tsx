import React from 'react';
import { dbRecord} from "types";

interface Props {
  currPositionID: string,
  record: dbRecord,
}

const getCellID = (coords: number): string => {
  return `${coords % 9}`;
};

const getDiffIndex = (id1: string, id2: string): number => {
  for(let i=0; i<id1.length; i++)
    if(id1[i] !== id2[i])
      return i;
  return -1; //unreachable (copium)
}

export const Move = (props: Props) => {
  const moveID = getCellID( getDiffIndex(props.currPositionID, props.record.id) ) ;
  let perfectPlay: string;
  if(props.record.perfect === 2) perfectPlay = 'Win';
  else if(props.record.perfect === 1) perfectPlay = 'Draw';
  else if(props.record.perfect === 0) perfectPlay = 'Lose';
  else perfectPlay = 'WTF?';
  return (
    <>
      <td>{Number(moveID)+1}</td>
      <td>{perfectPlay}</td>
      <td>{`${(props.record.random * 100).toFixed()}%`}</td>
      <td>{props.record.wins}</td>
      <td>{props.record.draws}</td>
      <td>{props.record.loses}</td>
    </>
  );
};
