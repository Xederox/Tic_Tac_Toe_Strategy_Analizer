import {createPool} from "mysql2/promise";

export const pool = createPool({
  host: 'localhost',
  user: 'root',
  database: 'tik tak toe - strategy analizer',
  namedPlaceholders: true,
  decimalNumbers: true,
})
