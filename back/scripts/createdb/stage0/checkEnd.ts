export const checkEnd = (grid: Array<'0'|'1'|'2'>) => {
  for(let i=0; i<grid.length; i++)
    if(grid[i] === '0')
      return false;
  
  return true;
};
