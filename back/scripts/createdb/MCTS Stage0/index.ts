import {dbMonteRecord, GridType, StageType} from "../../../types";
import {insertIntoDB, selectFromDB, updateDB} from "./dbFunctions";
import {checkWin} from "../utils/checkWin";
import {checkDraw} from "../utils/checkDraw";
import {gridKeeper} from "../utils/gridKeeper";

let __stage: StageType = 'stage0';

const grid: GridType = [
  '0','0','0',
  '0','0','0',
  '0','0','0',
];

const getNodeScore = (childValue: number, childTotal: number, parentTotal: number) => {
  const a = 2; //Just a decimal constant. Feel free to adjust
  return childValue/childTotal + a*Math.sqrt(Math.log( parentTotal )/childTotal);
};

const getBestIndex = (nodeScores: Array<number>) => {
  let best = 0;
  for(let i=1; i<nodeScores.length; i++)
    if(nodeScores[i]>nodeScores[best])
      best = i;
  return best;
};

const getOtherPlayer = (currPlayer: '1'|'2'): '1'|'2' => {
  if(currPlayer === '1')
    return '2';
  return '1';
};

const getRandomIndex = (grid: GridType, stage: StageType): number => {
  let totalMoves = 0;
  for(let i=0; i<grid.length; i++){
    if(grid[i]==='0' && (stage!=='stage1' || (i%10!==9 && grid[i-i%10+9]==='0')))
      totalMoves++;
  }
  let random = Math.floor(Math.random()*totalMoves);
  for(let i=0; i<grid.length; i++){
    if(grid[i]==='0' && (stage!=='stage1' || (i%10!==9 && grid[i-i%10+9]==='0'))){
      if(random===0)
        return i;
      random--;
    }
  }
};

const randomSimulation = (grid: GridType, currPlayer: '1'|'2', stage: StageType): '1'|'2'|'3' => {
  let currGrid = JSON.parse(JSON.stringify(grid));
  const index = getRandomIndex(currGrid, stage);
  currGrid[index] = currPlayer;
  switch (stage){
    case "stage0": {
      if(checkWin(currGrid)!=='0')
        return currPlayer;
      else if(checkDraw(currGrid)==='3')
        return '3';
      break;
    }
    case "stage1": {
      currGrid = gridKeeper(currGrid, `${index+11}`);
      if(checkWin(currGrid.filter( (el:string, i:number) => i%10===9 ))!=='0')
        return currPlayer;
      else if(checkDraw(currGrid.filter( (el:string, i:number) => i%10===9 ))==='3')
        return '3';
      break;
    }
  }
  return randomSimulation(currGrid, getOtherPlayer(currPlayer), stage);
};

const firstMoveHardCoded = [
  '11', '12', '13', '15', '16', '19',
  '21', '22', '24', '25', '27', '28',
  '51', '52', '55',
];

const exploreCurrentNode = async (id:string, grid: GridType, parentTotal: number, stage: StageType) => {
  let nodeScores: Array<number> = [];
  let whatIsRecorded: Array<boolean|null> = [];
  for (let i=0; i<grid.length; i++) {
    if(stage==='stage1' && id==='0' &&  !firstMoveHardCoded.includes(`${i+11}`)) {
      nodeScores[i] = -Infinity;
      whatIsRecorded.push(null);
      continue;
    }
    if(stage==='stage1' && (i%10===9 || grid[i-i%10+9]!=='0')) {
      nodeScores[i] = -Infinity;
      whatIsRecorded.push(null);
      continue;
    }
    let result: dbMonteRecord;
    try {
      result = await selectFromDB(id + `-${i+1}`);
      whatIsRecorded.push(true);
    } catch (e) {
      whatIsRecorded.push(false);
    }
    if(grid[i]==='0') {
      if(whatIsRecorded[i]===true)
        nodeScores[i] = getNodeScore(result.value, result.total, parentTotal);
      else if(whatIsRecorded[i]===false)
        nodeScores[i] = Infinity;
      else
        throw new Error('ERR: '+whatIsRecorded);
    } else
      nodeScores[i] = -Infinity;
  }
  return {
    nodeScores,
    whatIsRecorded,
  };
};

const goDeeperToFindTheAnswer = async (id: string, index: number, grid: GridType, currPlayer: '1'|'2', isRecorded: boolean, stage: StageType) => {
  let currNode: dbMonteRecord = {
    id: id,
    value: 0,
    total: 0,
  };
  let winner: '1'|'2'|'3';
  try {
    currNode = await selectFromDB(currNode.id);
  } catch (e) {
    await insertIntoDB(currNode);
  }
  
  if(checkWin(grid)!=='0')
    winner = currPlayer;
  else if(checkDraw(grid)==='3')
    winner = '3';
  else if(isRecorded===true)
    winner = await makeMove(id,grid, getOtherPlayer(currPlayer), currNode.total);
  else if(isRecorded===false)
    winner = randomSimulation(grid, getOtherPlayer(currPlayer), stage);
  else
    throw new Error(`whatIsRecorded[${index}] === ${isRecorded} (WTf?)`)
  
  if(winner === currPlayer)
    currNode.value++;
  else if(winner === '3')
    currNode.value += 0.5;
  currNode.total++;
  await updateDB(currNode);
  
  return winner;
}

const makeMove = async (id: string, grid: GridType, currPlayer: '1'|'2', parentTotal: number): Promise<'1'|'2'|'3'> => {
  let currGrid = JSON.parse(JSON.stringify(grid));
  let index: number;
  
  const {nodeScores, whatIsRecorded} = await exploreCurrentNode(id, currGrid, parentTotal, __stage);
  index = getBestIndex(nodeScores);
  currGrid[index] = currPlayer;
  return await goDeeperToFindTheAnswer(id+`-${index+1}`, index, currGrid, currPlayer, whatIsRecorded[index], __stage);
};

const start = new Date();
let end: any;

const run = async () => {
  let score = 0;
  for (let i = 0; i < 10000; i++) {
    let rootNode: dbMonteRecord = {
      id: '0',
      value: 0,
      total: 0,
    };
    try {
      rootNode = await selectFromDB('0');
    } catch (e) {
      await insertIntoDB(rootNode);
    }
    
    const winner = await makeMove('0', grid, '1', rootNode.total);
    if(winner==='1')
      score++;
    else if(winner==='2')
      score--;
    rootNode.total++;
    await updateDB(rootNode);
  }
  console.log(score);
  
  end = new Date();
}

run().then(() => {
  console.log(Number(end)-Number(start)+' ms');
});
