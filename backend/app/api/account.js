import { Router } from 'express';
import { hash } from '../account/helper.js';
import AccountTable from '../account/table.js';
import { setSession } from './helper.js';

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

export default router;