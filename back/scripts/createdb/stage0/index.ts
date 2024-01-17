import {pool} from "../../../db";
import {checkWin, checkDraw, getOtherPlayer, insertIntoDB, insertRelation, selectFromDB, updateDB} from '../utils';
import {GridType, dbRecord, StageType} from "../../../types";

let __stage: StageType = 'stage0';

const grid: GridType = [
  '0', '0', '0',
  '0', '0', '0',
  '0', '0', '0',
];

const getID = (grid: GridType, currPlayer: '1'|'2',): string => {
  let id = '';
  for(let i=0; i<grid.length; i++)
    id = id + grid[i];
  id = id + currPlayer;
  return id;
};

const coveredIDs: Array<undefined | string> = [];
const checkRepeat = (id: string) => {
  for(let i=0; i<coveredIDs.length; i++)
    if(id === coveredIDs[i])
      return true;
  return false;
};

const createStage0DB = async (parentID: string, grid: GridType, currPlayer: '1'|'2'): Promise<dbRecord> => {
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
  
  for(let i: number = 0; i<9; i++) {
    if(grid[i] !== '0')
      continue;
    
    currGrid = JSON.parse(JSON.stringify(grid));
    currGrid[i] = currPlayer; // Typescript needs glasses here. Struggles to see 'tis a string
    const currID = getID( currGrid, currPlayer);
    
    if( checkRepeat(currID) ) {
      await insertRelation(parentID, currID, __stage);
      currMove = await selectFromDB(currID, __stage);
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
    await insertIntoDB({id: currID, perfect: -1, random: -1.00, wins: -1, draws: -1, loses:-1}, __stage);
    await insertRelation(parentID, currID, __stage);
    
    if( checkWin(currGrid)!=='0') {
      await updateDB({id: currID, perfect: 2, random: 1.00, wins: 1, draws: 0, loses: 0}, __stage);
      parentMove.perfect = 0;
      counter.perfectLoses++;
      parentMove.loses++;
      
    } else if( checkDraw(currGrid)!=='0') {
      await updateDB({id: currID, perfect: 1, random: 0.50, wins: 0, draws: 1, loses: 0}, __stage);
      if( parentMove.perfect !== 0 ) {
        parentMove.perfect = 1;
        counter.perfectDraws++;
      }
      parentMove.draws++;
      
    } else {
      currMove = await createStage0DB( currID, currGrid, getOtherPlayer(currPlayer));
      await updateDB(currMove, __stage);
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
  await pool.execute("CREATE TABLE IF NOT EXISTS `stage0` (\n" +
    "  `id` varchar(10) NOT NULL DEFAULT 'hey',\n" +
    "  `perfect` tinyint(1) NOT NULL DEFAULT -1,\n" +
    "  `random` decimal(3,2) NOT NULL DEFAULT -1.00,\n" +
    "  `wins` int(11) NOT NULL DEFAULT -1,\n" +
    "  `draws` int(11) NOT NULL DEFAULT -1,\n" +
    "  `loses` int(11) NOT NULL DEFAULT -1,\n" +
    "  PRIMARY KEY (`id`)\n" +
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"
  );
  await pool.execute("CREATE TABLE IF NOT EXISTS `stage0_stage0` (\n" +
    "  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,\n" +
    "  `parentid` varchar(10) NOT NULL DEFAULT '0',\n" +
    "  `childid` varchar(10) NOT NULL DEFAULT '0',\n" +
    "  PRIMARY KEY (`id`),\n" +
    "  KEY `FK_stage0_stage0_stage0` (`parentid`),\n" +
    "  KEY `FK_stage0_stage0_stage0_2` (`childid`),\n" +
    "  CONSTRAINT `FK_stage0_stage0_stage0` FOREIGN KEY (`parentid`) REFERENCES `stage0` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,\n" +
    "  CONSTRAINT `FK_stage0_stage0_stage0_2` FOREIGN KEY (`childid`) REFERENCES `stage0` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION\n" +
    ") ENGINE=InnoDB AUTO_INCREMENT=16168 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"
  );
  console.log('Beginning...');
  time = new Date;
  await insertIntoDB({id: '0000000000', perfect: -1, random: -1.00, wins: -1, draws: -1, loses: -1}, __stage);
  primeGrid = await createStage0DB('0000000000', grid, '1');
  await updateDB(primeGrid, __stage);
};

run()
  .then(() => pool.end())
  .then(() => console.log('Finished in ' + (Number(new Date().getTime()) - Number(time)).toString() + ' ms'));
