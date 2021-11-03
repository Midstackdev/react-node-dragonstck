import pool from '../../databasePool.js'

class AccountTable {
    static storeAccount({ username, password }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO account("usernameHash", "passwordHash") VALUES($1, $2)`,
                [username, password],
                (error, trsponse) => {
                    if(error) return reject(error);

                    resolve();
                }
            );
        })
    }

    static getAccount({ username }) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT id, "passwordHash" 
                FROM account 
                WHERE "usernameHash" = $1`,
                [username],
                (error, response) => {
                    if(error) return reject(error);

                    resolve({ account: response.rows[0] });
                }
            );
        })
    }
}

export default AccountTable;