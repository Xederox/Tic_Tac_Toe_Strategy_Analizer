import {dbMonteRecord, GridType} from "../../../types";
import {insertIntoDB, selectFromDB, updateDB} from "./dbFunctions";
import {checkWin} from "../utils/checkWin";
import {checkDraw} from "../utils/checkDraw";

const grid: GridType = [
  '0','0','0',
  '0','0','0',
  '0','0','0',
];

const getNodeScore = (childValue: number, childTotal: number, parentTotal: number) => {
  const a = 1; //Just a decimal constant. Feel free to adjust
  return childValue/childTotal + a*Math.sqrt(Math.log( parentTotal )/childTotal);
};

const getBestIndex = (nodeScore: Array<number>) => {
  let best = 0;
  for(let i=1; i<nodeScore.length; i++)
    if(nodeScore[i]>nodeScore[best])
      best = i;
  return best;
};

const getOtherPlayer = (currPlayer: '1'|'2'): '1'|'2' => {
  if(currPlayer === '1')
    return '2';
  return '1';
};

const getRandomIndex = (grid: GridType): number => {
  let totalMoves = 0;
  for(let i=0; i<grid.length; i++){
    if(grid[i]==='0')
      totalMoves++;
  }
  let random = Math.floor(Math.random()*totalMoves);
  for(let i=0; i<grid.length; i++){
    if(grid[i]==='0'){
      if(random===0)
        return i;
      random--;
    }
  }
};

const randomSimulation = (grid: GridType, currPlayer: '1'|'2'): '1'|'2'|'3' => {
  let currGrid = JSON.parse(JSON.stringify(grid));
  currGrid[ getRandomIndex(grid) ] = currPlayer;
  if(checkWin(currGrid)!=='0')
    return currPlayer;
  else if(checkDraw(currGrid)==='3')
    return '3';
  else
    return randomSimulation(currGrid, getOtherPlayer(currPlayer));
};

const makeMove = async (id: string, grid: GridType, currPlayer: '1'|'2', parentTotal: number): Promise<'1'|'2'|'3'> => {
  let currGrid = JSON.parse(JSON.stringify(grid));
  const nodeScores = [];
  let isRecorded: Array<boolean> = [false, false, false, false, false, false, false, false, false];
  let index: number;
  let winner: '1' | '2' | '3';
  
  for (let i = 0; i < 9; i++) {
    let result: dbMonteRecord;
    try {
      result = await selectFromDB(id + `${i+1}`);
      isRecorded[i] = true;
    } catch (e) {
      isRecorded[i] = false;
    }
  
    if(currGrid[i]==='0') {
      if(isRecorded[i])
        nodeScores[i] = getNodeScore(result.value, result.total, parentTotal);
      else
        nodeScores[i] = Infinity;
    }
    else
      nodeScores[i] = -Infinity;
  }
  
  index = getBestIndex(nodeScores);
  currGrid[index] = currPlayer;
  let currNode: dbMonteRecord = {
    id: id+`${index+1}`,
    value: 0,
    total: 0,
  };
  try {
    currNode = await selectFromDB(id+`${index+1}`);
  } catch (e) {
    await insertIntoDB(currNode);
  }
  
  if(checkWin(currGrid)!=='0')
    winner = currPlayer;
  else if(checkDraw(currGrid)==='3')
    winner = '3';
  else if(isRecorded[index])
    winner = await makeMove(id+`${index+1}`,currGrid, getOtherPlayer(currPlayer), currNode.total);
  else
    winner = randomSimulation(currGrid, getOtherPlayer(currPlayer));
  
  if(winner === currPlayer)
    currNode.value++;
  else if(winner === '3')
    currNode.value += 0.5;
  currNode.total++;
  await updateDB(currNode);
  
  return winner;
};

const start = new Date();
let end: any;

const run = async () => {
  for (let i = 0; i < 100; i++) {
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
    
    let winner = await makeMove('', grid, '1', rootNode.total);
    if(winner === '1')
      rootNode.value++;
    else if(winner === '3')
      rootNode.value += 0.5;
    rootNode.total++;
    await updateDB(rootNode);
  }
  
  end = new Date();
}

run().then(() => {
  console.log(Number(end)-Number(start)+' ms');
});
