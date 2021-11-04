import pool from '../../databasePool.js'
import Dragon from './index.js'
import DragonTable from './table.js'

const getDragonWithTraits = ({ dragonId }) => {
    return Promise.all([
        DragonTable.getDragon({ dragonId }),
        new Promise((resolve, reject) => {
            pool.query(
                `SELECT "traitType", "traitValue"
                FROM trait
                INNER JOIN dragonTrait on trait.id = dragonTrait."traitId"
                WHERE dragonTrait."dragonId" = $1`,
                [dragonId],
                (error, response) => {
                    if(error) return reject(error);

                    resolve(response.rows);
                }
            )
        })
    ])
    .then(([dragon, dragonTraits]) => {
        return new Dragon({ ...dragon, traits: dragonTraits, dragonId })
    })
    .catch(error => console.error(error));
}

export {
    getDragonWithTraits
}