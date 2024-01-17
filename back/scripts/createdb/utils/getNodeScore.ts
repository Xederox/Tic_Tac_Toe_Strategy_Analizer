export const getNodeScore = (childValue: number, childTotal: number, parentTotal: number) => {
  const a = 5; //Just a decimal constant. Feel free to adjust
  return childValue/childTotal + a*Math.sqrt(Math.log( parentTotal )/childTotal);
};
