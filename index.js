const express = require('express');
const app = express();
const BRCrypto = require(`../poc-web/BRCrypto.js`);
require('dotenv').config();

const apiToken = process.env.API_TOKEN;
const encryptedCreds = BRCrypto.encryptCreds(process.env.ACCESS_TOKEN)
console.log(encryptedCreds);
//for yahoo
//const encryptedCreds = BRCrypto.encryptCreds(`${process.env.USERNAME}@yahoo.com:${process.env.PASSWORD}`);
const provider =  process.env.PROVIDER;

app.get('/scrape', async (req, res) => {
  try {
    const { default: fetch } = await import('node-fetch');
    const response = await fetch('https://scan.blinkreceipt.com/ereceipts/create_job', {
      method: 'POST',
      headers: {
        'api-key': apiToken,
        'uid': 1,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'credentials': encryptedCreds,
        'provider': provider
      })
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const responseData = await response.json();
    res.json(responseData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// app.post("/update-environment", (req, res) => {
//   const userInput = req.body;

//   process.env.PROVIDER = userInput.provider;
//   process.env.USERNAME = userInput.email;
//   process.env.PASSWORD = userInput.password;

//   res.status(200).json({ success: true });
// });


const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});