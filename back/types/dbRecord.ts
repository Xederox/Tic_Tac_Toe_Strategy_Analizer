export interface dbRecord {
  id: string,
  perfect: -1 | 0 | 1 | 2, //0: lose, 1: draw, 2: win, -1: placeholder/debugging value
  random: number,
  wins: number,
  draws: number,
  loses: number,
}
