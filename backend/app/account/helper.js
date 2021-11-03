import CryptoJs from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config()

const hash = string => {
    return CryptoJs.SHA256(`${process.env.APP_SECRET}${string}${process.env.APP_SECRET}`).toString();
}

export {
    hash
}