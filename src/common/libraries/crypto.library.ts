import CryptoJS from 'crypto-js';

export default class Crypto {
    private static instance: Crypto;
    private secretKey : string = process.env.AES_SECRETKEY;

    //singleton api
    public static getInstance = () => this.instance || (this.instance = new this());

    private constructor() {}
    
    public getDecrypto = (encrypted:string) => {
        
        var bytes = CryptoJS.AES.decrypt(encrypted, this.secretKey);
        var decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        
        return decrypted;
    };

}