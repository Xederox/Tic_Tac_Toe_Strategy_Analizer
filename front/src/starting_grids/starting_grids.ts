import {GridType} from "types";

export const stageZeroGrid: GridType = [
  '0','0','0',
  '0','0','0',
  '0','0','0',
];

export const stageOneGrid: GridType = [ // 10th '0' in each row determines who won in that 3x3
  '0','0','0','0','0','0','0','0','0','0', //Stage1Cell 1
  '0','0','0','0','0','0','0','0','0','0', //Stage1Cell 2
  '0','0','0','0','0','0','0','0','0','0', //etc
  '0','0','0','0','0','0','0','0','0','0',
  '0','0','0','0','0','0','0','0','0','0',
  '0','0','0','0','0','0','0','0','0','0',
  '0','0','0','0','0','0','0','0','0','0',
  '0','0','0','0','0','0','0','0','0','0',
  '0','0','0','0','0','0','0','0','0','0',
];

export const stageZeroAllowBtn: Array<boolean> = [
  true, true, true,
  true, true, true,
  true, true, true,
];

export const stageOneAllowBtn: Array<boolean> = [ //10th value in each row is for whole 3x3 grid
  true,true,true,true,true,true,true,true,true,true,
  true,true,true,true,true,true,true,true,true,true,
  true,true,true,true,true,true,true,true,true,true,
  true,true,true,true,true,true,true,true,true,true,
  true,true,true,true,true,true,true,true,true,true,
  true,true,true,true,true,true,true,true,true,true,
  true,true,true,true,true,true,true,true,true,true,
  true,true,true,true,true,true,true,true,true,true,
  true,true,true,true,true,true,true,true,true,true,
];