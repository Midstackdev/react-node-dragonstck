import { Router } from 'express';
import DragonTable from '../dragon/table.js';

const router = new Router();

router.get('/new', (req, res) => {
    const dragon = req.app.locals.engine.generation.newDragon();

    DragonTable.storeDragon(dragon)
        .then(({ dragonId }) => {
            dragon.dragonId = dragonId;
            res.json({ dragon });
        })
        .catch(error => console.log(error));
});

export default router;