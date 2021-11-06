import { Router } from 'express';
import AccountDragonTable from '../accountDragon/table.js';
import DragonTable from '../dragon/table.js';
import { authenticateAccount } from './helper.js';

const router = new Router();

router.get('/new', (req, res, next) => {
    let accountId, dragon;

    authenticateAccount({ sessionString: req.cookies.sessionString })
        .then(({ account }) => {
            accountId = account.id;

            dragon = req.app.locals.engine.generation.newDragon();

            return DragonTable.storeDragon(dragon);
        })
        .then(({ dragonId }) => {
            dragon.dragonId = dragonId;

            return AccountDragonTable.storeAccountDragon({ accountId, dragonId });
        })
        .then(() => res.json({ dragon }))
        .catch(error => next(error));
});

router.put('/update', (req, res, next) => {
    const {nickname, dragonId, isPublic, saleValue} = req.body;

    DragonTable.updateDragon({ dragonId, nickname, isPublic, saleValue })
        .then(() => res.json({ message: 'successfully updated dragon' }))
        .catch(error => next(error));
});

export default router;