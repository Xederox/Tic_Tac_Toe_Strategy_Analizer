import {Router} from "express";
import {pool} from "../db";

export const monteRoute = Router()
  
  .get('/:stage/:id', async (req, res) => {
    let records: any;
    switch(req.params.stage) {
      case 'stage0': {
        const likeID = req.params.id + '-_';
        try{
          [records] = await pool.execute("SELECT * FROM `mcts stage0` WHERE `id` LIKE :likeID ORDER BY `value`/`total` DESC;",{
            likeID: likeID,
          });
        } catch (e) {
          console.log('Not implemented');
          console.log(e);
        }
        break;
      }
      case 'stage1': {
        const likeID = req.params.id + '-__';
        try{
          [records] = await pool.execute("SELECT * FROM `mcts stage1` WHERE `id` LIKE :likeID ORDER BY `value`/`total` DESC;",{
            likeID: likeID,
          });
        } catch (e) {
          console.log('Not implemented');
          console.log(e);
        }
        break;
      }
      default: {
        records = null;
        console.log('Wrong stage parameter');
        break;
      }
    }
    res.json(records);
  });
