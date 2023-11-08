import React, {useContext} from 'react';
import {GameContext} from "../../App";
import {Stage0} from "../Stage0/Stage0";
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
        <Stage0 id={'1' + props.id}/>
        <Stage0 id={'2' + props.id}/>
        <Stage0 id={'3' + props.id}/>
        <Stage0 id={'4' + props.id}/>
        <Stage0 id={'5' + props.id}/>
        <Stage0 id={'6' + props.id}/>
        <Stage0 id={'7' + props.id}/>
        <Stage0 id={'8' + props.id}/>
        <Stage0 id={'9' + props.id}/>
    </div>
    )
}