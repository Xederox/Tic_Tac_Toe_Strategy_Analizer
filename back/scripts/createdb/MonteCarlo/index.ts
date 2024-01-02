import {dbMonteRecord, GridType} from "../../../types";
import {insertIntoDB, selectFromDB, selectValueFromDB, updateDB} from "./dbFunctions";
import {checkWin} from "../utils/checkWin";
import {checkEnd} from "../utils/checkEnd";

const grid: GridType = [
  '0','0','0',
  '0','0','0',
  '0','0','0',
];

const getRandomIndex = (weights: Array<number>): number => {
  let total = 0;
  for(let i=0; i<weights.length; i++) {
    total += weights[i];
  }
  let randomNumber = Math.random()*total;
  for(let i=0; i<weights.length; i++){
    if(randomNumber < weights[i])
      return i;
    randomNumber -= weights[i];
  }
};

const getOtherPlayer = (currPlayer: '1'|'2'): '1'|'2' => {
  if(currPlayer === '1')
    return '2';
  return '1';
}

const makeMove = async (id: string, grid: GridType, currPlayer: '1'|'2'): Promise<'1'|'2'|'3'> => {
  let currGrid = JSON.parse(JSON.stringify(grid));
  const weights = [];
  let index: number;
  let winner: '1' | '2' | '3';
  
  for (let i = 0; i < 9; i++) {
    let isRecorded: boolean;
    let result: dbMonteRecord;
    try {
      result = await selectFromDB(id + `${i+1}`);
      isRecorded = true;
    } catch (e) {
      isRecorded = false;
    }
    
    if(currGrid[i]==='0') {
      if(isRecorded)
        weights[i] = (result.value+1)/(result.total+1);
      else
        weights[i] = 0.1;
    }
    else
      weights[i] = 0;
  }
  
  index = getRandomIndex(weights);
  currGrid[index] = currPlayer;
  let currNode: dbMonteRecord = {
    id: id+`${index+1}`,
    ratio: null,
    value: 0,
    total: 0,
  };
  try {
    currNode = await selectFromDB(id+`${index+1}`);
  } catch (e) {
    await insertIntoDB(currNode);
  }
  
  if (checkWin(currGrid))
    winner = currPlayer;
  else if (checkEnd(currGrid))
    winner = '3';
  else
    winner = await makeMove(id + `${index+1}`, currGrid, getOtherPlayer(currPlayer));
  if (winner === currPlayer)
    currNode.value++;
  else if (winner === '3')
    currNode.value += 0.5;
  currNode.total++;
  currNode.ratio = Number((currNode.value/currNode.total).toFixed(2));
  await updateDB(currNode);
  
  return winner;
};

const start = new Date();
let end: any;

const run = async () => {
  for (let i = 0; i < 10000; i++) {
    await makeMove('', grid, '1');
  }
  end = new Date();
}

run().then(() => {
  console.log(Number(end)-Number(start)+' ms');
});
