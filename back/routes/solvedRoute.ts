import {Router} from "express";
import {pool} from "../db";

export const solvedRoute = Router()
  
  .get('/:stage/:id', async (req, res) => {
    let records: any;
    switch(req.params.stage) {
      case 'stage0': {
        try{
          [records] = await pool.execute("SELECT `stage0`.`id`, `perfect`, `random`, `wins`, `draws`, `loses` FROM `stage0` JOIN `stage0_stage0` ON `stage0`.`id` = `stage0_stage0`.`childid` WHERE `stage0_stage0`.`parentid` = :id ORDER BY `perfect` DESC, `random` DESC, `id` DESC",{
            id: req.params.id,
          });
        } catch (e) {
          console.log('Not implemented');
          console.log(e);
        }
        break;
      }
      case 'stage1': {
        try{
          [records] = await pool.execute("SELECT `stage1`.`id`, `perfect`, `random`, `wins`, `draws`, `loses` FROM `stage1` JOIN `stage1_stage1` ON `stage1`.`id` = `stage1_stage1`.`childid` WHERE `stage1_stage1`.`parentid` = :id ORDER BY `perfect` DESC, `random` DESC, `id` DESC",{
            id: req.params.id,
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
      }
    }
    res.json(records);
  });
