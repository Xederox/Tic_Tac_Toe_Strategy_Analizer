import React from 'react';
import {dbMonteRecord} from "types";

interface Props {
  record: dbMonteRecord,
}

export const MonteMove = (props: Props) => {
  let moveID = '';
  for(let i=props.record.id.length-1; i>0; i--) {
    if(props.record.id[i] !== '-')
      moveID = props.record.id[i] + moveID;
    else
      break;
  }
  const score = Math.floor(props.record.value/props.record.total*100);
  
  return (
    <>
      <td>{moveID}</td>
      <td>{score}</td>
      <td>{props.record.value}</td>
      <td>{props.record.total}</td>
    </>
  );
};
