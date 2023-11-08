import React, {useState} from 'react';

export const Tutorial = () => {
  const [showTut, setShowTut] = useState<boolean>(false);
  const [tutContent, setTutContent] = useState<'stage0'|'stage1'|null>(null);
  
  return (
    <>
      <p>Tutorial</p>
      <button onClick={() => {
        if(showTut){
          setShowTut(false);
          setTutContent(null);
        }
        else
          setShowTut(true);
      }}
      >{showTut ? 'Hide' : 'Show'}</button>
      
      {showTut ? <>
        <button onClick={() => {setTutContent('stage0')}}>Stage 0 Tutorial</button>
        <button onClick={() => {setTutContent('stage1')}}>Stage 1 Tutorial</button>
      </> : <></>}
      
      {tutContent === 'stage0' ?
        <div>
          <p>Classic TikTakToe.</p>
          <p>Game is divided into <b>Small Cells</b> forming 3x3 grid.</p>
          <p>Players take turns in <b>Taking Control</b> of <b>Small Cells</b> by putting either 'O' or 'X'.</p>
          <p>First Player to control all 3 cells in any row, column or long diagonal wins.</p>
          
          <p>Cells' Coordinates</p>
          <p>1 2 3</p>
          <p>4 5 6</p>
          <p>7 8 9</p>
        </div> : <></>
      }
      {tutContent === 'stage1' ?
        <div>
          <p>Game is divided into <b>Big Cells</b> forming 3x3 grid. Each <b>Big Cell</b> contains 3x3 grid of <b>Small Cells</b> for a total of nine grids.</p>
          <p>Players take turns in <b>Taking Control</b> of <b>Small Cells</b> by putting either 'O' or 'X'.</p>
          <p>First Player to control all 3 <b>Small Cells</b> in any row, column or long diagonal within single <b>Big Cell</b> <b>Takes Control</b> of that <b>Big Cell</b>.</p>
          <p><b>Big Cell</b> under control of either of players or without eligible moves is considered <b>Disabled</b>.</p>
          
          <p>First Player to control all 3 <b>Big Cells</b> in any row, column or long diagonal wins.</p>
          
          <p>There are restrictions though.</p>
          <p>Every move has to be made inside <b>Big Cell</b> corresponding to position of the <b>Small Cell</b> opponent took control in their last move.</p>
          <p>Example 1: Player A made move in Cell no '73' (top-right). Player B is forced to make a move in bottom-left.</p>
          <p>Example 2: Player A made move in Cell no '4_'. Player B is forced to make a move in cells '_4'.</p>
          
          <p>First move of the game has no restrictions.</p>
          <p>If player is forced to make a move inside a <b>Disabled</b> <b>Big Cell</b> then instead that move has no restrictions.</p>
          <p>Move without restrictions can be made inside any non-<b>Disabled</b> <b>Big Cell</b>.</p>
          
          <p>Cells' Coordinates</p>
          <p>11 21 31 | 12 22 32 | 13 23 33</p>
          <p>41 51 61 | 42 52 62 | 43 53 63</p>
          <p>71 81 91 | 72 82 92 | 73 83 93</p>
          <p>----------|-----------|----------</p>
          <p>14 24 34 | 15 25 35 | 16 26 36</p>
          <p>44 54 64 | 45 55 65 | 46 56 66</p>
          <p>74 84 94 | 75 85 95 | 76 86 96</p>
          <p>----------|-----------|----------</p>
          <p>17 27 37 | 18 28 38 | 19 29 39</p>
          <p>47 57 67 | 48 58 68 | 49 59 69</p>
          <p>77 87 97 | 78 88 98 | 79 89 99</p>
        </div> : <></>
      }
      
      
    </>
  );
};
