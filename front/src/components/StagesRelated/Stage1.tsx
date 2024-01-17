import React, {useContext} from 'react';
import {GameContext} from "../../App";
import {Stage0} from "./Stage0";
import '../styles.css';

interface Props {
  id: string,
}

export const Stage1 = (props: Props) => {
  const game = useContext(GameContext);
  if(!game)
    return null;
  if(!game.stage || !game.firstPlayer)
    return null;
  
  return (
    <div className={'stage1'}>
        <Stage0 id={props.id + '1'}/>
        <Stage0 id={props.id + '2'}/>
        <Stage0 id={props.id + '3'}/>
        <Stage0 id={props.id + '4'}/>
        <Stage0 id={props.id + '5'}/>
        <Stage0 id={props.id + '6'}/>
        <Stage0 id={props.id + '7'}/>
        <Stage0 id={props.id + '8'}/>
        <Stage0 id={props.id + '9'}/>
    </div>
    )
}
