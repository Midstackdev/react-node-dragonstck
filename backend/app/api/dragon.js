import { Router } from 'express';
import AccountTable from '../account/table.js';
import AccountDragonTable from '../accountDragon/table.js';
import { getPublicDragons } from '../dragon/helper.js';
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

router.get('/public', (req, res, next) => {
    getPublicDragons()
        .then(({ dragons }) => res.json({ dragons }))
        .catch(error => next(error));
});

router.post('/buy', (req, res, next) => {
    const { dragonId, saleValue } = req.body;
    let buyerId;

    DragonTable.getDragon({ dragonId })
        .then(dragon => {
            if(dragon.saleValue !== saleValue) {
                throw new Error('Sale value is not correct');
            }
            
            if(!dragon.isPublic) {
                throw new Error('Dragon must be public');
            }

            return authenticateAccount({ sessionString: req.cookies.sessionString });
        })
        .then(({ account, authenticated }) => {
            if(!authenticated) {
                throw new Error('Unauthenticated');
            }
            
            if(saleValue > account.balance) {
                throw new Error('Sale value exceeds balance');
            }

            buyerId = account.id;

            return AccountDragonTable.getDragonAccount({ dragonId });
        })
        .then(({ accountId }) => {
            if(accountId === buyerId) {
                throw new Error('Cannot buy your own dragon!');
            }

            const sellerId = accountId;

            return Promise.all([
                AccountTable.updateBalance({
                    accountId: sellerId, value: saleValue
                }),
                AccountTable.updateBalance({
                    accountId: buyerId, value: -saleValue
                }),
                AccountDragonTable.updateDragonAccount({
                    dragonId, accountId: buyerId
                }),
                DragonTable.updateDragon({
                    dragonId, isPublic: false
                })
            ])
        })
        .then(() => res.json({ message: 'success!' }))
        .catch(error => next(error));
});

export default router;