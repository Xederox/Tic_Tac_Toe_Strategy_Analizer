import  React from 'react';
import {GridFace} from 'types';
import '../styles.css'

interface Props {
    id: string
    grid: GridFace
    setGrid: any // I tried, part of a hook: [grid,setGrid] from Stage0.tsx
    currPlayer: 'X' | 'O';
}

export function Stage0Cell(props: Props) {
    let tempGrid = JSON.parse(JSON.stringify(props.grid));

    return (
        <button
            className={'stage0-cell'}
            id={ props.id }
            onClick={ () => {
                tempGrid.values[Number(props.id)-1] = props.currPlayer;
                props.setGrid(tempGrid);
                console.log(tempGrid.values);
            }}
        > {props.grid.values[Number(props.id)-1]} </button>
    )
}
