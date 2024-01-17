import React from 'react';

interface Props {
  mcts: boolean
}

export const TableTopRow = (props: Props) => {
  if(props.mcts)
    return (
      <tr>
        <td>Coord</td>
        <td>Score</td>
        <td>Value</td>
        <td>Total</td>
      </tr>
    );
  else
    return (
      <tr>
        <td>Coord</td>
        <td>Perfect Play</td>
        <td>Random Play</td>
        <td>Wins</td>
        <td>Draws</td>
        <td>Loses</td>
      </tr>
    );
};
