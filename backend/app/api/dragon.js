import { Router } from 'express';
import DragonTable from '../dragon/table.js';

const router = new Router();

router.get('/new', (req, res, next) => {
    const dragon = req.app.locals.engine.generation.newDragon();

    DragonTable.storeDragon(dragon)
        .then(({ dragonId }) => {
            dragon.dragonId = dragonId;
            res.json({ dragon });
        })
        .catch(error => next(error));
});

export default router;