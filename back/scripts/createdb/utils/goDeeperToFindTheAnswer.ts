import {dbMonteRecord, GridType, StageType} from "../../../types";
import {getMonteRecord} from "./getMonteRecord";
import {checkWin} from "./checkWin";
import {checkDraw} from "./checkDraw";
import {getOtherPlayer} from "./getOtherPlayer";
import {randomSimulation} from "./randomSimulation";
import {updateDB} from "./dbFunctions";
import {makeMove} from "./makeMove";

//Mutually recursive with makeMove

export const goDeeperToFindTheAnswer = async (id: string, index: number, currGrid: GridType, currPlayer: '1'|'2', isRecorded: boolean, stage: StageType) => {
  let currNode: dbMonteRecord = await getMonteRecord(id, stage);
  let winner: '1'|'2'|'3';
  
  if(checkWin(currGrid)!=='0')
    winner = currPlayer;
  else if(checkDraw(currGrid)==='3')
    winner = '3';
  else if(isRecorded===true)
    winner = await makeMove(id,currGrid, getOtherPlayer(currPlayer), currNode.total, stage);
  else if(isRecorded===false)
    winner = randomSimulation(currGrid, getOtherPlayer(currPlayer), stage);
  else
    throw new Error(`whatIsRecorded[${index}] === ${isRecorded} (WTf?)`)
  
  if(winner === currPlayer)
    currNode.value++;
  else if(winner === '3')
    currNode.value += 0.5;
  currNode.total++;
  await updateDB(currNode, stage);
  
  return winner;
}