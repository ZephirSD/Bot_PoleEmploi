const puppeteer = require('puppeteer');

async function requestFunction(permalien, domaineName, protocole){
    // const url = `http://${req.hostname}:3000${req.originalUrl}`;
    // res.send(`URL complète : ${url}`);
    const response = await page.goto(`${protocole}://${domaineName}:3000${permalien}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    return response;
}

module.exports = { requestFunction }