export const getCellIndex = (id: string): number => {
  if(id.length === 1)
    return Number( id[0] ) - 1;
  else //if(id.length === 2)
    return Number( id[1] ) + Number( id[0] ) * 10 - 11;
}
