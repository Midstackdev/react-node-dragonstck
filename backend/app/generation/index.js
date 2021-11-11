import Dragon from '../dragon/index.js';
import { REFRESH_RATE, SECONDS } from '../config.js';

const refreshRate = REFRESH_RATE * SECONDS;

class Generation {
    constructor() {
        this.accountIds = new Set();
        this.expiration = this.calculateExpiration();
        this.generationId = undefined;
    }
    
    calculateExpiration() {
        const expirationPeroid = Math.floor(Math.random() * (refreshRate/2))
        
        const msUntilExpiration = Math.random() < 0.5 ? 
            refreshRate - expirationPeroid :
            refreshRate + expirationPeroid;
    
        return new Date(Date.now() + msUntilExpiration);

    }

    newDragon({ accountId }) {
        if(Date.now() > this.expiration) {
            throw new Error(`This generation expired on ${this.expiration}`);
        }
        
        if(this.accountIds.has(accountId)) {
            throw new Error(`You already have a dragon from this generation.`);
        }

        this.accountIds.add(accountId);

        return new Dragon({ generationId: this.generationId });
    }
}

export default Generation;