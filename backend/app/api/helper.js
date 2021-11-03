import { hash } from "../account/helper.js";
import Session from "../account/session.js";
import AccountTable from "../account/table.js";

export const setSession = ({ username, res, sessionId }) => {
    return new Promise((resolve, reject) => {
        let session, sessionString;

        if(sessionId) {
            sessionString = Session.sessionString({ username, id: sessionId });

            setSessionCookie({sessionString, res});

            resolve({ message: 'session restored.' });
        }else {
            session = new Session({ username });
            sessionString = session.toString();

            AccountTable.updateSessionid({
                sessionId: session.id,
                usernameHash: hash(username)
            })
            .then(() => {
                setSessionCookie({sessionString, res})
                resolve({ message: 'session created' });
            })
            .catch(error => reject(error));
        }
        
    });
}

const setSessionCookie = ({ sessionString, res }) => {
    res.cookie('sessionString', sessionString, {
        expire: Date.now() + 3600000,
        httpOnly: true,
        // secure: true // use with https
    });
}