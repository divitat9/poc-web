//const fs = require('fs');
require('dotenv').config();
const BRCrypto = require(`../poc-web/BRCrypto.js`);
console.log(BRCrypto.encryptCreds(`${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}`));
//console.log(BRCrypto.encryptCreds(fs.readFileSync(0, 'utf-8')));
