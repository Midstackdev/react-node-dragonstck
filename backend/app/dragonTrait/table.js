import pool from "../../databasePool.js";
import TraitTable from "../trait/table.js";

class DragonTraitTable {
    static storeDragonTrait({ dragonId, traitType, traitValue }) {
        return new Promise((resolve, reject) => {
            TraitTable.getTraitId({ traitType, traitValue })
                .then(({ traitId }) => {
                    pool.query(
                        'INSERT INTO dragonTrait("traitId", "dragonId") VALUES($1, $2)',
                        [traitId, dragonId],
                        (error, response) => {
                            if(error) return reject(error);

                            resolve();
                        }
                    )
                });
        });
    }
}

export default DragonTraitTable;