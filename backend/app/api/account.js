import { Router } from 'express';
import { hash } from '../account/helper.js';
import AccountTable from '../account/table.js';

const router = new Router();

router.post('/signup', (req, res, next) => {
    const username = hash(req.body.username);
    const password = hash(req.body.password);
    
    AccountTable.getAccount({ username })
        .then(({ account }) => {
            if(!account) {
                return AccountTable.storeAccount({ username, password })
                
            }else {
                const error = new Error('This username has already been taken.');
                
                error.statusCode = 409;
                
                throw error;
            }
        })
        .then(() => res.json({ message: 'success!' }))
        .catch(error => next(error));
    
});

export default router;