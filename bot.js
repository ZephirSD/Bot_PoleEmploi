const express = require("express");
const app = express();
// const cors = require('cors');
const puppeteer = require('puppeteer');
require('dotenv').config();
// app.use(
//   express.urlencoded({
//     extended: true,
//   }),
// )

// app.use(express.json())

// const optionsCors = {
//   origin: true,
//   credentials: true,
// }
// app.use(cors(optionsCors));
// const port = 3000;
// app.listen(port);

// app.get('/cron_pole_emploi', (req,res) => {
  try{
    // if(res){
      function sleep(ms){
          return new Promise(resolve => setTimeout(resolve, ms));
      }
      (async () => {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto('https://authentification-candidat.pole-emploi.fr/connexion/XUI/?realm=%2Findividu&goto=https%3A%2F%2Fauthentification-candidat.pole-emploi.fr%2Fconnexion%2Foauth2%2Frealms%2Froot%2Frealms%2Findividu%2Fauthorize%3Frealm%3D%252Findividu%26response_type%3Did_token%2520token%26scope%3Dopenid%2520compteUsager%2520profile%2520contexteAuthentification%2520email%2520courrier%2520notifications%2520etatcivil%2520logW%2520individu%2520pilote%2520nomenclature%2520coordonnees%2520navigation%2520reclamation%2520prdvl%2520idIdentiteExterne%2520pole_emploi%2520suggestions%2520actu%2520application_USG_PN073-tdbcandidat_6408B42F17FC872440D4FF01BA6BAB16999CD903772C528808D1E6FA2B585CF2%26client_id%3DUSG_PN073-tdbcandidat_6408B42F17FC872440D4FF01BA6BAB16999CD903772C528808D1E6FA2B585CF2%26state%3DgqTr6AMSrnhgzD8H%26nonce%3DUKjN0bdBrfRQyrXJ%26redirect_uri%3Dhttps%253A%252F%252Fcandidat.pole-emploi.fr%252Fespacepersonnel%252F#login/');
          await sleep(8000);
          const privacy = await page.waitForSelector('#footer_tc_privacy');
          if(privacy){
            console.log('Element existe');
            await page.click('#footer_tc_privacy_button_2');
          }
          privacy.dispose();
          await sleep(5500);
          await page.type('#identifiant', process.env.PROCESS_ENV_IDENTIFIANT);
          await page.click('#submit');
          await sleep(5500);
          await page.type('#password', process.env.PROCESS_ENV_PASSWORD);
          await page.click('#submit');
          await sleep(4500);
          // const popupInfo = await page.waitForSelector('.glz-pe-info-popup');
          // if(popupInfo){
          //   await page.click('.glz-pe-info-popup-footer-btn');
          // }
          console.log('Vous êtez connecté');
          // popupInfo.dispose();
          // await browser.close();
          // await res.json({message: "Lien executé"});
          // await res.end();
      })();
    }
  // }
  catch(error){
    // res.json({message: error});
  }
// })
