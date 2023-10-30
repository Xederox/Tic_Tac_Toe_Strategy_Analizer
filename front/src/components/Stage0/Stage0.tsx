import React, {useState} from 'react';
import '../styles.css';
import { Stage0Cell } from '../Stage0Cell/Stage0Cell';

interface Props {
    coords: 0|1|2|3|4|5|6|7|8|9 // 0: Stage 0, 1-9: Stage 1 (Stage 2+ not implemented)
    currPlayer: 'X' | 'O'
}

export function Stage0(props: Props) {
    const [grid, setGrid] = useState({
        coords: props.coords,
        values: [
        '','','',
        '','','',
        '','','',
    ]});

    return (
        <>
            <p className={'stage0-cell-p'}>
                <Stage0Cell id={String(props.coords) + '7'} grid={grid} setGrid={setGrid} currPlayer={props.currPlayer}/>
                <Stage0Cell id={String(props.coords) + '8'} grid={grid} setGrid={setGrid} currPlayer={props.currPlayer}/>
                <Stage0Cell id={String(props.coords) + '9'} grid={grid} setGrid={setGrid} currPlayer={props.currPlayer}/>
            </p>
            <p className={'stage0-cell-p'}>
                <Stage0Cell id={String(props.coords) + '4'} grid={grid} setGrid={setGrid} currPlayer={props.currPlayer}/>
                <Stage0Cell id={String(props.coords) + '5'} grid={grid} setGrid={setGrid} currPlayer={props.currPlayer}/>
                <Stage0Cell id={String(props.coords) + '6'} grid={grid} setGrid={setGrid} currPlayer={props.currPlayer}/>
            </p>
            <p className={'stage0-cell-p'}>
                <Stage0Cell id={String(props.coords) + '1'} grid={grid} setGrid={setGrid} currPlayer={props.currPlayer}/>
                <Stage0Cell id={String(props.coords) + '2'} grid={grid} setGrid={setGrid} currPlayer={props.currPlayer}/>
                <Stage0Cell id={String(props.coords) + '3'} grid={grid} setGrid={setGrid} currPlayer={props.currPlayer}/>
            </p>
        </>
    )
}