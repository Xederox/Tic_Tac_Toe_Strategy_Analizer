import {dbMonteRecord, GridType, StageType} from "../../../types";
import {updateDB, getMonteRecord, makeMove,} from "../utils";

let __stage: StageType = 'stage0';

const grid: GridType = [
  '0','0','0',
  '0','0','0',
  '0','0','0',
];

const start = new Date();
let end: any;

const run = async () => {
  let score = 0;
  for (let i = 0; i < 100000; i++) {
    let rootNode: dbMonteRecord = await getMonteRecord('0', __stage)
    
    const winner = await makeMove('0', grid, '1', rootNode.total, __stage);
    if(winner==='1')
      score++;
    else if(winner==='2')
      score--;
    rootNode.total++;
    await updateDB(rootNode, __stage);
  }
  console.log(score);
  
  end = new Date();
}

run().then(() => {
  console.log(Number(end)-Number(start)+' ms');
});
