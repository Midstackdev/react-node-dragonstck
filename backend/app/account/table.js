import pool from '../../databasePool.js'

class AccountTable {
    static storeAccount({ username, password }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO account("usernameHash", "passwordHash") VALUES($1, $2)`,
                [username, password],
                (error, response) => {
                    if(error) return reject(error);

                    resolve();
                }
            );
        })
    }

    static getAccount({ username }) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT id, "passwordHash", "sessionId" 
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

    static updateSessionid({ sessionId, usernameHash }) {
        return new Promise((resolve, reject) => {
            pool.query(
                'UPDATE account SET "sessionId" = $1 WHERE "usernameHash" = $2',
                [sessionId, usernameHash],
                (error, response) => {
                    if(error) return reject(error);

                    resolve();
                }
            );
        })
    }
}

export default AccountTable;