const express = require("express");
const app = express();
// const cors = require('cors');
require('dotenv').config();
const path = require('path');
const port = 3000;
const routesAPI = require('./routes/routesPE');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'accueil')));
app.use("/api", routesAPI);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'accueil', 'index.html'));
});

app.listen(port, () => {
  console.log(`Le serveur Express écoute sur le port ${port}`);
});



