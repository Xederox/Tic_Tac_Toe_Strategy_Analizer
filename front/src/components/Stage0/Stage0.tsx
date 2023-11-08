import React, {useContext} from 'react';
import '../styles.css';
import { Stage0Cell } from '../Stage0Cell/Stage0Cell';
import {GameContext} from "../../App";

interface Props {
  id: string
}

export function Stage0(props: Props) {
  const game = useContext(GameContext);
  if(!game)
    return null;
  if(!game.stage || !game.firstPlayer)
    return null;
  
  return (
    <div className={'stage0'}>
      <Stage0Cell id={'1' + props.id}/>
      <Stage0Cell id={'2' + props.id}/>
      <Stage0Cell id={'3' + props.id}/>
      <Stage0Cell id={'4' + props.id}/>
      <Stage0Cell id={'5' + props.id}/>
      <Stage0Cell id={'6' + props.id}/>
      <Stage0Cell id={'7' + props.id}/>
      <Stage0Cell id={'8' + props.id}/>
      <Stage0Cell id={'9' + props.id}/>
    </div>
  )
}
