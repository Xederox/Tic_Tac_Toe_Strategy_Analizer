export const getCellCoords = (id: string): number => {
  if(id.length === 1)
    return Number( id[0] ) - 1;
  else //if(id.length === 2)
    return Number( id[0] ) + Number( id[1] ) * 10 - 11;
}
