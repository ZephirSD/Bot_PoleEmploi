const puppeteer = require('puppeteer');
const sleep = require('../component/fonctionSleep');

const actualisationPE = async (req, res) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://authentification-candidat.pole-emploi.fr/connexion/XUI/?realm=%2Findividu&goto=https%3A%2F%2Fauthentification-candidat.pole-emploi.fr%2Fconnexion%2Foauth2%2Frealms%2Froot%2Frealms%2Findividu%2Fauthorize%3Frealm%3D%252Findividu%26response_type%3Did_token%2520token%26scope%3Dopenid%2520compteUsager%2520profile%2520contexteAuthentification%2520email%2520courrier%2520notifications%2520etatcivil%2520logW%2520individu%2520pilote%2520nomenclature%2520coordonnees%2520navigation%2520reclamation%2520prdvl%2520idIdentiteExterne%2520pole_emploi%2520suggestions%2520actu%2520application_USG_PN073-tdbcandidat_6408B42F17FC872440D4FF01BA6BAB16999CD903772C528808D1E6FA2B585CF2%26client_id%3DUSG_PN073-tdbcandidat_6408B42F17FC872440D4FF01BA6BAB16999CD903772C528808D1E6FA2B585CF2%26state%3DgqTr6AMSrnhgzD8H%26nonce%3DUKjN0bdBrfRQyrXJ%26redirect_uri%3Dhttps%253A%252F%252Fcandidat.pole-emploi.fr%252Fespacepersonnel%252F#login/');
    await sleep(8000);
    const privacy = await page.waitForSelector('#footer_tc_privacy');
    if(privacy){
        console.log('Element existe');
        await page.click('#footer_tc_privacy_button_2');
    }
    await sleep(6650);
    // await page.type('#identifiant', process.env.PROCESS_ENV_IDENTIFIANT);
    await page.type('#identifiant', req.body.identifiant);
    await page.click('#submit');
    await sleep(5850);
    // await page.type('#password', process.env.PROCESS_ENV_PASSWORD);
    await page.type('#password', req.body.password);
    await page.click('#submit');
    console.log('Vous êtez connecté');
    await sleep(6500);
    const boutonMenu = await page.waitForSelector('#ButtonMenuBurger');
    if(boutonMenu){
        console.log('Bouton Menu existe');
        boutonMenu.click();
    }
    await sleep(2000);
    if(await page.waitForSelector(".with-submenu.menu-link-candidat > span.icon-actualisation")){
        await page.click(".with-submenu.menu-link-candidat > span.icon-actualisation");
        await sleep(1500);
        await page.click("#collapsePlusService-actualisation > li");
    }
    await sleep(30500);
    await page.click('#btn-declare-actu');
    await sleep(3000);
    const radioNonAct = 'input#action-activite-non';
    await page.evaluate((radioNonAct) => {
        const radio = document.querySelector(radioNonAct);
        if (radio) {
          radio.checked = true;
        }
      }, radioNonAct);
    await sleep(3000);
    await page.click('#submit-activites');
    await sleep(20000);
    const radioFormation = 'input#question-formation-non';
    const radioCongPart = 'input#question-pam-non';
    const radioPension = 'input#question-pension-non';
    await page.evaluate((radioFormation) => {
    const radio = document.querySelector(radioFormation);
    if (radio) {
        radio.checked = true;
    }
    }, radioFormation);
    await sleep(3000);
    await page.evaluate((radioCongPart) => {
    const radio = document.querySelector(radioCongPart);
    if (radio) {
        radio.checked = true;
    }
    }, radioCongPart);
    await sleep(3000);
    await page.evaluate((radioPension) => {
    const radio = document.querySelector(radioPension);
    if (radio) {
        radio.checked = true;
    }
    }, radioPension);
    await sleep(3000);
    await page.click('#submit-situation-particuliere');
    await sleep(27500);
    const radioIscrPE = 'input#question-maintienInscription-oui';
    await page.evaluate((radioIscrPE) => {
    const radio = document.querySelector(radioIscrPE);
    if (radio) {
        radio.checked = true;
    }
    }, radioIscrPE);
    await sleep(3000);
    await page.click('#btn-valider-actu');
    await sleep(30500);
    await browser.close();
    await res.json({message: "Vous êtez connecté"});
};

module.exports = { actualisationPE };