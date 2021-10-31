import Dragon from '../dragon.js';
import { REFRESH_RATE, SECONDS } from '../config.js';

const refreshRate = REFRESH_RATE * SECONDS;

class Generation {
    constructor() {
        this.expiration = this.calculateExpiration()
    }
    
    calculateExpiration() {
        const expirationPeroid = Math.floor(Math.random() * (refreshRate/2))
        
        const msUntilExpiration = Math.random() < 0.5 ? 
            refreshRate - expirationPeroid :
            refreshRate + expirationPeroid;
    
        return new Date(Date.now() + msUntilExpiration);

    }

    newDragon() {
        if(Date.now() > this.expiration) {
            throw new Error(`This generation expired on ${this.expiration}`);
        }

        return new Dragon();
    }
}

export default Generation;