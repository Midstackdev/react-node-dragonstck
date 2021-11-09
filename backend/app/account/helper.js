import CryptoJs from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config()

const hash = string => {
    return CryptoJs.SHA256(`${process.env.APP_SECRET}${string}${process.env.APP_SECRET}`).toString();
}

const base64Encode = myString => {
    // PROCESS
    const encodedWord = CryptoJs.enc.Utf8.parse(myString); // encodedWord Array object
    const encoded = CryptoJs.enc.Base64.stringify(encodedWord); // string: 'NzUzMjI1NDE='
    return encoded;
}

const base64Decode = encoded => {
    // PROCESS
    const encodedWord = CryptoJs.enc.Base64.parse(encoded); // encodedWord via Base64.parse()
    const decoded = CryptoJs.enc.Utf8.stringify(encodedWord); // decode encodedWord via Utf8.stringify() '75322541'
    return decoded;
}


export {
    hash,
    base64Encode,
    base64Decode
}