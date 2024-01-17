import React, {useContext} from 'react';
import '../styles.css';
import { Cell } from './Cell';
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
      <Cell id={props.id + '1'}/>
      <Cell id={props.id + '2'}/>
      <Cell id={props.id + '3'}/>
      <Cell id={props.id + '4'}/>
      <Cell id={props.id + '5'}/>
      <Cell id={props.id + '6'}/>
      <Cell id={props.id + '7'}/>
      <Cell id={props.id + '8'}/>
      <Cell id={props.id + '9'}/>
    </div>
  )
}
