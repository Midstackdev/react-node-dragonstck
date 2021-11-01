import pg from 'pg'
import databaseConfiguration from './secrets/dbconfig.js'

const { Pool } = pg;

const pool = new Pool(databaseConfiguration);

export default pool;

// pool.query('SELECT * FROM generation', (error, response) => {
//     if(error) return console.log('error', error);

//     console.log('response.rows', response.rows);
// });