const express = require('express');
const { actualisationPE } = require('../controllers/actualisationControllers');
const router = express.Router();

router.post("/actualisation_pole_emploi", actualisationPE);

module.exports = router;