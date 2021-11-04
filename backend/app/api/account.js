import { Router } from 'express';
import { hash } from '../account/helper.js';
import Session from '../account/session.js';
import AccountTable from '../account/table.js';
import AccountDragonTable from '../accountDragon/table.js';
import { getDragonWithTraits } from '../dragon/helper.js';
import { authenticateAccount, setSession } from './helper.js';

const router = new Router();

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);
    
    AccountTable.getAccount({ username: usernameHash })
        .then(({ account }) => {
            if(!account) {
                return AccountTable.storeAccount({ username: usernameHash, password: passwordHash })
                
            }else {
                const error = new Error('This username has already been taken.');
                
                error.statusCode = 409;
                
                throw error;
            }
        })
        .then(() => {
            return setSession({ username, res });

        })
        .then(({ message }) => {
            res.json({ message });
        })
        .catch(error => next(error));
    
});

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);
    
    AccountTable.getAccount({ username: usernameHash })
        .then(({ account }) => {
            
            if(account && account.passwordHash === passwordHash) {
                const { sessionId } = account;
                return setSession({ username, res, sessionId });
                
            }else {
                const error = new Error('This username/password is incorrect.');
                
                error.statusCode = 409;
                
                throw error;
            }
        })
        .then(({ message }) => {
            res.json({ message });
        })
        .catch(error => next(error));
    
});

router.get('/logout', (req, res, next) => {
    const { username } = Session.parse(req.cookies.sessionString);
    console.log(req.sessionString)

    AccountTable.updateSessionId({
        sessionId: null,
        usernameHash: hash(username)
    })
    .then(() => {
        res.clearCookie('sessionString');

        res.json({ message: 'Successful logout' });
    })
    .catch(error => next(error));
});

router.get('/auth', (req, res, next) => {
    const { sessionString } = req.cookies;

    authenticateAccount({ sessionString })
        .then(({ authenticated }) => res.json({ authenticated }))
        .catch(error => next(error));

});

router.get('/dragons', (req, res, next) => {

    authenticateAccount({ sessionString: req.cookies.sessionString })
        .then(({ account }) => {

            return AccountDragonTable.getAccountDragons({ accountId: account.id });
        })
        .then(({ accountDragons }) => {
            return Promise.all(
                accountDragons.map(accountDragon => {
                    return getDragonWithTraits({ dragonId: accountDragon.dragonId })
                })
            );
        })
        .then(dragons => res.json({ dragons }))
        .catch(error => next(error));
});

export default router;