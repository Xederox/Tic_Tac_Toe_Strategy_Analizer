import {pool} from "../../../db";
import {checkWin} from '../utils/checkWin';
import {checkEnd} from "../utils/checkEnd";
import {insertIntoDB, insertRelation, selectFromDB, updateDB} from "../utils/dbFunctions";
import {GridType, dbRecord} from "../../../types";
import {getID} from "../utils/getID";
import {nextPlayer} from "../utils/nextPlayer";

const grid: GridType = [
  '0', '0', '0',
  '0', '0', '0',
  '0', '0', '0',
];

const TABLE = 'stage0';

const coveredIDs: Array<undefined | string> = [];
const checkRepeat = (id: string) => {
  for(let i=0; i<coveredIDs.length; i++)
    if(id === coveredIDs[i])
      return true;
  return false;
};

const createStage0DB = async (parentID: string, grid: GridType, currPlayer: 1|2): Promise<dbRecord> => {
  const parentMove: dbRecord = {
    id: parentID,
    perfect: -1,
    random: -1.00,
    wins: 0,
    draws: 0,
    loses: 0,
  };
  let currMove: dbRecord;
  let currGrid: GridType;
  const counter = {
    perfectWins: 0,
    perfectDraws: 0,
    perfectLoses: 0,
  };
  
  for(let i = 0; i<9; i++) {
    if(grid[i] !== '0')
      continue;
    
    currGrid = JSON.parse(JSON.stringify(grid));
    currGrid[i] = `${currPlayer}`;
    const currID = getID( currGrid,currPlayer,'' );
    
    if( checkRepeat(currID) ) {
      await insertRelation(TABLE, parentID, currID);
      currMove = await selectFromDB(TABLE, currID);
      if (currMove.perfect === 2) {
      parentMove.perfect = 0;
      counter.perfectLoses++;
      } else if(currMove.perfect === 1){
        if(parentMove.perfect !== 0)
          parentMove.perfect = 1;
        counter.perfectDraws++;
      } else {
        if(parentMove.perfect !== 0 && parentMove.perfect !== 1)
          parentMove.perfect = 2;
        counter.perfectWins++;
      }
      parentMove.wins += currMove.loses;
      parentMove.draws += currMove.draws;
      parentMove.loses += currMove.wins;
      continue;
    }
    coveredIDs[coveredIDs.length] = currID;
    await insertIntoDB(TABLE, {id: currID, perfect: -1, random: -1.00, wins: -1, draws: -1, loses:-1} );
    await insertRelation(TABLE, parentID, currID);
    
    if( checkWin(currGrid) ) {
      await updateDB(TABLE, {id: currID, perfect: 2, random: 1.00, wins: 1, draws: 0, loses: 0} )
      parentMove.perfect = 0;
      counter.perfectLoses++;
      parentMove.loses++;
      
    } else if( checkEnd(currGrid) ) {
      await updateDB(TABLE, {id: currID, perfect: 1, random: 0.50, wins: 0, draws: 1, loses: 0});
      if( parentMove.perfect !== 0 ) {
        parentMove.perfect = 1;
        counter.perfectDraws++;
      }
      parentMove.draws++;
      
    } else {
      currMove = await createStage0DB( currID, currGrid, nextPlayer(currPlayer));
      await updateDB(TABLE, currMove);
      if (currMove.perfect === 2) {
        parentMove.perfect = 0;
        counter.perfectLoses++;
      } else if(currMove.perfect === 1){
        if(parentMove.perfect !== 0)
          parentMove.perfect = 1;
        counter.perfectDraws++;
      } else {
        if(parentMove.perfect !== 0 && parentMove.perfect !== 1)
          parentMove.perfect = 2;
        counter.perfectWins++;
      }
      parentMove.wins += currMove.loses;
      parentMove.draws += currMove.draws;
      parentMove.loses += currMove.wins;
      
    }
  }
  
  parentMove.random = ( (counter.perfectWins*2+counter.perfectDraws) / (counter.perfectWins+counter.perfectDraws+counter.perfectLoses) / 2 );
  
  return parentMove;
}

let primeGrid: dbRecord | void;
let time: Date;

const run = async () => {
  console.log('Beginning...');
  time = new Date;
  await insertIntoDB(TABLE, {id: '0000000000', perfect: -1, random: -1.00, wins: -1, draws: -1, loses: -1});
  primeGrid = await createStage0DB('0000000000', grid, 1);
  await updateDB(TABLE, primeGrid);
};

run()
  .then(r => pool.end())
  .then(r => console.log('Finished in ' + (Number(new Date().getTime()) - Number(time)).toString() + ' ms'));
