import React, {Dispatch, SetStateAction} from 'react';

interface Props {
  mcts: boolean,
  setMcts: Dispatch<SetStateAction<boolean>>,
}

export const CheckBoxMCTS = (props: Props) => {
  const handleChange = () => props.setMcts(!props.mcts);
  return (
    <label>
      <input type={"checkbox"} onChange={handleChange} defaultChecked={props.mcts} /> Monte Carlo Tree Search
    </label>
  )
}
