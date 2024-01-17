export const getOtherPlayer = (currPlayer: '1'|'2'): '1'|'2' => {
  if(currPlayer === '1')
    return '2';
  return '1';
};