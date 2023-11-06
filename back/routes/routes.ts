import {Router} from "express";
import {pool} from "../db";

export const stage0Route = Router()
  
  .get('/:id', async (req, res) => {
    let records: any;
    try{
      [records] = await pool.execute("SELECT `stage0`.`id`, `perfect`, `random`, `wins`, `draws`, `loses` FROM `stage0` JOIN `stage0_stage0` ON `stage0`.`id` = `stage0_stage0`.`childid` WHERE `stage0_stage0`.`parentid` = :id ORDER BY `perfect` DESC, `random` DESC, `id` DESC",{
        id: req.params.id,
      });
    } catch (e) {
      console.log('Not implemented');
      console.log(e);
    }
    res.json(records);
  });
