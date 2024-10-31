import CryptoJS from 'crypto-js';
const SECRET_KEY = import.meta.env.VITE_CRYPTO_SECRET_KEY;

export const encrypt = (text: string) => {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

export const decrypt = (text: string) => {
    return CryptoJS.AES.decrypt(text, SECRET_KEY).toString(CryptoJS.enc.Utf8);
}