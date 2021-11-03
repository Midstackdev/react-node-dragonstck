import { v4 as uuidv4 } from 'uuid';
import { hash } from './helper.js';

const SEPEREATOR = '|';

class Session {
    constructor({ username }) {
        this.username = username;
        this.id = uuidv4();
    }

    toString() {
        const { username, id } = this;

        return Session.sessionString({ username, id });
    }

    static parse(sessionString) {
        const sessionData = sessionString.split(SEPEREATOR);

        return {
            username: sessionData[0],
            id: sessionData[1],
            sessionHash: sessionData[2]
        };
    }

    static verify(sessionString) {
        const { username, id, sessionHash } = Session.parse(sessionString);

        const accountData = Session.accountData({ username, id });

        return hash(accountData) === sessionHash;
    }

    static accountData({ username, id }) {
        return `${username}${SEPEREATOR}${id}`;
    }
    
    static sessionString({ username, id }) {
        const accountData = Session.accountData({ username, id });

        return `${accountData}${SEPEREATOR}${hash(accountData)}`;
    }
}

export default Session;