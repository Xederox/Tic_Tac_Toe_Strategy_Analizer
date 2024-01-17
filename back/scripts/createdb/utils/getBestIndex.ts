export const getBestIndex = (nodeScores: Array<number>) => {
  let best = 0;
  for(let i=1; i<nodeScores.length; i++)
    if(nodeScores[i]>nodeScores[best])
      best = i;
  return best;
};