const crypto = require('crypto') ;

const dictionary = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"; 

export const utils = {
    md5: (payload: string): string => {
        return crypto.createHash('MD5').update(payload).digest("hex");
    },
    randomString: (length: number): string => {
        let generatedWord = '';
        for (let i = 0; i <= length; i++) {
            generatedWord += dictionary.charAt(utils.randomNumber(0, dictionary.length));
        }
        return generatedWord;
    },
    randomNumber: (start: number, end: number): number => {
        return Math.round(Math.random() * (end - start) + start);
    }
}
