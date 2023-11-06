export const getCellCoords = (id: string): number => {
  return Number( id[0] ) + Number( id[1] ) * 9 - 1;
}
